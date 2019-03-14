import React, { Component } from 'react';
import Direction from './Component/Direction';
import SymbolPaths from './Component/SymbolPaths';
import SymbolPath from './Component/SymbolPath';


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

const stopBus = [
        ['1', 21.026463, 105.855659],
        ['2', 21.032294, 105.839528],
        ['3', 21.0335833, 105.8390984],
        ['4', 21.0430283, 105.835951],
        ['5', 21.0481377, 105.8379459],
        ['6', 21.033662, 105.836638],
        ['7', 21.030366, 105.836084],
        ['8', 21.024697, 105.845832],
        ['9', 21.028894, 105.849503],
        ['10', 21.023120, 105.851203],
        ['11', 21.024153, 105.857194]
      ];


export class MapContainer extends Component {

  constructor(props) {
    super(props);
   
  }

    render() {
        const google=window.google;

        const icon = {
            url: "car3.png",
            scaledSize: new google.maps.Size(30, 50)
        };
        const busStop={
          url:"bb1.png",
          scaledSize: new google.maps.Size(30, 30)
        }

        const symbol = {
          path: google.maps.SymbolPath.FORWARD_OPEN_ARROW,

        }

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
                    position = {{lat: 21.0384339,lng: 105.8397971}}
                    icon = {icon} 
                  />

                {stopBus.map(stop=>(   
                                 
                  <Marker
                    name = {'Your position'}
                    position = {{lat: stop[1],lng: stop[2]}}
                    label= {stop[0]}
                    icon = {busStop} 
                  />

                  
                ))}

                
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

                {SymbolPath.map(paths=>(                  
                  <Polyline
                    path={paths}
                    options={{
                        strokeColor: "#ff227",
                        strokeOpacity: 0.95,
                        strokeWeight: 3,
                        icons: [
                            {       
                                icon: symbol,            
                                offset: "5.5",
                            }
                        ]
                    }}
                  />                  
                ))}

            </Map>


        );
      }


}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDc2L7RMA_qzBVxIMKD1z6-FfMdOs32Vmc'
})(MapContainer);







