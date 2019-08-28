$(document).ready(function(){
    $("#layerSwitch").click(function(){
        alert(mapLayers);
        if (mapLayers[0] == osm) {
            mapLayers[0] = satellite;
        } else {
            mapLayers[0] == osm;
        }
    });
});
