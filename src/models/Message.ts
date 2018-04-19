import { Data } from './OWM'
import Region from './Region'

interface Message {
    ID: string,
    region: Region,
    sentiment: number,
    tid: string,
    weather: Data
}

export default Message
