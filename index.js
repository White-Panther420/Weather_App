let conversion = "imperial"

const getDayWeatherForecast = async (searchKey, conversion) =>{
    const weatherInfoPromise= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7a394824141a47de8e3205208231108&q=${searchKey}&days=1`, 
    {mode: 'cors'})
    const response = await weatherInfoPromise.json()
    try{
        if(conversion === "imperial"){
            const weatherForecastImperial = {
                Search_Location: response.location.name,
                Country: response.location.country,
        
                Forecast_Date: response.location.localtime,
    
                Forecast_Image: response.current.condition.icon,
                Temperature_F: `${response.current.temp_f}\u00B0F`,
                Condition: response.current.condition.text,
                FeelsLike_F: `${response.current.feelslike_f}\u00B0F`,
        
                Wind_mph: `${response.current.wind_mph}mph`,
                wimd_direction: response.current.wind_degree,
                GustSpd__mph: `${response.current.gust_mph}mph`,
                Humidity: response.current.humidity,
                UV: response.current.uv,
                Precipitation_in: `${response.current.precip_in}in`,
                Cloudiness: `${response.current.cloud}%`,
                Sunrise: response.forecast.forecastday[0].astro.sunrise,
                Sunset: response.forecast.forecastday[0].astro.sunset,
                Moon_phase: response.forecast.forecastday[0].astro.moon_phase,
            }
            return weatherForecastImperial
        }else if(conversion === "metric"){
            // Forgot to removeunits from key names. Disregard them
            const weatherForecastMetric = {
                Search_Location: response.location.name,
                Country: response.location.country,
        
                Forecast_Date: response.location.localtime,
    
                Forecast_Image: response.current.condition.icon,
                Temperature_F: `${response.current.temp_c}\u00B0C`,
                Condition: response.current.condition.text,
                FeelsLike_F: `${response.current.feelslike_c}\u00B0C`,
        
                Wind_mph: `${response.current.wind_kph}kph`,
                wimd_direction: response.current.wind_degree,
                GustSpd__mph: `${response.current.gust_kph}kph`,
                Humidity: response.current.humidity,
                UV: response.current.uv,
                Precipitation_in: `${response.current.precip_mm}mm`,
                Cloudiness: `${response.current.cloud}%`,
                Sunrise: response.forecast.forecastday[0].astro.sunrise,
                Sunset: response.forecast.forecastday[0].astro.sunset,
                Moon_phase: response.forecast.forecastday[0].astro.moon_phase,
            }
            return weatherForecastMetric
        }
        
    }catch(error){
        displayError()
    }
}

const getThreeDayForecast = (searchValue) =>{
    return fetch(`https://api.weatherapi.com/v1/forecast.json?key=7a394824141a47de8e3205208231108&q=${searchValue}&days=3`, {mode: 'cors'})
    .then((response) =>{
        return response.json()
    }).then((result) =>{
        const daysForecasts = []
        resultForexastArray = result.forecast.forecastday
        for(let i=0; i<resultForexastArray.length; i++){
            if(conversion === 'imperial'){
                const imperialDayForecastObject = {
                    Forecast_Icon: resultForexastArray[i].day.condition.icon,
    
                    DayName: formatDate(resultForexastArray[i].date, 'yes'),
                    Min_Temp: `${resultForexastArray[i].day.mintemp_f}\u00B0F`,
                    Max_Temp: `${resultForexastArray[i].day.maxtemp_f}\u00B0F`,
                    Avg_Humidity: `${resultForexastArray[i].day.avghumidity}%`,
                }
                daysForecasts.push(imperialDayForecastObject)
            }else if(conversion === 'metric'){
                const metricDayForecastObject = {
                    Forecast_Icon: resultForexastArray[i].day.condition.icon,
    
                    DayName: formatDate(resultForexastArray[i].date, 'yes'),
                    Min_Temp: `${resultForexastArray[i].day.mintemp_c}\u00B0C`,
                    Max_Temp: `${resultForexastArray[i].day.maxtemp_c}\u00B0C`,
                    Avg_Humidity: `${resultForexastArray[i].day.avghumidity}%`,
                }
                daysForecasts.push(metricDayForecastObject)
            }
        }
        return daysForecasts
    }).catch((error) =>{
        displayError()
    })
}

const formatDate = (dateString, onlyReturnDayName ="") =>{
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 
        'Thursday', 'Friday', 'Saturday'
    ];
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];

    if(onlyReturnDayName !== ""){
        const date = new Date(dateString + "T00:00") // Get date with local time to avoid incorrect date
        let dayName = days[date.getDay()];
        return `${dayName}`
    }else{
        const date = new Date(dateString) // Get date with UT
        let dayName = days[date.getDay()];
        let day = date.getDate()
        let monthName = months[date.getMonth()]
        let year = date.getFullYear()
        const localHour = String(date.getHours()).padStart(2, '0');
        const localMinutes = String(date.getMinutes()).padStart(2, '0');
    
        const formattedDate = `${dayName} ${day} ${monthName} ${year} | ${localHour}:${localMinutes}`
        return formattedDate
    }
}

const displayDayWeatherForecast = (forecast) =>{
    const location = document.querySelector(".location")
    location.textContent = `${forecast.Search_Location}, ${forecast.Country}`

    const dateAndTime = document.querySelector(".date")
    dateAndTime.textContent = formatDate(forecast.Forecast_Date)

    const forecastImg = document.querySelector(".forecastImg")
    forecastImg.src = forecast.Forecast_Image

    const temperature = document.querySelector(".temperature")
    temperature.textContent = `${forecast.Temperature_F}`

    const condition = document.querySelector(".condition")
    condition.textContent = forecast.Condition

    const feels_like = document.querySelector('.feels_like')
    feels_like.textContent = `Feels like ${forecast.FeelsLike_F}`

    const windDirectionImg = document.querySelector(".wind_direction")
    windDirectionImg.src = "./Assets/Images/arrow.png"
    windDirectionImg.style.rotate = `${forecast.wimd_direction}deg` 
    const windSpeedP = document.querySelector(".forecast_info")
    windSpeedP.textContent = `${forecast.Wind_mph}`

    const gustElement = document.querySelector('.Gust');
    gustElement.textContent = `${forecast.GustSpd__mph}`

    const humidityElement = document.querySelector('.Humidity');
    humidityElement.textContent = `${forecast.Humidity}%`

    const uvElement = document.querySelector('.UV');
    const uvDiv = document.querySelector(".UV_Forecast_container")
    if(forecast.UV >= 4 && forecast.UV <= 7){
        uvDiv.style.background = "rgb(206 206 33)"
    }else if(forecast.UV >= 8){
        uvDiv.style.background = "rgb(228, 15, 15)"
    }else{
        uvDiv.style.background = "rgb(33, 186, 33)"
    }
    uvElement.textContent = forecast.UV

    const precipitationElement = document.querySelector('.Precipitation');
    precipitationElement.textContent = `${forecast.Precipitation_in}`
    
    const cloudinessElement = document.querySelector('.Cloudiness');
    cloudinessElement.textContent = `${forecast.Cloudiness}`

    const sunriseElement = document.querySelector('.Sunrise');
    sunriseElement.textContent = forecast.Sunrise

    const sunsetElement = document.querySelector('.Sunset');
    sunsetElement.textContent = forecast.Sunset

    const moonElement = document.querySelector(".Moon")
    const moonPhase = forecast.Moon_phase
    moonElement.textContent = moonPhase
    const moonImg = document.querySelector(".moonImg")
    switch(moonPhase.toLowerCase()){
        case "waning crescent":{
            moonImg.src = "./Assets/Images/crescent_left.svg"
            break;
        }
        case "waxing crescent":{
            moonImg.src = "./Assets/Images/crescent_right.svg"
            break;
        }
        case "last quarter":{
            moonImg.src = "./Assets/Images/last_quarter.svg"
            break;
        }
        case "first quarter":{
            moonImg.src = "./Assets/Images/first_quarter.svg"
            break;
        }
        case "full moon":{
            moonImg.src = "./Assets/Images/full.png"
            break;
        }
        case "new moon":{
            moonImg.src = "./Assets/Images/new_moon.svg"
            break;
        }
        case "waxing gibbous":{
            moonImg.src = "./Assets/Images/maxing_Gibbuss.svg"
            break;
        }
        case "waning gibbous":{
            moonImg.src = "./Assets/Images/Waning_Gibbous.svg"
            break;
        }
    }
}

const displayThreeDayForcast = (forcastArray) =>{
    const forcastTable = document.querySelectorAll(".day_foreecast_row_div")
    for(let i=0; i<forcastArray.length; i++){
        const day = forcastTable[i].querySelector(".day")
        day.textContent = forcastArray[i].DayName
        
        const weatherIcon = forcastTable[i].querySelector(".weather_icon")
        weatherIcon.src = forcastArray[i].Forecast_Icon
        
        const highTempP = forcastTable[i].querySelector(".high_temp")
        highTempP.textContent = forcastArray[i].Max_Temp
        
        const lowTempP = forcastTable[i].querySelector(".low_temp")
        lowTempP.textContent = forcastArray[i].Min_Temp
        
        const avgHumidityP = forcastTable[i].querySelector(".Avg_Humidity")
        avgHumidityP.textContent = forcastArray[i].Avg_Humidity
    }
}

const displayError = ()=>{
    const location = document.querySelector(".location")
    const date = document.querySelector(".date")
    location.style.display = 'none'
    date.style.display = "none"
    const weatherContent = document.querySelector(".body_content")
    weatherContent.style.display = "none"
    const errorMsg = document.querySelector(".error")
    errorMsg.classList.add("active")
}

const searchBar = document.querySelector(".searchBar")
const searchBtn = document.querySelector(".searchBtn")
searchBtn.addEventListener("click", async () =>{
    await searchWeather(searchBar.value)
})

searchBar.addEventListener("keydown", async (e) =>{
    if(e.code === "Enter"){
        await searchWeather(searchBar.value)
    }
})

const clearSearchBtn = document.querySelector(".clearSearch")
searchBar.addEventListener("input", () => {
    clearSearchBtn.style.display = "inline-flex"
})

searchBar.addEventListener("mouseenter", ()=>{
    if(searchBar.value !== ""){
        clearSearchBtn.style.display = "inline-flex"
    }
    searchBar.style.outline = "2px solid white"
})

searchBar.addEventListener("mouseleave", (e)=>{
    // Check to see if mouse is on search icon or X icon 
    //Prevents the event from triggering
    const searchBarElements = e.relatedTarget
    if(!searchBtn.contains(searchBarElements) && !clearSearchBtn.contains(searchBarElements)){
        clearSearchBtn.style.display = "none"
        searchBar.style.outline = "none"
    }
})

clearSearchBtn.addEventListener("click", () =>{
    clearSearchBtn.style.display = "none"
    searchBar.value = ""
})

const searchWeather = async (searchValue) =>{
    const presenterrorMsg = document.querySelector(".active")
    if(presenterrorMsg !== null){
        presenterrorMsg.classList.remove('active')
        const weather_content_container = document.querySelector(".body_content")
        const location = document.querySelector(".location")      
        const date = document.querySelector(".date")
        location.style.display = "block"
        date.style.display = "block"

        weather_content_container.style.display = "flex"
    }   
    const weatherForecast = await getDayWeatherForecast(searchValue, conversion)
    displayDayWeatherForecast(weatherForecast)
    getThreeDayForecast(searchValue).then((result) =>{
        displayThreeDayForcast(result)
    }).catch((error) =>{
        displayError()
    })
}

const metricBtn = document.querySelector(".metricCoversion")
const imperialBtn = document.querySelector(".imperialConversion")

metricBtn.addEventListener("click", async ()=>{
    if(imperialBtn.classList.contains("selected")){
        imperialBtn.classList.remove("selected")
    }
    await convertDataUnits(metricBtn, "metric")
})
imperialBtn.addEventListener("click", async ()=>{
    if(metricBtn.classList.contains("selected")){
        metricBtn.classList.remove("selected")
    }
    await convertDataUnits(imperialBtn, "imperial")
})

const convertDataUnits = async (conversionBtn, conversionType) =>{
    conversionBtn.classList.add("selected")
    conversion = `${conversionType}`
    const location = document.querySelector(".location").textContent
    convertedForcast = await getDayWeatherForecast(location, conversion)
    convertedThreeDayForecast = await getThreeDayForecast(location, conversion)
    displayDayWeatherForecast(convertedForcast)
    displayThreeDayForcast(convertedThreeDayForecast)
}

searchBar.value = "Tempe"
searchBtn.click()
searchBar.value = ""

