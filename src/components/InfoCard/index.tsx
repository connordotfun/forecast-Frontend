import * as React from 'react'
import Message from '../../models/Message';
import { TwitterTweetEmbed } from 'react-twitter-embed';

interface InfoCardProps {
    data: Message
    city: string
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
            <h3>{props.city}</h3>
            <ul>
                <li>Weather: {props.data.temp}° F and {props.data.weather}</li>
                <li>Sentiment: {props.data.sentiment}</li>
            </ul>
            <TwitterTweetEmbed tweetId={props.data.exemplar} />
        </div>
    )
}

export default InfoCard