// this is the main engine

var startView = new ol.View({
      center: ol.proj.fromLonLat([21.63079, 47.53013]),
      zoom: 12
});

var geojsonUrl = './geojson/d_line.geojson';

var osm = new ol.layer.Tile({
      source: new ol.source.OSM()
});

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

var katonai = new ol.layer.Tile({
      source: new ol.source.XYZ({
          url: './Debrecen-XYZ/{z}/{x}/{y}.png'
      }),
      opacity: 0.6
});

var map = new ol.Map({
  target: 'debrecen',
  layers: [osm, katonai, transportLines],
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
