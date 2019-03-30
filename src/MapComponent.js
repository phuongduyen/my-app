import './index.css'

import React, { Component } from 'react';
import Direction from './Component/Direction';
import SymbolPath from './Component/SymbolPath';
import './App.css';

import { 
  Map, 
  GoogleApiWrapper, 
  Polyline,
  MarkerWithLabel, 
  Marker } from 'google-maps-react';

const style = {
  width: '100%',
  height: '100%'
};
const l='';

class MapComponent extends React.Component {
  state = {
    coords: null,
    error: null,
    items: [],
    isLoaded: false,
  }

  componentDidMount() {
    this.geoId = navigator.geolocation.watchPosition(
      (position) => {

        this.setState({
          coords: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        })
      console.log("l  " + this.state.coords)
      },
      (error) => {
        this.setState({ error })
      }

    )
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.geoId)
  }

  render() {
    return (


      <div>
        {this.state.error ? (
          <div>Error: {this.state.error.message}</div>
        ) : this.state.coords ? (
          <div>
            lat: {this.state.coords.lat}
            lng: {this.state.coords.lng}

          </div>
        ) : (
          <div>Loading ...</div>
        )}
      </div>
    )
  }
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyDc2L7RMA_qzBVxIMKD1z6-FfMdOs32Vmc'
})(MapComponent);

