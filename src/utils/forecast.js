const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=abac2f2a457cbd3ec2ad0706ee268cee&query=${latitude},${longitude}`
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect to weather service !", undefined)
        }
        else if (response.body.error) {
            callback("Unable to find the location !", undefined)
        }
        else {
            const currentTemp = response.body.current.temperature
            const feelLikeTemp = response.body.current.feelslike
            const currentDesc = response.body.current.weather_descriptions[0]
            const humidity = response.body.current.humidity
            callback(undefined, `it's ${currentTemp} degrees out there but it feels like ${feelLikeTemp} degrees.<br>
            overall state is ${currentDesc}.<br>
            humidity is about ${humidity}%.`)
        }
    })
}

module.exports = forecast