import * as React from 'react';
import GoogleMap from '../../components/GoogleMap'
import InfoCard from '../../components/InfoCard'
import { Coords } from 'google-map-react';
import Message from '../../models/Message';
import { observable, action } from 'mobx'
import { observer, inject } from 'mobx-react'

import { SSEStore } from '../../stores/sseStore'
import { MessageStore } from '../../stores/messageStore'

import './index.css';

const locations = require('./locations.json')

interface StoreProps {
  sseStore: SSEStore,
  messageStore: MessageStore
} 

@inject('sseStore', 'messageStore')
@observer
class App extends React.Component<StoreProps> {
  
  @action
  componentWillMount() {
    if (this.props.sseStore) {
      this.props.sseStore.initializeConnection('URL_HERE')
    }
  }

  @action
  componentWillUnmount() {
    if (this.props.sseStore) {
      this.props.sseStore.closeConnection()
    }
  }

  @observable private _thisRegion: string = ''
  render() {
    const _regionObject: Message | null = this.props.messageStore ?
                                          this.props.messageStore.getMessage(this._thisRegion) :
                                          null
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
        {_regionObject ?
          <InfoCard data={_regionObject}/> : null 
        } 
      </div>
    );
  }

  @action
  private _switchRegion(newRegion: string) {
    this._thisRegion = newRegion
  }

  private _drawBox = ((google: {map: any, maps: any }) => {
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
