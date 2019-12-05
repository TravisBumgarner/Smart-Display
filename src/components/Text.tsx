import React from 'react'
import styled from 'styled-components'


const DefaultText = styled.p`
    font-size: 1em;
    font-family: 'Montserrat', sans-serif;
    line-height: 1.5;
`

const Text = ({ children }) => {
    return <DefaultText>{children}</DefaultText>
}

export default Text