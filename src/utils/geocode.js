const request = require('request')

const geocode = (address, callback) => {
    const url = `http://api.positionstack.com/v1/forward?access_key=19534518f1264588cadb4edaa533b990&limit=1&query=${encodeURIComponent(address)}`
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect to location service !", undefined)
        }
        else if (response.body.error) {
            callback("Unable to find the location. Try another search.", undefined)
        }
        else if (response.body.data.length === 0) {
            callback("Unable to find the location !", undefined)
        }
        else {
            const latitude = response.body.data[0].latitude
            const longitude = response.body.data[0].longitude
            const location = response.body.data[0].label
            callback(undefined, {
                latitude,
                longitude,
                location
            })
        }
    })
}

module.exports = geocode

