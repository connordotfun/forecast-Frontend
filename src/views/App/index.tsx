import * as React from 'react';
import Map from '../../components/Map'
import InfoCard from '../../components/InfoCard'
import './index.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Map 
          initialZoom={15}
          initialCenter={{
            lat: 40.017350, 
            lng: -105.278171
          }}
        />
        <InfoCard />
      </div>
    );
  }
}

export default App;
