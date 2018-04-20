import * as React from 'react'
import Message from '../../models/Message';
// import { Tweet } from 'react-twitter-widgets';
import WeatherIcon from '../WeatherIcon'

import './index.css'

interface InfoCardProps {
    data: Message
    onClick?: () => void
    expanded?: boolean
}

const InfoCard: React.SFC<InfoCardProps> = (props) => {
    return (
        <div className="info-card" onClick={props.onClick}>
            <div className="weather">
                <WeatherIcon icon={props.data.weather.weather[0].icon} />
            </div>
            <div className="region">
                <h3 className="region-name">{props.data.region.name}</h3>
                <p className="sentiment">Sentiment: {props.data.sentiment.toFixed(5)}</p>
            </div>
            {/* {props.expanded && 
                <Tweet tweetId={props.data.tid} />
            } */}
        </div>
    )
}

export default InfoCard