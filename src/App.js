import React, { Component } from 'react';
import Direction from './Component/Direction';



import { 
  Map, 
  GoogleApiWrapper, 
  Polyline, 
  Marker } from 'google-maps-react';

const style = {
  width: '100%',
  height: '100%'
};


export class MapContainer extends Component {

    render() {
        const google=window.google;

        const icon = {
            url: "car3.png", // url
            scaledSize: new google.maps.Size(30, 50)
        };
      
        

        return (
            <Map 
                google={this.props.google}
                style={style}
                initialCenter={{
                  lat: 21.0317529,lng: 105.8400363
                }}
                zoom={15}
                onClick = {this.onMapClicked}
              >
                <Marker
                    name = {'Your position'}
                    position = {{lat: 21.0335833,lng: 105.8390984}}
                    icon = {icon} 
                  />
                <Marker
                    name = {'Your position'}
                    position = {{lat: 21.0430283,lng: 105.835951}}
                  />
                <Marker
                    name = {'Your position'}
                    position = {{lat: 21.0481377,lng: 105.8379459}}
                  />
                <Marker
                    name = {'Your position'}
                    position = {{lat: 21.033662,lng:  105.836638}}
                  />
                <Marker
                    name = {'Your position'}
                    position = {{lat:21.030366,lng: 105.836084}}
                  />
                <Marker
                    name = {'Your position'}
                    position = {{lat:21.023708,lng: 105.849166}}
                  />

                <Polyline
                 
                    path={Direction}
                    geodesic={true}
                    options={{
                        strokeColor: "#ff2527",
                        strokeOpacity: 0.95,
                        strokeWeight: 4.5,
                        icons: [
                            {                      
                                offset: "5.5",
                                repeat: "20px"
                            }
                        ]
                    }}
                  />
            </Map>
        );
      }


}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDc2L7RMA_qzBVxIMKD1z6-FfMdOs32Vmc'
})(MapContainer);







