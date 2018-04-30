import * as React from 'react'
import { MessageStore } from '../../stores/messageStore';
import { CardExpandedStore } from '../../stores/cardExpandedStore';
import { observer, inject } from 'mobx-react';

import InfoCard from '../../components/InfoCard'

import './index.css'
import logo from '../../assets/logo.png'
import Region from '../../models/Region'
import { autorun, observable } from 'mobx';
import { sortMapBySentiment } from '../../utils/sorting';

interface SidebarProps {
    messageStore?: MessageStore
    cardExpandedStore?: CardExpandedStore
    google?: {map: google.maps.Map, maps: any}
}

@inject('messageStore', 'cardExpandedStore')
@observer
class Sidebar extends React.Component<SidebarProps> {
    @observable private _$cards: React.ReactNode[]
    componentWillMount() {
        autorun(() => {
            if (this.props.messageStore) {
                this._$cards = []
                sortMapBySentiment(this.props.messageStore.$latestMessages).forEach(
                    (region, id) => {
                        this._$cards.push(
                            <InfoCard
                                key={id}
                                data={region}
                                onClick={() => this._zoomToRegion(region.region)}
                                expanded={this.props.cardExpandedStore && this.props.cardExpandedStore.getExpanded(id)}
                            />
                        )
                    }
                )
            }
        },      {delay: 1000})
    }

render() {
        return(
            <div className="sidebar">
                <img src={logo} alt="FORECAST" className="branding"/>
                <div className="region-cards">
                    {this._$cards}
                </div>
            </div>
        )
    }

    private _zoomToRegion(region: Region) {
        if (this.props.cardExpandedStore) {
            this.props.cardExpandedStore.toggleExpanded(region.ID)
            if (this.props.google && this.props.cardExpandedStore.getExpanded(region.ID)) {
                this.props.google.map.setZoom(8)
                this.props.google.map.panTo({lat: region.centerLat, lng: region.centerLon})
            }
        }
    }
}

export default Sidebar