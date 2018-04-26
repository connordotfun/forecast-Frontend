import * as React from 'react'
import Message from '../../models/Message';
import WeatherIcon from '../WeatherIcon'
import SidebarTweet from '../SidebarTweet'

import './index.css'

interface InfoCardProps {
    data: Message
    onClick?: () => void
    expanded?: boolean
}

const InfoCard: React.SFC<InfoCardProps> = (props) => {
        return (
            <div
                className={`info-card ${props.expanded ? 'expanded' : ''}`}
                id={`${props.data.region.ID}`}
                onClick={props.onClick}
            >
                <div className="basic-info">
                    <div className="weather">
                        <WeatherIcon icon={props.data.weather.weather[0].icon} />
                    </div>
                    <div className="region">
                        <h3 className="region-name">{props.data.weather.name}</h3>
                        <p className="sentiment">Sentiment: {props.data.sentiment.toFixed(5)}</p>
                    </div>
                </div>
                {props.expanded && 
                    <div className="expanded-info">
                        <SidebarTweet tid={props.data.tid} />
                    </div>
                }
            </div>
        )
    }

export default InfoCard