import React from 'react'
import styled from 'styled-components'

import { weather } from '../services'
import { Header } from './'
import { useInterval } from '../utilities'

const WeatherDetailsWrapper = styled.div`
    display: flex;
`

const WeatherWrapper = styled.div`
    margin-top: 2em;
`

const WeatherSegment = styled.div`
    margin-right: 1em; 
    border-left: 2px solid white;
    padding-left: 10px;
`

const CurrentTemperature = styled.p`
    font-size: 1.5em;
`

const unixToTime = (unix_timestamp) => {
    const date = new Date(unix_timestamp * 1000);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();

    const formattedTime = hours + ':' + minutes.substr(-2);
    return formattedTime
}

const Weather = () => {
    const [weatherDetails, setWeatherDetails] = React.useState(null)
    const [lastUpdated, setLastUpdated] = React.useState(null)

    const fetchWeather = () => {
        weather.weatherDetails('02143').then(setWeatherDetails)
        setLastUpdated(new Date().toLocaleTimeString())
    }

    React.useEffect(() => { fetchWeather() }, [])
    useInterval(() => { fetchWeather() }, 1000 * 60 * 60)

    return (
        <WeatherWrapper>
            <Header size="medium">Weather (Last Updated: {lastUpdated})</Header>
            {
                weatherDetails ?
                    (<WeatherDetailsWrapper>
                        <WeatherSegment>
                            <Header size="small">Temperature</Header>
                            <CurrentTemperature>{weatherDetails.main.temp}F</CurrentTemperature>
                            <p>Min: {weatherDetails.main.temp_min}F</p>
                            <p>Max: {weatherDetails.main.temp_max}F</p>
                        </WeatherSegment>
                        <WeatherSegment>
                            <Header size="small">Details</Header>
                            <ul>{weatherDetails.weather.map(({ description }) => <li>{description.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')}</li>)}</ul>
                        </WeatherSegment>
                        <WeatherSegment>
                            <Header size="small">Sun</Header>
                            <p>Sunrise: {unixToTime(weatherDetails.sys.sunrise)}</p>
                            <p>Sunset: {unixToTime(weatherDetails.sys.sunset)}</p>
                        </WeatherSegment>

                    </WeatherDetailsWrapper>) : (
                        null
                    )
            }
        </WeatherWrapper>
    )


}

export default Weather