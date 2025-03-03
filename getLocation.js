function GetMap() {
  //   "use strict";

  const successCallback = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const bingMapsApiKey =
      "AvPFaU0wuF31Hah4sjfHsoD8AkhpEuUIhUI8EgrQaTZVJCvKv-3LxO0W5NhJU1P5";
    console.log(latitude, longitude);
    function getAddressFromCoordinates(apiKey, latitude, longitude) {
      const url = `https://dev.virtualearth.net/REST/v1/Locations/${latitude},${longitude}?o=json&key=${apiKey}`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          try {
            const addressLine =
              data.resourceSets[0].resources[0].address.intersection
                .secondaryStreet1;
            const formattedAddress =
              data.resourceSets[0].resources[0].address.formattedAddress;
            const location = document.getElementById("location");
            if (location) {
              location.innerHTML = addressLine;
            }
            const Address = document.getElementById("addressline");
            if (Address) {
              Address.innerHTML = formattedAddress;
            }
          } catch (error) {
            console.error("Address not found.", error);
          }
        })
        .catch((error) => {
          console.error("Error fetching address:", error);
        });
    }

    getAddressFromCoordinates(bingMapsApiKey, latitude, longitude);
  };
  const errorCallback = (error) => {
    console.log(error);
  };
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
}
GetMap();
