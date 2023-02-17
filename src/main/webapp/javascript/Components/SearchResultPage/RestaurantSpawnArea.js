import React from "react";
import {ReactDOM} from "react";
import RestaurantComponent from "./RestaurantComponent";
import "./RestaurantSpawnArea.css";

function RestaurantSpawnArea(props) {

    const restaurants = props.restaurants.map((el, i) => {
        return <RestaurantComponent restaurant={el} setTabPage={props.setTabPage} key={i}/>;
    });

    return (
        <div className="SpawnBox">
            {restaurants}
        </div>
    );
}

export default RestaurantSpawnArea;