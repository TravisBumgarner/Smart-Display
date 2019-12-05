import React from 'react'
import styled from 'styled-components'

import { Times, Header, Weather } from './components'

const AppWrapper = styled.div`
    font-size: 16px;
    padding: 30px;
    background-color: black;
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    color: white;
`

const App = () => {
    return (
        <AppWrapper>
            <Header size="large">Hello.</Header>
            <Times />
            <Weather />
        </AppWrapper>
    )
}

export default App