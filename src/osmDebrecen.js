// this is the main engine

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

var transportLines = new ol.layer.Vector({
      source: new ol.source.Vector({
          format: new ol.format.GeoJSON(),
          url: geojsonUrl
      }),
      style: vill
});

var tileLayer = new ol.layer.Tile();

var osm = new ol.source.OSM();

var satellite = new ol.source.XYZ({
      url: 'http://www.google.hu/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}'
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

map.on('moveend', dontLeaveDebrecen);

$(document).ready(function(){
  tileLayer.setSource(osm);
  $("#layerSwitch").click(function(){
      if (tileLayer.getSource() === osm) {
        tileLayer.setSource(satellite);
        $("#layerSwitch").val("Válts utcatérképre!");
      } else {
        tileLayer.setSource(osm);
        $("#layerSwitch").val("Válts műholdra!");
      }
  });
  $("#extraLayer").click(function(){
    if (katonai.getSource()) {
      katonai.setSource(null);
    } else {
      katonai.setSource(debrecenXYZ);
    }
  });
});
