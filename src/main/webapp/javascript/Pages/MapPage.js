import React, {useState} from 'react'
import {GoogleMap, useJsApiLoader, Marker, InfoWindow} from '@react-google-maps/api';
import RestaurantComponent from "../Components/SearchResultPage/RestaurantComponent";
import Searchbar, {globalSearchdata} from "../Components/Searchbar";

// On this page a map is displayed showing the restaurants.
// You can search for terms in the search bar and only the matching restaurants will be displayed.
// You can also click on the markers of the restaurants and an info window will be displayed.
// You can click on this and you will be redirected to the page of the restaurant
// with more detailed information and the option to make a reservation.
const containerStyle = {
    width: '80vw',
    height: '40vw'
};

const center = {
    lat: 48.137154,
    lng: 11.576124
};

const test = {
    lat: 48.1371,
    lng: 11.576124
};

function Map(props) {
    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyAaQ8NEr2W_ENyGDyNI_bVR3U1mxcw30MQ"
    })
    const [search, setSearch] = useState(globalSearchdata);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [restaurants, setRestaurants] = useState([]);
    React.useEffect(() => {
        let url = "/search?q=" + search;
        fetch(url).catch(err => {
            console.log(err);
            return;
        }).then(res => {
            if (res === undefined) return;
            return res.json();
        }).then(data => {
            // map each object in string array to object
            return data.map(obj => JSON.parse(obj));
        }).then(data => {
            console.log(data);
            setRestaurants(data);
        });

    }, [search]);

    const markers = restaurants.map((restaurant, index) => {
        return (
            <Marker position={
                {
                    lat: restaurant.latitude,
                    lng: restaurant.longitude
                }
            } key={index}
                    onClick={() => {
                        setSelectedRestaurant(restaurant);
                    }
                    }
            />
        );
    });

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(test);
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    return isLoaded ? (
        <>
            <Searchbar name="Chinesisch" callback={(input) => {
                console.log("search for " + input);
                setSearch(input);
            }} setTabPage={props.setTabPage} stayOnPage={true}/>
            <div className="Mid">
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={13}
                    onUnmount={onUnmount}
                >
                    {markers}
                    {
                        selectedRestaurant && (
                            <InfoWindow position={
                                {
                                    lat: selectedRestaurant.latitude,
                                    lng: selectedRestaurant.longitude
                                }}
                                        onCloseClick={() => {
                                            setSelectedRestaurant(null);
                                        }}
                                        options={{
                                            pixelOffset: new window.google.maps.Size(0, -30)
                                        }}
                            >
                                <RestaurantComponent restaurant={selectedRestaurant} setTabPage={props.setTabPage}/>
                            </InfoWindow>
                        )
                    }
                    <></>
                </GoogleMap>
            </div>
        </>
    ) : <></>
}

export default Map;