import React from 'react'
import styled from 'styled-components'

import { Times, Header, Weather } from './components'
import { useInterval } from './utilities'

const AppWrapper = styled.div`
    font-size: 16px;
    background-color: black;
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    color: white;
    padding: 0px 10px;
`

const App = () => {
    const [now, setNow] = React.useState('')
    const [today, setToday] = React.useState('')

    useInterval(() => {
        setToday(new Date().toLocaleDateString())
        setNow(new Date().toLocaleTimeString())
    }, 1000)


    return (
        <AppWrapper>
            <Header size="large">Hello, today is {today} it is {now}.</Header>
            <Times />
            <Weather />
        </AppWrapper>
    )
}

export default App