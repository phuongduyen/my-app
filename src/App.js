import React, { Component } from 'react';
import Direction from './Component/Direction';
import SymbolPath from './Component/SymbolPath';
import callApi from './utils/apiCaller';
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
        items: [],
        coords: null,
      };
      this.getMyLocation = this.getMyLocation.bind(this)
      this.loadData = this.loadData.bind(this);

      this.getIcon = this.getIcon.bind(this);
    }

    componentDidMount(){

      this.getMyLocation();

      this.loadData()
      setInterval(this.loadData, 5000);
    }

    async loadData() {
      callApi('api/coordinates', 'GET', null).then(res =>{
        this.setState({
            items : res.data
        });
        console.log(res.data)
      });

    }

    getMyLocation() {
      const location = window.navigator && window.navigator.geolocation
      
      if (location) {
        location.getCurrentPosition((position) => {
          this.setState({
            coords: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          })

        }, (error) => {
          this.setState({ coords: 'err-latitude longitude' })
        })
      }
    }

    getIcon(orientation){
      const google=window.google;
      var iconCar = null;
      if (orientation>=345 && orientation<359 || orientation>=0 && orientation<15){
        iconCar = {
          url: "car0.png",
          scaledSize: new google.maps.Size(20, 40)
        };
      }else if (orientation>=15 && orientation<45) {
        iconCar = {
          url: "car30.png",
          scaledSize: new google.maps.Size(40, 40)
        };
       }else if (orientation>=45 && orientation<75) {
        iconCar = {
          url: "car60.png",
          scaledSize: new google.maps.Size(40, 40)
        };
      }else if (orientation>=75 && orientation<105) {
        iconCar = {
          url: "car90.png",
          scaledSize: new google.maps.Size(40, 40)
        };
      }else if (orientation>=105 && orientation<135) {
        iconCar = {
          url: "car120.png",
          scaledSize: new google.maps.Size(40, 40)
        };
      }else if (orientation>=135 && orientation<165) {
        iconCar = {
          url: "car150.png",
          scaledSize: new google.maps.Size(40, 40)
        };
      }else if (orientation>=165 && orientation<195) {
        iconCar = {
          url: "car180.png",
          scaledSize: new google.maps.Size(40, 40)
        };
      }else if (orientation>=195 && orientation<225) {
        iconCar = {
          url: "car210.png",
          scaledSize: new google.maps.Size(40, 40)
        };
      }else if (orientation>=225 && orientation<255) {
        iconCar = {
          url: "car240.png",
          scaledSize: new google.maps.Size(40, 40)
        };
      }else if (orientation>=255 && orientation<285) {
        iconCar = {
          url: "car270.png",
          scaledSize: new google.maps.Size(40, 40)
        };
      }else if (orientation>=285 && orientation<315) {
        iconCar = {
          url: "car300.png",
          scaledSize: new google.maps.Size(40, 40)
        };
      }else {
        iconCar = {
          url: "car330.png",
          scaledSize: new google.maps.Size(40, 40)
        };
      }
      return iconCar;
    }



    render() {
        const google=window.google;
        const iconCar = {
            url: "car0.png",
            scaledSize: new google.maps.Size(30, 50)
        };

        const busStop={
          url:"bb1.png",
          scaledSize: new google.maps.Size(30, 30)
        }
        const symbol = {
          path: google.maps.SymbolPath.FORWARD_OPEN_ARROW,
        }
        const { error, isLoaded, items, coords } = this.state;

        const bounds  = new google.maps.LatLngBounds();
        {stopBus.map(stop=>(                  
            bounds.extend({lat: stop[1],lng: stop[2]})
          ))}



        return (
            <Map 
                google={this.props.google}
                style={style}
                onClick = {this.onMapClicked}
                bounds = {bounds}
                fitBounds = {bounds} // auto-zoom
                panToBounds = {bounds} //auto-center
              >


                <Marker
                    name = {'Your position'}
                    position = {coords}
                  />

                {items.map(item => (
                  <Marker
                    key={item.id_driver}
                    name = {'Your position'}
                    position = {{lat: item.lat,lng: item.lng}}
                    icon = {this.getIcon(item.orientation)} 
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







