var map = new ol.Map({
  target: 'debrecen',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([21.63079, 47.53013]),
    zoom: 12
  })
});
