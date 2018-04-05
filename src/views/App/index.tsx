import * as React from 'react';
import GoogleMap from '../../components/GoogleMap'
import InfoCard from '../../components/InfoCard'
import { Coords } from 'google-map-react';
import Message from '../../models/Message';

import './index.css';

const locations = require('./locations.json')
const regionMap = locations.reduce(
                    (map: any, obj: any) => {
                      map[obj.ID] = obj.name;
                      return map;
                    },
                    {});

class App extends React.Component {
  private _latestMessages: {[key: string]: Message}
  private _thisRegion: string = 'BLD0'
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
        {this._latestMessages && this._thisRegion in this._latestMessages ?
          <InfoCard data={this._latestMessages[this._thisRegion]} city={regionMap[this._thisRegion]}/> : null 
        } 
      </div>
    );
  }

  private _switchRegion(newRegion: string) {
    this._thisRegion = newRegion
  }

  private _drawBox = ((google: {map:   any, maps: any }) => {
    const self = this
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
        self._switchRegion(boundingBox.boxID)
      })
    })
  }).bind(this)

}

export default App;
