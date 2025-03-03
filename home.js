function clickOtherButton() {
  var url = "login.html?click=true";
  window.location.href = url;
}
var bMapAPIKey =
  "AvPFaU0wuF31Hah4sjfHsoD8AkhpEuUIhUI8EgrQaTZVJCvKv-3LxO0W5NhJU1P5";

var map, infobox, layer;

//Query URL to the POI data source
var sdsDataSourceUrl =
  "https://spatial.virtualearth.net/REST/v1/data/Microsoft/PointsOfInterest";

function GetMap() {
  map = new Microsoft.Maps.Map("#myMap", {});

  //Create an infobox to display content for each result.
  infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
    visible: false,
  });
  infobox.setMap(map);

  //Create a layer for the results.
  layer = new Microsoft.Maps.Layer();
  map.layers.insert(layer);

  //Add a click event to the layer to show an infobox when a pushpin is clicked.
  Microsoft.Maps.Events.addHandler(layer, "click", function (e) {
    var m = e.target.metadata;

    infobox.setOptions({
      title: m.DisplayName,
      description: m.AddressLine + ", " + m.Locality,
      location: e.target.getLocation(),
      visible: true,
    });
  });

  //Load the Bing Spatial Data Services module.
  Microsoft.Maps.loadModule("Microsoft.Maps.SpatialDataService", function () {
    //Add an event handler for when the map moves.
    Microsoft.Maps.Events.addHandler(map, "viewchangeend", getNearByLocations);

    //Trigger an initial search.
    getNearByLocations();
  });
}

function getNearByLocations() {
  //Remove any existing data from the layer.
  layer.clear();

  //Hide infobox.
  infobox.setOptions({ visible: false });

  //Create a query to get nearby data.
  var queryOptions = {
    queryUrl: sdsDataSourceUrl,
    spatialFilter: {
      spatialFilterType: "nearby",
      location: map.getCenter(),
      radius: 30,
    },
    filter: new Microsoft.Maps.SpatialDataService.Filter(
      "EntityTypeID",
      "eq",
      5800
    ), //Filter to retrieve Gas Stations.
  };

  //Process the query.
  Microsoft.Maps.SpatialDataService.QueryAPIManager.search(
    queryOptions,
    map,
    function (data) {
      //Add results to the layer.
      layer.add(data);
    }
  );
}

(async () => {
  let script = document.createElement("script");
  let bingKey =
    "AvPFaU0wuF31Hah4sjfHsoD8AkhpEuUIhUI8EgrQaTZVJCvKv-3LxO0W5NhJU1P5";
  script.setAttribute(
    "src",
    "https://www.bing.com/api/maps/mapcontrol?callback=GetMap&key=AvPFaU0wuF31Hah4sjfHsoD8AkhpEuUIhUI8EgrQaTZVJCvKv-3LxO0W5NhJU1P5"
  );
  document.body.appendChild(script);
})();
