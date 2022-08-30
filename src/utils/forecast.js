const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=cb1328bceeaf1fb9bb0881f782bbade3&query=" +
    encodeURIComponent(latitude) +
    "," +
    encodeURIComponent(longitude);
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      const weather = response.body.current;
      callback(
        undefined,
        `It is currently ${weather.temperature} degrees out. The weather can be described as ${weather.weather_descriptions}`
      );
    }
  });
};
// forecast(26.4691,74.639,(error,data)=>{
//     if(error)console.log(error)
//     if(data)console.log(data)
// })
module.exports = forecast;
