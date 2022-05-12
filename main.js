const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const input = $('.input')
function changeWeatherCurrentDay(weatherData1) {
    const name = $('.name')
    const date = $('.date')
    const time = $('.time')
    let crtdate = new Date(Date.now())
    name.innerText = `${weatherData1.name}, ${weatherData1.sys.country}`
    date.innerText = `${crtdate.getDate()}/${crtdate.getMonth() + 1}/${crtdate.getFullYear()}`
    time.innerHTML = `${crtdate.getHours()}:${parseInt(crtdate.getMinutes())>=10?crtdate.getMinutes():'0' + crtdate.getMinutes()}
                    <span>PM</span>
                    `
    $('.desc__temp').innerText = `${Math.round(weatherData1.main.temp - 273.15)}°C`
    $('.short-desc').innerText = `${weatherData1.weather[0].main}`
    $('.desc__img').src = `http://openweathermap.org/img/wn/${weatherData1.weather[0].icon}@2x.png`
}
function changeFutureWeather(weatherData2) {
    let weatherList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const weatherDayList = $$('.future-weather__day')
    const weatherDayTemp = $$('.future-weather__temp')
    const weatherNightTemp = $$('.future-humidity')
    const shortDesc = $$('.future-weather-short-desc')
    const img = $$('.future-weather-desc__img')
    let currentDate = new Date(Date.now())
    let currentDay = currentDate.getDay()
    for (let i = currentDay + 1, index = 0; index < 6; index++, i++) {
        if (i > 6) {
            i = 0
            index--
        }
        else {
            weatherDayList[index].innerText = weatherList[i]
        }
    }
    for (let i = 0; i < 6; i++) {
        weatherDayTemp[i].innerText = `${Math.round(weatherData2.daily[i].temp.day - 273.15)}°C`
        weatherNightTemp[i].innerText = `${Math.round(weatherData2.daily[i].temp.night - 273.15)}°C`
        shortDesc[i].innerText = `${weatherData2.daily[i].weather[0].main}`
        img[i].src = `http://openweathermap.org/img/wn/${weatherData2.daily[i].weather[0].icon}@2x.png`
    }
}
async function start(input) {
    const API_KEY = 'c96631001f8c1148182eba9dfa6002f1'
    let api1URL = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${API_KEY}`
    let data1 = await fetch(api1URL).then(res => res.json())
    let api2URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${data1.coord.lat}&lon=${data1.coord.lon}&exclude=minutely,hourly,alert&appid=${API_KEY}`
    let data2 = await fetch(api2URL).then(res => res.json())
    changeWeatherCurrentDay(data1)
    changeFutureWeather(data2)
}
input.addEventListener('keyup', (e) => {
    if (e.which == 13) {
        start(input.value)
        e.target.value = ''
        e.target.focus()
    }
})
start('ho chi minh')
