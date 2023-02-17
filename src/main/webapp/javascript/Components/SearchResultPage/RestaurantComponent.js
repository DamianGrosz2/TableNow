import React from "react"
import "./RestaurantComponent.css"
import { dataStorage } from "../../Data/DataStorage"
export default function RestaurantComponent(props) {
    //  const [name,type,stars,pictures,place,price] = restaurant.value;
    const restaurant = props.restaurant;

    const PriceObject = [...Array(restaurant.price)].map((e, i) => {
            return (
                <img
                    src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/702ob5etyde-193%3A101?alt=media&token=b65bbc26-d45c-4ff7-bf43-092108f2f619"
                    alt="Not Found"
                    className="price-tag"
                    key={i}
                />
            );
        });

    function onClick(){
        dataStorage.setRestaurantObject(restaurant);
        props.setTabPage(1,1);
    }

    let stars = restaurant.stars +"";
    let name = restaurant.name +"";
    return (
        <div className="div-Main" onClick={onClick}>
            <div className="flex-col">
                <img
                    src={restaurant.pictures[0]}
                    alt="Not Found"
                    className="image"
                />
                <div className="group-firstrow flex-row">
                    <p className="txt-Title">{name.length < 26 ?name : name.substring(0,26) + "..." }</p>
                    <div className="stars flex-row-vcenter-hend">
                        <p className="txt-Rating">{stars.length > 1? stars : stars+".0"}</p>
                        <img
                            src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/561111agrf8-193%3A107?alt=media&token=4802f81b-c933-4419-95b4-4d09b8d7e586"
                            alt="Not Found"
                            className="star-filled"
                        />
                    </div>
                </div>
                <p className="txt-0110">{restaurant.type}</p>
                <div className="location-1 flex-row-vcenter-hstart">
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/561111agrf8-193%3A100?alt=media&token=60fe2942-e96d-4f11-b6bc-87ad4703c8a2"
                        alt="Not Found"
                        className="location"
                    />
                    <p className="txt-location">{restaurant.address}</p>
                </div>
                <div className="price">
                    {PriceObject}
                </div>
            </div>
        </div>
    )
}