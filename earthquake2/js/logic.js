
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_day.geojson";


d3.json(queryUrl, function(data) {

 createFeatures(data.features);
});

function Color(number){
 if (number > 5){return "Red"}
 else if (number > 4){return "Orange"}
 else if(number > 3){return "Yellow"}
 else if(number > 2){return "Green"}
 else if(number > 1){return "Blue"}
 else {return "White"}
};

function createFeatures(earthquakeData) {


 function onEachFeature(feature, layer) {
   layer.bindPopup("<h3>" + feature.properties.place +
     "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
 }


 var earthquakes = L.geoJSON(earthquakeData, {
     onEachFeature: onEachFeature,
     pointToLayer: function(feature, latlng){
       return new L.circle(latlng,
         {radius: feature.properties.mag * 50000,
         fillOpacity: 0.85,
         fillColor: Color(feature.properties.mag),
         stroke: false
         })
         }
 });

 createMap(earthquakes);
}

function createMap(earthquakes) {


 var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
   maxZoom: 18,
   id: "mapbox.light",
   accessToken: API_KEY
 });

 var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
   maxZoom: 18,
   id: "mapbox.dark",
   accessToken: API_KEY
 });


 var baseMaps = {
   "Street Map": streetmap
 };


 var overlayMaps = {
   Earthquakes: earthquakes
 };

 var myMap = L.map("map", {
   center: [
     37.09, -95.71
   ],
   zoom: 5,
   layers: [streetmap, earthquakes]
 });
 var geojsonMarkerOptions = {
   radius: 100000,
   fillColor: "#ff7800",
   color: "#000",
   weight: 1,
   opacity: 1,
   fillOpacity: 0.8
   };

 L.control.layers(baseMaps, overlayMaps, {
   collapsed: false,
 }).addTo(myMap);
}
