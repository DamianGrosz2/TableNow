
import React from "react";
import "./RestaurantInfoSection.css";
import {dataStorage} from "../../Data/DataStorage";

function RestaurantInfoSection(props) {
    const restaurant = props.restaurant;
    let name = restaurant.name +"";

    function onClick(){
        dataStorage.setRestaurantObject(restaurant);
        console.log("clicked");
        props.setTabPage(1,2);
    }
    function visitWebsite(){
        props.setTabPage(1,2);
        window.open(restaurant.URL,'_blank').focus();

    }
    return (
        <div className="reserve">
            <div className="InfoWidgetMid">
                <div className="InfoWidgetContent">
                    <div className="group-1079 flex-row">
                        <img
                            src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/h7mefoipya7-191%3A91?alt=media&token=ca63e9ee-6421-4982-87bf-87231550d618"
                            alt="Not Found"
                            className="rectangle-75"
                        />
                        <p className="NameText">{name}</p>
                    </div>
                    <div className="group-464 flex-row-vcenter">
                        <div className="group-026 flex-row-vend">
                            <div className="group-613 flex-col">
                                <div className="type flex-row">
                                    <img
                                        src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/h7mefoipya7-191%3A71?alt=media&token=58dd9b29-8935-430d-8ceb-47481c528ce4"
                                        alt="Not Found"
                                        className="dining-room"
                                    />
                                    <p className="txt-426">{restaurant.type}</p>
                                </div>
                                <div className="type flex-row">
                                    <img
                                        src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/h7mefoipya7-150%3A641?alt=media&token=27f79c6c-08e1-4805-b0da-70fcb55cacec"
                                        alt="Not Found"
                                        className="dining-room"
                                    />
                                    <p className="txt-426">{restaurant.address}</p>
                                </div>
                                <div className="type flex-row">
                                    <img
                                        src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/h7mefoipya7-191%3A80?alt=media&token=21646d6b-3eb1-4422-8449-79898a766846"
                                        alt="Not Found"
                                        className="dining-room"
                                    />
                                    <p className="txt-426">081718188860</p>
                                </div>
                                <div className="group-1079 flex-row">
                                    <img
                                        src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/h7mefoipya7-191%3A86?alt=media&token=5da28236-1a25-497c-a286-ec882c25344b"
                                        alt="Not Found"
                                        className="dining-room"
                                    />
                                    <p className="txt-426">Cheap</p>
                                </div>
                            </div>
                            <div className="opening-times flex-col">
                                <div className="group-542 flex-row">
                                    <img
                                        src="https://firebasestorage.googleapis.com/v0/b/unify-bc2ad.appspot.com/o/h7mefoipya7-191%3A88?alt=media&token=19b4573e-4619-426f-b999-1d3c05987e22"
                                        alt="Not Found"
                                        className="open-sign"
                                    />
                                    <p className="txt-7710">Opening times </p>
                                </div>
                                <div className="monday-comp flex-row">
                                    <p className="txt-967">MO</p>
                                    <div className="group-495 flex-row-vcenter">
                                        <p className="txt-2110">10:00</p>
                                        <div className="minus" />
                                        <p className="txt-952">20:00</p>
                                    </div>
                                </div>
                                <div className="monday-comp flex-row">
                                    <p className="txt-967">DI</p>
                                    <div className="group-495 flex-row-vcenter">
                                        <p className="txt-2110">10:00</p>
                                        <div className="minus" />
                                        <p className="txt-952">20:00</p>
                                    </div>
                                </div>
                                <div className="monday-comp flex-row">
                                    <p className="txt-883">MI</p>
                                    <div className="group-495 flex-row-vcenter">
                                        <p className="txt-2110">10:00</p>
                                        <div className="minus" />
                                        <p className="txt-952">20:00</p>
                                    </div>
                                </div>
                                <div className="monday-comp flex-row">
                                    <p className="txt-967">DO</p>
                                    <div className="group-495 flex-row-vcenter">
                                        <p className="txt-2110">10:00</p>
                                        <div className="minus" />
                                        <p className="txt-952">20:00</p>
                                    </div>
                                </div>
                                <div className="friday-comp flex-row">
                                    <p className="txt-967">FR</p>
                                    <div className="group-495 flex-row-vcenter">
                                        <p className="txt-2110">10:00</p>
                                        <div className="minus" />
                                        <p className="txt-952">20:00</p>
                                    </div>
                                </div>
                                <div className="saturday-comp flex-row">
                                    <p className="txt-967">SA</p>
                                    <div className="group-495 flex-row-vcenter">
                                        <p className="txt-2110">10:00</p>
                                        <div className="minus" />
                                        <p className="txt-952">20:00</p>
                                    </div>
                                </div>
                                <div className="sunday-comp flex-row">
                                    <p className="txt-967">SO</p>
                                    <div className="group-495 flex-row-vcenter">
                                        <p className="txt-2110">10:00</p>
                                        <div className="minus" />
                                        <p className="txt-952">20:00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="group-1079 flex-row">
                    <div className="buttons">
                        <div rel="noopener noreferrer" onClick={visitWebsite}>
                            Visit Website

                        </div>
                    </div>
                    <div className="buttons reservebutton" onClick={onClick}>
                        Reserve
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RestaurantInfoSection;