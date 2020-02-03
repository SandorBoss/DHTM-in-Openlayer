// this is the main engine

var dateObject = new Date();
	var thisYear = dateObject.getFullYear();
	var thisMonth = 
		((dateObject.getMonth() + 1) < 10 ? "0" : "") + 
		(dateObject.getMonth() + 1).toString()
	;
	var thisDay = (dateObject.getDate() < 10 ? "0" : "") + dateObject.getDate().toString();

var startView = new ol.View({
    center: ol.proj.fromLonLat([21.63079, 47.53013]),
    zoom: 12
});

var geojsonUrl = './geojson/d_line.geojson';

var vill = new ol.style.Style({
    stroke: new ol.style.Stroke({ color: [255,192,0,.75], width: 3 })
});

var troli = new ol.style.Style({
    stroke: new ol.style.Stroke({ color: [192,0,0,.75], width: 3 })
});

var fullGeoJSON = new ol.layer.Vector({
    source: new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        url: geojsonUrl
    }),
    style: vill
});

var transportLines = fullGeoJSON;

var tileLayer = new ol.layer.Tile();

var osm = new ol.source.OSM();

var satellite = new ol.source.XYZ({
    url: 'http://www.google.hu/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}'
  });
  
var turista = new ol.source.XYZ({
	url: 'http://{a-d}.map.turistautak.hu/tiles/turistautak/{z}/{x}/{y}.png'
});

var debrecenXYZ = new ol.source.XYZ({
	url: './Debrecen-XYZ/{z}/{x}/{y}.png'
});

var katonai = new ol.layer.Tile({
    source: null,
    opacity: 0.6
});

var map = new ol.Map({
	target: 'debrecen',
	layers: [tileLayer, katonai, transportLines],
	view: startView
});

function dontLeaveDebrecen(evt) {
	var map = evt.map;
	var extent = map.getView().calculateExtent(map.getSize());
	var viewCenter = ol.proj.toLonLat(ol.extent.getCenter(extent));
	if (
		viewCenter[0] < 21.4633 || 
		viewCenter[0] > 21.8360 || 
		viewCenter[1] < 47.4554 ||
		viewCenter[1] > 47.6534    
	) {
		startView.setCenter(ol.proj.fromLonLat([21.63079, 47.53013]));
		alert("Csak Debrecenben lehetsz boldog!");
	}
}

function checkDate(date) {
	var isValidFormat = !(!date.toString().match(/^\d{4}-\d{2}-\d{2}$/));
	console.log(date);
	var dateToCheck = new Date(date);
	var numericToday = dateObject.getTime();
	var isValidDate = dateToCheck.getTime() <= numericToday;
	console.log(dateToCheck.getTime() + " " + numericToday);
	console.log(isValidDate)
	//isValidDate = dateToCheck.toString().slice(0, 10) === date;
	console.log(isValidFormat);
	console.log(isValidDate);
	return isValidFormat && isValidDate;
}

map.on('moveend', dontLeaveDebrecen);

$(document).ready(function(){
	tileLayer.setSource(osm);
	
	$("#layerSwitch").click(function(){
		switch (tileLayer.getSource()) {
        case osm:
            tileLayer.setSource(satellite);
            $("#layerSwitch").val("Túristatérkép");
            break;
        case satellite:
            tileLayer.setSource(turista);
            $("#layerSwitch").val("Utcatérkép");
            break;
        case turista:
            tileLayer.setSource(osm);
            $("#layerSwitch").val("Műhold");
            break;
        default:
            break;
		}
	});
	
	$("#extraLayer").click(function(){
		if (katonai.getSource()) {
			katonai.setSource(null);
		} else {
			katonai.setSource(debrecenXYZ);
		}
	});
	
	$("#filterDate").click(function() {
		var date =  $("#dayText").val();
		if (!checkDate(date)) {
			var today = thisYear + '-' + thisMonth + '-' + thisDay;
			$("#dayText").val("");
			alert(
				"Hibás dátum!" + "\n" + 
				"A dátumot a következő formátumban kell megadnod: " +
				"ÉÉÉÉ-HH-NN" + "\n" +
				"Érvényes intervallum kezdete: 1887-10-07" + "\n" +
				"Érvényes intervallum vége: " + today
			);
		}
	});
});
