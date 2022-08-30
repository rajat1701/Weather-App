const request = require("request");

const geocode = (address, callback) => {
  const url =
    "http://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoicmFqYXQxNzAxIiwiYSI6ImNsN2J6NXprZjBjcjgzdnFjdm81YWtlOHAifQ.x2g1XZV9cfB8rl-CtvJ9tg";

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (response.body.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      const place = response.body.features[0];
      callback(undefined, {
        latitude: place.center[1],
        longitude: place.center[0],
        location: place.place_name,
      });
    }
  });
};
// geocode('Lal kila',(error,data)=>{
//     if(error)console.log(error)
//     if(data)console.log(data)
// })
module.exports = geocode;
