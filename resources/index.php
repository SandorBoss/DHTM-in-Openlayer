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
   <header>Debrecen kötöttpályás közlekedési hálózata</header>
   <div style="width:100%; height:100%" id="terkep"></div>
   <form>
    <fieldset id="day">
      <label>Szűrés egy napra</label>
      <p>
        <label for="">Kért nap:</label>
        <input type="text" value="2019-06-01" id="day" size="10" maxlength="10">
      </p>
      <p class="buttonParagraph">
        <input type="button" value="Mehet">
        <input type="reset">
      </p>
    </fieldset>
    <fieldset id="betweenDays">
      <label>Szűrés időtartamra</label>
      <p>
        <label for="fromDay">Első nap:</label>
        <input type="text" value="2019-01-01" id="fromDay" size="10" maxlength="10">
      </p>
      <p>
        <label for="toDay">Utolsó nap:</label>
        <input type="text" value="2019-06-01" id="toDay" size="10" maxlength="10">
      </p>
      <p class="buttonParagraph">
        <input type="button" value="Mehet">
        <input type="reset">
      </p>
    </fieldset>
    <fieldset id="line">
      <label>Szűrés járatra</label>
      <p>
        <label for="line">Járatszám:</label>
        <input type="text" value="" id="line" size="10" maxlength="10">
      </p>
      <p class="buttonParagraph">
        <input type="button" value="Mehet">
        <input type="reset">
      </p>
    </fieldset>
    </form>
    <footer>(C) 2019 Készítők: Balogh László, Böszörményi Sándor, Herczeg Balázs</footer>
  </body>
</html>
