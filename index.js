const getDayWeatherForecast = async () =>{
    const weatherInfoPromise= await fetch('https://api.weatherapi.com/v1/forecast.json?key=7a394824141a47de8e3205208231108&q=londond&days=1', 
    {mode: 'cors'})
    const response = await weatherInfoPromise.json()
    console.log("First Response")
    console.log(response)
    const weatherForecast = {
        Temperature_F: response.current.temp_f,
        Condition: response.current.condition.text,
        FeelsLike_F: response.current.feelslike_f,

        Wind_mph: response.current.wind_mph,
        GustSpd__mph: response.current.gust_mph,
        Humidity: response.current.humidity,
        UV: response.current.uv,
        Precipitation_in: response.current.precip_in,
        Cloudiness: `${response.current.cloud}%`,
    }
    return weatherForecast
}

const getThreeDayForecast = () =>{
    return fetch('https://api.weatherapi.com/v1/forecast.json?key=7a394824141a47de8e3205208231108&q=londond&days=3', {mode: 'cors'})
}

getDayWeatherForecast()
getThreeDayForecast().then((response) =>{
    return response.json()
}).then((response) =>{
    console.log(response.forecast.forecastday[1])
    console.log(response.forecast.forecastday[2])
})