import Weather from './Weather';
import { Data } from './OWM'

interface Message {
    name: string,
    ID: string,
    sentiment: number,
    tid: string,
    weather: Data
    centerLat: number,
    centerLon: number
}

export default Message
