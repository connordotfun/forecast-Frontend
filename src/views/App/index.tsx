import * as React from 'react';
import Map from '../../components/Map'
import InfoCard from '../../components/InfoCard'
import './index.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Map />
        <InfoCard />
      </div>
    );
  }
}

export default App;
