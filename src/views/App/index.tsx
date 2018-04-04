import * as React from 'react';
import GoogleMap from '../../components/GoogleMap'
import InfoCard from '../../components/InfoCard'
import './index.css';
import { Coords } from 'google-map-react';

const locations = require('./locations.json')

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <GoogleMap 
          initialZoom={5}
          initialCenter={{
            lat: 40.015, 
            lng: -105.2705,
          }}
          apiHandler={this._drawBox}
        />
        <InfoCard />
      </div>
    );
  }

  private _drawBox(google: { map: any, maps: any }) {
    locations.forEach((location: any) => {
      const coords: Coords[] = [
        { lat: location.north, lng: location.east },
        { lat: location.south, lng: location.east },
        { lat: location.south, lng: location.west },
        { lat: location.north, lng: location.west },
      ]
      let boundingBox = new google.maps.Polygon({
          map: google.map,
          paths: coords,
          strokeColor: '#FFFF',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#0000FF',
          fillOpacity: 0.0,
          draggable: false,
          editable: false,
          geodesic: false,
          boxID: location.ID
        })

      google.maps.event.addListener(boundingBox, 'click', (event: google.maps.PolyMouseEvent) => {
        console.log(boundingBox.boxID) //tslint:disable-line
      })
    })
  }
}

export default App;
