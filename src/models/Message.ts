import Weather from './Weather';

interface Message {
    name: string,
    ID: string,
    sentiment: number,
    tid: number,
    weather: Weather
    centerLat: number,
    centerLong: number
}

export default Message
