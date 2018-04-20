import * as React from 'react'
import GoogleMapReact, { Coords } from 'google-map-react'

const CleanerMidnight = require('./CleanerMidnight.json')

interface MapProps {
    children?: JSX.Element[] | JSX.Element
    zoom: number
    center: Coords,
    apiHandler: (google: { map: any, maps: any }) => void // tslint:disable-line
}

const GoogleMap: React.SFC<MapProps> = (props) => {
    return (
        <div className="map-container" style={{ height: '100%', width: '100%', gridArea: 'map'}}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyDSEL7djaF05NHigvL5_f7KYu_U26PEqRo' }}
                options={{styles: CleanerMidnight}}
                zoom={props.zoom}
                center={props.center}
                yesIWantToUseGoogleMapApiInternals={true}
                onGoogleApiLoaded={props.apiHandler}
            >
            {props.children ? props.children : null}
            </GoogleMapReact>
        </div>
    )
}

export default GoogleMap