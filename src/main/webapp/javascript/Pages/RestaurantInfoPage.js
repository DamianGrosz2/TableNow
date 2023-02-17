import Searchbar from "../Components/Searchbar";
import React from "react";
import RestaurantInfoSection from "../Components/RestaurantInfoPage/RestaurantInfoSection";
import RatingSection from "../Components/RestaurantInfoPage/RatingSection";
import "./RestaurantInfoPage.css";
import Description from "../Components/RestaurantInfoPage/Description";
function RestaurantInfoPage(props) {
    const restaurant = props.restaurant;

    return (
        <>
            <Searchbar setTabPage={props.setTabPage} name="Chinesisch"/>

            <div className="Mid">
                <div className="TopLeft">
                    <h1 className="Title">{restaurant.name}</h1>
                    <p className="Type">{restaurant.type}</p>
                </div>


                <div className="ImageSection">

                    {restaurant.pictures.length > 0  && <img src={restaurant.pictures[0]} className="Image" alt={"image 1"}/>}
                    {restaurant.pictures.length > 1 && <img src={restaurant.pictures[1]} className="Image" alt={"image 2"}/>}
                    {restaurant.pictures.length > 2 && <img src={restaurant.pictures[2]} className="Image" alt={"image 3"}/>}
                </div>
                <div className="BottomSection">
                    <div className="BottomLeft">
                        <Description description={restaurant.description}/>
                        <RatingSection setTabPage={props.setTabPage} restaurant={restaurant}/>
                    </div>
                    <RestaurantInfoSection setTabPage={props.setTabPage} restaurant={restaurant}/>

                </div>
            </div>


        </>

    );
}

export default RestaurantInfoPage;