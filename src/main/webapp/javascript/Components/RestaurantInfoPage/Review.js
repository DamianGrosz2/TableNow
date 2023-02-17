
import React from "react";
import "./Review.css";

function Review(props) {
    const review = props.review;


    const stars = review.rating + "";
    return (

        <div className="comment">
            <div className="flex-col-hend">
                <div className="group-643 flex-row-vend">
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/79jl7fwj2bq-348%3A4?alt=media&token=fe0cbd56-7111-4228-b6b0-91b2ecd5f789"
                        alt="Not Found"
                        className="profile-1"
                    />
                    <div className="group-1019 flex-col">
                        <p className="txt-268 flex-hend"> {review.author}</p>
                        <div className="group-349 flex-row">
                            <p className="txt-549 flex-hend">{stars.length > 1? stars : stars+".0"}</p>
                            <img
                                src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/79jl7fwj2bq-150%3A662?alt=media&token=d35a94c3-c11c-4fc5-ab03-2de4104c4341"
                                alt="Not Found"
                                className="star-filled"
                            />
                            <p className="txt-350">{review.title}</p>
                        </div>
                    </div>
                </div>
                <p className="txt-1085">
                    {review.description}
                </p>
            </div>
        </div>

    );
}

export default Review;