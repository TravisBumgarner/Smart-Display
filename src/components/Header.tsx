
import React from 'react'
import styled, { css } from 'styled-components'

const sharedStyles = () => css`
    font-weight: 700;
    font-family: 'Montserrat', sans-serif;
`

const LargeHeader = styled.h1`
    ${(props) => sharedStyles()};
    margin-bottom: 0.6em;
    margin-top: 0.6em;
    font-size: 1.5em;
`

const MediumHeader = styled.h2`
    ${(props) => sharedStyles()};
    margin-bottom: 0.4em;
    margin-top: 0.4em;
    font-size: 1.25em;
`

const SmallHeader = styled.h3`
    ${(props) => sharedStyles()};
    font-size: 1em;
    margin-bottom: 0.2em;
    margin-top: 0.2em;
`

const InlineHeader = styled.span`
    margin: 0 5px;
    text-transform: uppercase;
    font-weight: 700;
`

const Header = ({ size, children }) => {
    switch (size) {
        case 'large':
            return <LargeHeader>{children}</LargeHeader>
        case 'medium':
            return <MediumHeader>{children}</MediumHeader>
        case 'small':
            return <SmallHeader>{children}</SmallHeader>
        case 'inline':
            return <InlineHeader>{children}</InlineHeader>
        default:
            return <SmallHeader>{children}</SmallHeader>
    }
}

export default Header