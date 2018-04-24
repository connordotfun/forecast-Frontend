import * as React from 'react';
import { Coords } from 'google-map-react';
import { action, observable } from 'mobx'
import { observer, inject } from 'mobx-react'

import GoogleMap from '../../components/GoogleMap'
import Sidebar from '../../components/Sidebar'
import { NetworkStore } from '../../stores/networkStore'
import { MessageStore } from '../../stores/messageStore'

import './index.css';
import Message from '../../models/Message';

interface StoreProps {
  networkStore?: NetworkStore,
  messageStore?: MessageStore
} 

@inject('networkStore', 'messageStore')
@observer
class App extends React.Component<StoreProps> {

  @observable private _$google: {map: google.maps.Map, maps: any}
  private _allPolygons: google.maps.Polygon[] = []
  
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
    if (this._$google && this.props.messageStore) {
      this._allPolygons.forEach((polygon, index, arr) => {
        polygon.setMap(null)
      })
      this._allPolygons = []
      this.props.messageStore.$latestMessages.forEach((message: Message) => {
        const coords: Coords[] = [
          { lat: message.region.north, lng: message.region.east },
          { lat: message.region.south, lng: message.region.east },
          { lat: message.region.south, lng: message.region.west },
          { lat: message.region.north, lng: message.region.west },
        ]
  
        let polygon = new google.maps.Polygon({
            map: this._$google.map,
            paths: coords,
            strokeColor: '#FFFF',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#0000FF',
            fillOpacity: 0.0,
            draggable: false,
            editable: false,
            geodesic: false
          })

        this._allPolygons.push(polygon)
        message.region.polygon = polygon
        })
    }

    return (
      <div className="App">
        <GoogleMap 
          zoom={5}
          center={{
            lat: 40.015, 
            lng: -105.2705,
          }}
          apiHandler={this._onMapsLoad}
        />
        <Sidebar google={this._$google}/>
      </div>
    );
  }

  @action
  private _onMapsLoad = ((loadedGoogle: {map: google.maps.Map, maps: any}) => {
    this._$google = loadedGoogle
  }).bind(this)

}

export default App;
