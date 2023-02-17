import React from "react";
import "./Description.css";
function Description(props) {

    return (
        <div className="Description">
            <p className="DescriptionText">
                {props.description}
            </p>
        </div>
    );

}
export default Description;