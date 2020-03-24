/*
    TODO later
*/

import nodeGeocoder, { Providers,Geocoder } from 'node-geocoder'
import {BaseOptions,GenericOptions} from 'node-geocoder'

//This sets our connection to mapquest so we can use their service for geolocations
const options:BaseOptions & GenericOptions = {
    provider: (process.env.GEOCODER_PROVIDER as Providers),
    httpAdapter:'https',
    apiKey:(process.env.GEOCODER_API_KEY as string),
    formatter:null
}

const geocoder:Geocoder = nodeGeocoder(options)

export {geocoder}