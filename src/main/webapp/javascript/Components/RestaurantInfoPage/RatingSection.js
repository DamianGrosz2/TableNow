
import React from "react";
import "./RatingSection.css";
import Review from "./Review";
function RatingSection(props) {
    const restaurant = props.restaurant;


    const reviews = restaurant.comments.map( (review,index) => {
        return <Review review={review} key={index} />;
    });
    const stars = restaurant.stars + "";
    const reviewCount = restaurant.comments.length;
    return (

             <div className="Rating-Content">
            <div className="Background-Rating" >
                <div className="TopRating-Section">
                    <p className="TitleTotal-Rating">Total Rating</p>
                    <div className="Dot" />
                    <div className="Rating-Folder">
                        <p className="Rating-txt">{stars.length > 1? stars : stars+".0"}</p>
                        <img
                            src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/m98xdtataqb-150%3A679?alt=media&token=f59bf827-7f33-4e9d-90b7-ee5d117e42f5"
                            alt="Not Found"
                            className="Rating-Star"
                        />

                    </div>
                    <p className="ReviewCount">{"(" + 269 + ")"}</p>

                </div>

                <div className="Review-Section">
                    {reviews}
                </div>

            </div>
        </div>

    );
}

export default RatingSection;