var startView = new ol.View({
    center: ol.proj.fromLonLat([21.63079, 47.53013]),
    zoom: 12
  });

var map = new ol.Map({
  target: 'debrecen',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  view: startView
});

function dontLeaveDebrecen(evt) {
  var map = evt.map;
  var extent = map.getView().calculateExtent(map.getSize());
  var viewCenter = ol.proj.toLonLat(ol.extent.getCenter(extent));
  if (
    viewCenter[0] < 21.4633 || 
    viewCenter[0] > 21.8360 || 
    viewCenter[1] > 47.6534 || 
    viewCenter[1] < 47.4554
  ) {
    alert("Csak Debrecenben lehetsz boldog!");
    startView.setCenter(ol.proj.fromLonLat([21.63079, 47.53013]));
  }
}

map.on('moveend', dontLeaveDebrecen);
