<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="style.css">
    <script src="https://cdn.rawgit.com/openlayers/openlayers.github.io/master/en/v5.3.0/build/ol.js"></script>
  </head>
  <body>
    <header>Debrecen város kötöttpályás tömegközlekedésének története</header>
    <div id="debrecen" class="map"></div>
    <script type="module" src=osmDebrecen.js></script>
    <form>
    <fieldset id="day">
      <legend>Szűrés egy napra</legend>
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
      <legend>Szűrés időtartamra</legend>
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
      <legend>Szűrés járatra</legend>
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