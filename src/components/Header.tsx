
import React from 'react'
import styled, { css } from 'styled-components'

const sharedStyles = () => css`
    font-weight: 700;
    font-family: 'Montserrat', sans-serif;
`

const LargeHeader = styled.h1`
    ${(props: Partial<HeaderProps>) => sharedStyles()};
    margin-bottom: 1em;
    margin-top: 1em;
    font-size: 2em;
`

const MediumHeader = styled.h2`
    ${(props: Partial<HeaderProps>) => sharedStyles()};
    margin-bottom: 1em;
    margin-top: 1em;
    font-size: 1.5em;
`

const SmallHeader = styled.h3`
    ${(props: Partial<HeaderProps>) => sharedStyles()};
    font-size: 1.2em;
    margin-bottom: 1em;
    margin-top: 1em;
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