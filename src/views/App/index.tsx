import * as React from 'react';
import { Coords } from 'google-map-react';
import { action, observable } from 'mobx'
import { observer, inject } from 'mobx-react'

import GoogleMap from '../../components/GoogleMap'
import Sidebar from '../../components/Sidebar'
import { NetworkStore } from '../../stores/networkStore'
import { MessageStore } from '../../stores/messageStore'
import { CardExpandedStore } from '../../stores/cardExpandedStore'

import './index.css';
import Message from '../../models/Message';

interface StoreProps {
  networkStore?: NetworkStore,
  messageStore?: MessageStore,
  cardExpandedStore?: CardExpandedStore
} 

@inject('networkStore', 'messageStore', 'cardExpandedStore')
@observer
class App extends React.Component<StoreProps> {

  @observable private _$google: {map: google.maps.Map, maps: any}
  private _allPolygons: Map<string, google.maps.Polygon> = new Map()
  
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
        
        let currentPolygon = this._allPolygons.get(message.region.ID)

        if (currentPolygon) {
          currentPolygon.setMap(null)
        }

        this._allPolygons.set(message.region.ID, polygon)

        polygon.addListener('click', (event: google.maps.PolyMouseEvent) => {
          if (this.props.cardExpandedStore) {
            this.props.cardExpandedStore.toggleExpanded(message.region.ID)
          }
        })
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
