import * as React from 'react';
import GoogleMap from '../../components/GoogleMap'
import InfoCard from '../../components/InfoCard'
import { Coords } from 'google-map-react';
import Message from '../../models/Message';
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import './index.css';

const locations = require('./locations.json')

@observer
class App extends React.Component {
  @observable private _latestMessages: Message[]
  @observable private _thisRegion: string = 'BLD0'
  @observable private _regionObject: Message | undefined = this._latestMessages.find(
    message => message.ID === this._thisRegion
  )
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
        {this._regionObject ?
          <InfoCard data={this._regionObject}/> : null 
        } 
      </div>
    );
  }

  private _switchRegion(newRegion: string) {
    this._thisRegion = newRegion
    this._regionObject = this._latestMessages.find(message => message.ID === newRegion) 
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
