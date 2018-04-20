// tslint:disable max-line-length
import * as React from 'react'

interface InfoCardProps {
    icon: string
}

const ICONS = {
    '01d': 'sun',
    '01n': 'moon',
    '02d': 'cloud sun',
    '02n': 'cloud moon',
    '03d': 'cloud',
    '03n': 'cloud',
    '04d': 'cloud',
    '04n': 'cloud',
    '09d': 'rain',
    '09n': 'rain',
    '10d': 'rain sun',
    '10n': 'rain moon',
    '11d': 'lightning',
    '11n': 'lightning',
    '13d': 'flurries',
    '13n': 'flurries',
    '50d': 'haze',
    '50n': 'haze'
}

const WeatherIcon: React.SFC<InfoCardProps> = (props) => {
    console.log(props.icon) //tslint:disable-line
    return (
        <span className={`weather-icon climacon ${ICONS[props.icon]}`} aria-hidden="true" />
    )
}

export default WeatherIcon