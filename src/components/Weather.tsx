import React from 'react'
import styled from 'styled-components'

import { Header } from './'

const WeatherWrapper = styled.div`
    display: flex;
`

const Weather = () => {
    return (
        <WeatherWrapper>
            <Header size="medium">Weather</Header>
        </WeatherWrapper>
    )
}

export default Weather