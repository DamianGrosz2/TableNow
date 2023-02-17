import '../../css/main.css';
import React from "react";

const Modal = (props) => {

    // res is true when the modal is called from the ReservationPage when its called from the TablePage its false,
    // it determines the actions of the buttons. When ReservationPage, they confirm or decline the reservation,
    // otherwise thy either close the modal or add the reservation to the database.
    const res = props.res;
    const [render, setRender] = React.useState(false);
    return (
        <>
            {/*This is the modal*/}
            <div className='darkBG' onClick={() => props.setIsOpen(false)}/>
            <div className='centered'>
                <div className='modal'>
                    <div className='modalHeader'>
                        <h5 className='heading'>{props.header}</h5>
                    </div>
                    <div className='modalContent'>
                        <div className='desc'>
                            <img src={calendarIcon} alt='table' className='IconImg'/>
                            <p className='descText'><b>{props.time}</b> - {props.date}</p>
                        </div>
                        <div className='desc'>
                            <img src={foodIcon} alt='table' className='IconImg'/>
                            <p className='descText'>{props.name}</p>
                        </div>
                        <div className='desc'>
                            <img src={tableIcon} alt='table' className='IconImg'/>
                            <p className='descText'>Table for max. <b>{props.seats}</b> people</p>
                        </div>
                    </div>
                    {/*These are the buttons*/}
                    <div className='modalActions'>
                        <div className='actionsContainer'>
                            {!res && <button className='confirmBtn' onClick={() => {
                                fetch("/reservations", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        "person": 0,
                                        "reservationTime": props.time,
                                        "tableId": props.tableId,
                                        "reservationDate": props.date,
                                        "restaurantId": props.id,
                                    }),
                                }).catch((err) => {
                                    console.log(err);
                                }).then((resp) => {
                                    console.log(resp);
                                });
                                props.setIsOpen(false);

                                setTimeout(() => {
                                    props.setTabPage(3, 1);
                                }, 500);

                            }}>Confirm</button>}

                            {res && <button className='confirmBtn' onClick={() => {
                                fetch("/reservations", {
                                    method: "PUT",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        "person": 0,
                                        "reservationTime": props.time,
                                        "tableId": props.tableId,
                                        "reservationDate": props.date,
                                        "restaurantId": props.id,
                                        "cancelled": false,
                                        "confirmed": true
                                    }),
                                }).catch((err) => {
                                    console.log(err);
                                }).then((resp) => {
                                    console.log(resp);
                                }).then(() => {
                                    props.setTabPage(3, 1);
                                    props.setIsOpen(false)
                                    setRender(!render);
                                });
                            }}>Confirm</button>}

                            {!res && <button
                                className='cancelBtn'
                                onClick={() => {
                                    props.setIsOpen(false)
                                }}>Cancel</button>}

                            {res && <button className='cancelBtn' onClick={() => {
                                fetch("/reservations", {
                                    method: "PUT",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        "person": 0,
                                        "reservationTime": props.time,
                                        "tableId": props.tableId,
                                        "reservationDate": props.date,
                                        "restaurantId": props.id,
                                        "cancelled": true,
                                        "confirmed": false
                                    }),
                                }).catch((err) => {
                                    console.log(err);
                                }).then((resp) => {
                                    console.log(resp);
                                }).then(() => {
                                    props.setTabPage(3, 1);
                                    props.setIsOpen(false)
                                    setRender(!render);
                                });
                            }}>Cancel Reservation</button>}

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
        ;
};

const calendarIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAlElEQVRIie2UMQ7CMAxFnxHHCHPvwjmiLPQ4XSp6D86SmZ4Ds4DkNBN1qw7kb/768feX5cBR6GPWPmb16k7bjlVDbHGL+SowAmFlvxkhDffu8SWKBM7mAAFltMS5EgDD1Akr8NnFxXK772CZwE6yCY5J4NxBgd0TNINm0AzqS56B4PyLnrYoEwhpKfi1+Us1Od7/I97E2SgzXOJbBwAAAABJRU5ErkJggg=="
const foodIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABrklEQVRIie2Tv0scYRCGn9kfZ6FBgghBuMbi7iQpJE0wlX1KLYLFiaDGO7VM5V+gpW6ImNXCJq2tRSxiYykWJ6doICnSBhID0dudFLs5j939codcI8kLC9/OO98838AM3HeJyViaO1tG9TWAKGsb20UvlTNbV+BSVWbebBc+ZtWxsovXq6iuA3kgr8LG0ly9anjLsIi+n5+/6O8IsFg+HUBZjf7kVfQByupi+XTAABlyw5uZjgDiWmWgD2Tf8wtbnl/YAtkH+mIvUxYy1RFAhcmIxLtbanwWJgz1GwpPK5WTh+07gCJAw7YOm7dvz6Ws6qIcAbZc5561BQABgNvQXDPpFz2tXlJqcQxgizxOek46mwOElyrh5vLs+UIUCjZj90MmQLUmCKHypC0gUFmxRcdRXijhlxbrK+hKFsASu6YaIjCS8pKBtzuFS8cJx4DdlvCu44TPPb/0KbuD4DMAwqOkZ9xkaG4qnl/MzPvjX1sPenPh9yvQn55f6v1rB3eRG3wbjN/7I+l1BSBi78XH1BB0BQCMYhiCbgGMQ5DegzvI84vTJq9bHRj1H/AP6DfyK4Z2HopX/AAAAABJRU5ErkJggg=="
const tableIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABFklEQVRIie2TPU7DQBCFv9mkCeIKNEixcwDuQ2MqLKGcxBQWRZRIHAubgiK5gfkTSXYo/G9MsSYV8mt2dzT73s6+GRgx4q+QchMGiZ6SOF77AmBOSdoHaR7Cm6c7VO5RHuKNf+tCFAbJI3ANGsTrxaaMtyuw4gGo6POAl6YACn4zPu1kefkiURgkkYtAaaCoaQl0PFDPhbRXSLQlUHmwXG5n++z9FbBfJjtbra72LsS/3a8q+Mze5oBB5cWVHCCKLj5Ad8B0dji/LOOVwEQLc4ymruQ1JAU4Tmqjaw/E5AarOHdQRQEJAJbFTwF0DsNatCGRt6oxPRUUHSRF0hAc1aYAotonkA+ZtYfBFRjJv0g6wzbin+Mbrf9eGfq0CqcAAAAASUVORK5CYII="

export default Modal;