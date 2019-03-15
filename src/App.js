import React, { Component } from 'react';
import Direction from './Component/Direction';
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

      this.state = {
        error: null,
        isLoaded: false,
        items: []
      };

      this.boundsMarker = this.boundsMarker.bind(this);
     
    }

    componentDidMount() {
      fetch("http://192.168.100.33:8080/coordinates")
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              items: result
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }
    


    boundsMarker(stopBus, bounds) {
      const google=window.google;
        {stopBus.map(stop=>(                  
            bounds.extend(new google.maps.LatLng(stop[1], stop[2]))
          ))
        }
    };

    render() {
        const google=window.google;

        const iconCar = {
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

        const { error, isLoaded, items } = this.state;

        const bounds  = new google.maps.LatLngBounds();




        return (
            <Map 
                google={this.props.google}
                style={style}
                initialCenter={{
                  lat: 21.0317529,lng: 105.8400363
                }}
                zoom={16}
                onClick = {this.onMapClicked}
              >
                

                {items.map(item => (
                  <Marker
                    key={item.id_driver}
                    name = {'Your position'}
                    position = {{lat: item.latitude,lng: item.longitude}}
                    icon = {iconCar} 
                  />
              
                  ))}

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







