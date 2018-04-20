import * as React from 'react';
import { Coords } from 'google-map-react';
import { action } from 'mobx'
import { observer, inject } from 'mobx-react'

import GoogleMap from '../../components/GoogleMap'
import Sidebar from '../../components/Sidebar'
import { NetworkStore } from '../../stores/networkStore'
import { MessageStore } from '../../stores/messageStore'

import './index.css';

const locations = require('./locations.json')

interface StoreProps {
  networkStore?: NetworkStore,
  messageStore?: MessageStore
} 

@inject('networkStore', 'messageStore')
@observer
class App extends React.Component<StoreProps> {
  
  @action
  componentWillMount() {
    if (this.props.networkStore) {
      this.props.networkStore.initializeConnection('URL_HERE')
      this.props.networkStore.fetchCurrentData()
    }
  }

  @action
  componentWillUnmount() {
    if (this.props.networkStore) {
      this.props.networkStore.closeConnection()
    }
  }

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
        <Sidebar />
      </div>
    );
  }

  // @action
  // private _switchRegion(newRegion: string) {
  //   this._thisRegion = newRegion
  // }

  private _drawBox = ((google: {map: any, maps: any }) => {
    // const self = this
    locations.forEach((location: any) => {
      const coords: Coords[] = [
        { lat: location.north, lng: location.east },
        { lat: location.south, lng: location.east },
        { lat: location.south, lng: location.west },
        { lat: location.north, lng: location.west },
      ]
      // let boundingBox = 
      new google.maps.Polygon({
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

      // google.maps.event.addListener(boundingBox, 'click', (event: google.maps.PolyMouseEvent) => {
      //   self._switchRegion(boundingBox.boxID)
      // })
    })
  }).bind(this)

}

export default App;
