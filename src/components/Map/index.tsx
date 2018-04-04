import * as React from 'react'
import GoogleMapReact, { Coords } from 'google-map-react'

const CleanerMidnight = require('./CleanerMidnight.json')

interface MapProps {
    children?: JSX.Element[] | JSX.Element
    initialZoom: number
    initialCenter: Coords
}

const Map: React.SFC<MapProps> = (props) => {
    return (
        <div className="map-container" style={{ height: '100vh', width: '100%'}}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyDSEL7djaF05NHigvL5_f7KYu_U26PEqRo'}}
                options={{styles: CleanerMidnight}}
                defaultZoom={props.initialZoom}
                defaultCenter={props.initialCenter}
            >
            {props.children ? props.children : null}
            </GoogleMapReact>
        </div>
    )
}

export default Map