import axios from 'axios'

import * as config from '../../../../config'

const routeDetails = async (route: string) => {
    const { data: { data } } = await axios.get(`${config.MBTA_BASE_URL}/routes/${route}`, {
        params: {

        },
        headers: {
            'x-api-key': config.MBTA_API_KEY
        }
    })
    return data
}

const allRoutes = async () => {
    const { data: { data } } = await axios.get(`${config.MBTA_BASE_URL}/routes`, {
        params: {

        },
        headers: {
            'x-api-key': config.MBTA_API_KEY
        }
    })
    const routeIds = data.map(({ id, attributes: { short_name } }) => `${id}-${short_name}\n`).join(',')
    console.log(routeIds)
    return data
}

const stopsByRouteAndName = async (route: string, name: string) => {
    const { data: { data } } = await axios.get(`${config.MBTA_BASE_URL}/stops?filter[route]=${route}`, {
        params: {

        },
        headers: {
            'x-api-key': config.MBTA_API_KEY
        }
    })
    const filteredData = data.filter(({ attributes }) => {
        return attributes.name.toLowerCase().includes(name)
    })

    return filteredData
}

const predictions = async (stop: string) => {
    const { data: { data } }: { data: { data: any[] } } = await axios.get(`${config.MBTA_BASE_URL}/predictions?filter[stop]=${stop}`, {
        params: {

        },
        headers: {
            'x-api-key': config.MBTA_API_KEY
        }
    })
    return data
}

export {
    routeDetails,
    allRoutes,
    stopsByRouteAndName,
    predictions
}