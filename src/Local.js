import React, { Component } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import MapComponent from './MapComponent';
import './App.css';

import { 
  Map, 
  GoogleApiWrapper, 
  Polyline,
  MarkerWithLabel,  
   } from 'google-maps-react';

        const google=window.google;
        
class Local extends React.Component {
  constructor() {
    super()

    this.state = {
      latitude: '',
      longitude: '',
    }

    this.getMyLocation = this.getMyLocation.bind(this)
  }
  
  componentDidMount() {
    this.getMyLocation()
  }

  getMyLocation() {
    const location = window.navigator && window.navigator.geolocation
    
    if (location) {
      location.getCurrentPosition((position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
        console.log( position.coords)
      }, (error) => {
        this.setState({ latitude: 'err-latitude', longitude: 'err-longitude' })
      })
    }

  }

  render() {
    const { latitude, longitude } = this.state

    console.log("d    " + this.state.latitude)
    const lat = {latitude}
    console.log("d1   " + this.state.latitude)
    

    return (

      <Map 
        google={this.props.google}
        initialCenter={{
            lat: 21.0485248,
            lng: 105.7292288
          }}
        onClick = {this.onMapClicked}
      >
        <Marker
          name = {'Your position'}
          position = {{lat: {latitude}, lng:{longitude}}}
        />

      </Map>

    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDc2L7RMA_qzBVxIMKD1z6-FfMdOs32Vmc'
})(Local);