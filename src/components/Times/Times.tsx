import React from 'react'
import styled from 'styled-components'

import { mbta } from './services'
import { useInterval } from '../../utilities'
import { Header, Text } from '../'

const StopWrapper = styled.div`
    margin-right: 30px; 
    padding: 10px 10px 10px 0;
`

const StopsWrapper = styled.div`
    display: flex;
`

const STOPS = [
    {
        id: '2773',
        intersection: 'Washington St & Merriam St',
        nickname: 'Police Station to Sullivan'
    },
    {
        id: '2774',
        intersection: 'Washington St @ McGrath Hwy ',
        nickname: 'Dealership to Sullivan'
    },
    {
        id: '2610',
        intersection: 'Washington St @ Washington Terr',
        nickname: 'Police Station to Sullivan'
    },
]

const ROUTES = ['86', '91', '747']

const STOP_IDS = STOPS.map(({ id }) => id)

const formatDateToTime = (dateStr) => {
    const date = new Date(dateStr)
    const hours = date.getHours() % 12
    const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    return `${hours}:${minutes}`
}

const calculateTimeToDeparture = (dateStr) => {
    const now = Date.now()
    const then = new Date(dateStr).getTime()
    const difference_in_seconds = (then - now) / 1000

    const rawMinutes = Math.floor(difference_in_seconds / 60)
    const minutes = rawMinutes < 10 ? '0' + rawMinutes : rawMinutes

    const rawSeconds = Math.round(difference_in_seconds - rawMinutes * 60)
    const seconds = rawSeconds < 10 ? '0' + rawSeconds : rawSeconds
    return `${minutes}:${seconds}`
}

const ROUTE_LOOKUP = {
    '86': '86',
    '91': '91',
    '747': 'CT2'
}

const getStopPredictions = (stop) => {
    const predictions = mbta
        .predictions(stop)
        .then(predictions => {
            return predictions.map(prediction => {
                const departure = formatDateToTime(prediction.attributes.departure_time)
                const route = ROUTE_LOOKUP[prediction.relationships.route.data.id]
                const timeToDeparture = calculateTimeToDeparture(prediction.attributes.departure_time)
                return { route, departure, timeToDeparture }
            })
        })
    return predictions
}

const getPredictions = () => {
    const predictions = Promise
        .all(STOP_IDS.map(id => getStopPredictions(id)))
        .then(predictionsForStop => {
            const output = {}
            predictionsForStop.forEach((prediction, index) => {
                const stopId = STOP_IDS[index]
                output[stopId] = prediction
            })
            return output
        })
    return predictions
}

const Times = () => {
    const [predictions, setPredictions] = React.useState<any>({})

    React.useEffect(() => {
        getPredictions().then(setPredictions)
    }, [])

    useInterval(() => {
        getPredictions().then(setPredictions)
    }, 10000)

    const Predictions = STOP_IDS.map(id => {
        if (!Object.keys(predictions).length) {
            return
        }

        const stopPredictions = {}
        predictions[id]
            .forEach(({ route, timeToDeparture }) => {
                stopPredictions[route]
                    ? stopPredictions[route].push(timeToDeparture)
                    : stopPredictions[route] = [timeToDeparture]
            })
        console.log(stopPredictions)
        const Departures = Object.keys(stopPredictions).map(key => <li key={key}>{key} - {stopPredictions[key].join(', ')}</li>)

        const { intersection, nickname } = STOPS.find((stop) => stop.id === id)
        const stopNickname = <Header size="small">{nickname}</Header>
        const stopIntersection = <Text >{intersection}</Text>


        return (
            <StopWrapper>
                {stopIntersection}
                {stopNickname}
                <ul key={id}>
                    {Departures}
                </ul>
            </StopWrapper>
        )
    })

    return (
        <React.Fragment>
            <Header size="medium">Next Stop</Header>
            <StopsWrapper>
                {Predictions}
            </StopsWrapper>
        </React.Fragment>
    )
}

export default Times