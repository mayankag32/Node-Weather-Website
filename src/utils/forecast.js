const request = require('request')

const forecast = (longitude, latitude, callback) =>{

    const url = 'http://api.weatherstack.com/current?access_key=2294e3d68e84d3c5ead9a260398c56d1&query=' + longitude + ',' + latitude + '&units=f'
    request({url, json: true}, (error, {body}) =>{
        if(error){
            callback('Unable to Connect',undefined)
        }
        else if(body.error){
            callback('Unable to Find Loacation',undefined)
        }
        else{
            callback(undefined,{
                temperature : "Current Temp is " + body.current.temperature + " F",
                forecast : "The Most Likely Temp would be " + body.current.feelslike + " F",
            })
        }
    })

}

module.exports = forecast
