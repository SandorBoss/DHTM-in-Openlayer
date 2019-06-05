<html>
 <head>
  <meta content="text/html">
  <meta charset="utf-8">
  <title>OpenLayers térkép</title>
  <style>
   html, body {margin:0; padding:0; height: 100%}
  </style>
  <script src="http://openlayers.org/api/OpenLayers.js"></script>
  <script type="text/javascript">
   function goToDebrecen() {
    downloadOSM();
    map.zoomToExtent(new OpenLayers.Bounds(2400000,6020000,2420000,6040000));
   }
   function downloadOSM() {
     var map = new OpenLayers.Map('terkep', {});
     map.addLayer(new OpenLayers.Layer.OSM());
   }
  </script>  
 </head>
 <body onload="init()">
   <div style="width:100%; height:100%" id="terkep"></div>
 </body>
</html>
