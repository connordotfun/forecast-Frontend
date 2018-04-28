import * as React from 'react'
import GoogleMapReact, { Coords } from 'google-map-react'
import { inject } from 'mobx-react';
import { MessageStore } from '../../stores/messageStore';
import { CardExpandedStore } from '../../stores/cardExpandedStore';
import Message from '../../models/Message';
import sentimentHex from '../../utils/colors';
import { autorun, observable } from 'mobx';

const CleanerMidnight = require('./CleanerMidnight.json')

interface MapProps {
    zoom: number
    center: Coords,
    apiHandler?: (google: {map: google.maps.Map, maps: any}) => void // tslint:disable-line
    messageStore?: MessageStore
    cardExpandedStore?: CardExpandedStore
}

@inject('messageStore', 'cardExpandedStore')
class GoogleMap extends React.Component<MapProps> {
    @observable private _$google: {map: google.maps.Map, maps: any}
    private _allPolygons: Map<string, google.maps.Polygon> = new Map()
    render() {
        return (
            <div className="map-container" style={{ height: '100%', width: '100%', gridArea: 'map'}}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyDSEL7djaF05NHigvL5_f7KYu_U26PEqRo' }}
                    options={{styles: CleanerMidnight}}
                    zoom={this.props.zoom}
                    center={this.props.center}
                    yesIWantToUseGoogleMapApiInternals={true}
                    onGoogleApiLoaded={this._onApiLoad.bind(this)} // tslint:disable-line jsx-no-bind
                />
            </div>
        )
    }

    componentWillMount() {
        autorun(
            () => {
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
                            fillColor: sentimentHex(message.sentiment),
                            fillOpacity: 0.5,
                            draggable: false,
                            editable: false,
                            geodesic: false
                            })
                        
                        let currentPolygon = this._allPolygons.get(message.region.ID)
                
                        if (currentPolygon) {
                            currentPolygon.unbindAll()
                            currentPolygon.setMap(null)
                        }
                
                        this._allPolygons.set(message.region.ID, polygon)
                
                        polygon.addListener('click', (event: google.maps.PolyMouseEvent) => {
                            if (this.props.cardExpandedStore) {
                                this.props.cardExpandedStore.setExpanded(message.region.ID, true)
                                if (message.region.card) {
                                    message.region.card.scrollIntoView({inline: 'center'})
                                }
                                this._$google.map.setZoom(8)
                                this._$google.map.panTo({
                                    lat: message.region.centerLat,
                                    lng: message.region.centerLon
                                })
                            }
                        })
                })
              }
        },  {delay: 300})
    }

    private _onApiLoad(google: { map: any, maps: any }) {
        if (this.props.apiHandler) {
            this.props.apiHandler(google)
        }

        this._$google = google
    }
}

export default GoogleMap