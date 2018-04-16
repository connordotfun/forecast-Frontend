import * as React from 'react'
import Message from '../../models/Message';
import { Tweet } from 'react-twitter-widgets';

interface InfoCardProps {
    data: Message
}

const InfoCard: React.SFC<InfoCardProps> = (props) => {
    const infoCardStyle: React.CSSProperties = {
        position: 'fixed',
        width: '300px',
        height: '150px',
        top: '10px',
        right: '10px',
        backgroundColor: 'white'
    }
    return (
        <div className="info-card" style={infoCardStyle}>
            <h3>{props.data.name}</h3>
            <ul>
                <li>Weather: {props.data.weather.temp}° F with {props.data.weather.description}</li>
                <li>Sentiment: {props.data.sentiment}</li>
            </ul>
            <Tweet tweetId={props.data.tid} />
        </div>
    )
}

export default InfoCard