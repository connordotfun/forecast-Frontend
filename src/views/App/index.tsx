import * as React from 'react';
// import { Coords } from 'google-map-react';
import { action, observable } from 'mobx'
import { observer, inject } from 'mobx-react'

import GoogleMap from '../../components/GoogleMap'
import Sidebar from '../../components/Sidebar'
import { NetworkStore } from '../../stores/networkStore'
import { MessageStore } from '../../stores/messageStore'
import { CardExpandedStore } from '../../stores/cardExpandedStore'

import './index.css';

interface StoreProps {
  networkStore?: NetworkStore,
  messageStore?: MessageStore,
  cardExpandedStore?: CardExpandedStore
} 

@inject('networkStore', 'messageStore', 'cardExpandedStore')
@observer
class App extends React.Component<StoreProps> {

  @observable private _$google: {map: google.maps.Map, maps: any}
  
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
