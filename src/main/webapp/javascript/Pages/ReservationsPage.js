import '../../css/main.css';
import React, {useState} from 'react';
import Modal from "../Components/Modal";
import Searchbar from "../Components/Searchbar";
import Header from "../Components/Header";

const star = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAACn0lEQVRIie2WTUgUYRjH/887s+sHxUZIJy/SrmNCZHrsEOqlDyIhVuogiOgGtil49rBBJw9BzrqQu35cBEOk6GgXo0MQdRQ3Pwixm11McHObeZ8OO0vmzszujHoI+sPAzPP+n/9v5n3nC/jXlIiuBBPRlaDfftVv4/eQsgQIBtDup5/8NMX7sw0AbQIgEiKsT0Y2vWYIP2AmdMM6aTbNe34yfIGJ0f3nQHS7WJ0zvDY8jq1fZCk3DteEYjaOv2he95Lj+YpZ8v2SmqlEveZ4BhO4ZGqtNfeY40HDfVnNFJS1G5Og5lSmcfVEwb29X6travZqRD44QkSjdh5mfiqD+We53Nnc7GzDz4rAQ33ZdinoJYAggFClZ+1RuwDyRCKqpyPvBAAYpG4D2D9FKKzsfRC+AdbNlZoKb+SFegVEC6eGZXoTYKO1+JYrWeN4/1oMYB2FaT8JGUw8OpHWxgDiYtH25hrqX22TEPMAwseEbrEUDyamIx+ODtg+x+OZS58pJ9rAmPeNJLw2AwdX7aCF4TKKD3wZBOM5Kv+EGiAMJ9Nays1U9s2lcGCxEt/hTJXMV2VN5QySjS6vYEOqd44NZvBdD9BiV9ke1zUeHFw5I/LqDoBqj+QDyokL+lzkh5PB9Yrpl3LLAWoAeGJths14law1b7hlu4OZumzKWwR0JDNaIpnREsS4BmCjtBeu0+0IjsU+BQDc/DuNFlQj2KJntPfFkj6lfayV3Apg8gj6ttvvr+OzWWWE2lnIc9bhLhE/0tPanJ13bLppD8DD+MDaEpgnAZwHENoJBa4DeGvX4zzVxB3WzrI0lct6uskWeljJdOOiNJUWgJYBQDA6nbyOYFKNKYB76uojnamZ8HY5aFGpmfB2XX2kE+CeQsZ/FfQbCQbQI4fz+W8AAAAASUVORK5CYII="
const statusRes = ["confirmed", "pending", "cancelled"];

function ReservationsPage(props) {
    // This Component creates the Reservations Page
    // It is a stateful Component
    // It has a state of:
    // - isOpen: a boolean that indicates if the modal is open
    // - reservations: an array of reservations
    // - nameState: a string that indicates the name of the restaurant
    // - seatsState: a string that indicates the number of seats
    // - ratingState: a string that indicates the rating of the restaurant
    // - timeState: a string that indicates the time of the reservation
    // - dateState: a string that indicates the date of the reservation
    // - statusState: a string that indicates the status of the reservation

    const [isOpen, setIsOpen] = useState(false);
    const [reservations, setReservations] = useState([]);
    const [nameState, setNameState] = useState("");
    const [seatsState, setSeatsState] = useState("");
    const [ratingState, setRatingState] = useState("");
    const [timeState, setTimeState] = useState("");
    const [dateState, setDateState] = useState("");
    const [statusState, setStatusState] = useState("");
    const [tableId, setTableId] = useState("");
    const [idState, setIdState] = useState("");
    let [status, setStatus] = useState("none");

    // this function is called when the component is mounted
    // It fetches the reservations from the server
    // It sets the state of the reservations
    React.useEffect(() => {
        let url = "/reservations";
        fetch(url).catch(err => {
            console.log(err);
        }).then(res => {
            if (res === undefined) return;
            return res.json();
        }).then(data => {
            return data.map(obj => JSON.parse(obj));
        }).then(data => {
            setReservations(data);
        }).then(() => {
                if (status === "none") {
                    setStatus("reservations loaded");
                    status = "reservations loaded";
                } else if (status === "restaurants loaded") {
                    setStatus("both loaded");
                    status = "both loaded";
                }
            }
        );
    }, [isOpen]);


    const [restaurants, setRestaurants] = useState([]);
    React.useEffect(() => {
        let url = "/search";
        fetch(url).catch(err => {
            console.log(err);
        }).then(res => {
            if (res === undefined) return;
            return res.json();
        }).then(data => {
            // map each object in string array to object
            return data.map(obj => JSON.parse(obj));
        }).then(data => {
            setRestaurants(data);
        }).then(() => {
                if (status === "none") {
                    setStatus("restaurants loaded");
                    status = "restaurants loaded";
                } else if (status === "reservations loaded") {
                    setStatus("both loaded");
                    status = "both loaded";
                }
            }
        );
    }, []);

    // this function finds the restaurant with the specified id in the restaurants array
    function findRestaurant(id) {
        for (let i = 0; i < restaurants.length; i++) {
            if (restaurants[i].id === id) {
                return restaurants[i];
            }
        }
        console.log(status);
        console.log("Restaurant not found");
    }

    let iD;
    let tableID;

    return (
        <div>
            <Searchbar name="Chinesisch" setTabPage={props.setTabPage}/>

            <div className='listView'>
                <Header displayInfos={false} componentName="Reservations overview"/>
            </div>
            {/*Modal for editing a reservation*/}
            <div className='Box'>
                {isOpen && <Modal
                    header="Reservation Details"
                    setIsOpen={setIsOpen}
                    name={nameState}
                    seats={seatsState}
                    rating={ratingState}
                    time={timeState}
                    date={dateState}
                    status={statusState}
                    setTabPage={props.setTabPage}
                    id={idState}
                    tableId={tableId}
                    res={true}
                />}
                {/*Table with reservations:*/}
                <table className='ReservationTable'>
                    <thead>
                    <tr>
                        <th className='ReservationName'>Name</th>
                        <th className='ReservationSeats'>Seats</th>
                        <th className='ReservationRating'>Rating</th>
                        <th className='ReservationTime'>Time</th>
                        <th className='ReservationDate'>Date</th>
                        <th className='ReservationStatus'>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        status === "both loaded" && reservations.map((item, i) => (
                            iD = item.restaurantId,
                                tableID = item.tableId,
                                <tr
                                    key={i}
                                    onClick={() => {
                                        if (!item.cancelled && !item.confirmed) {
                                            setIsOpen(true)
                                            const restaurant = findRestaurant(item.restaurantId);
                                            let seats = 0;
                                            switch (restaurant.NoSeats) {
                                                case 1:
                                                    seats = 4;
                                                    break;
                                                case 2:
                                                    seats = item.tableId % 2 === 0 ? 4 : 2;
                                                    break;
                                                case 3:
                                                    seats = item.tableId % 2 === 0 ? 8 : 4;
                                                    break;
                                            }
                                            setTableId(item.tableId);
                                            setNameState(restaurant.name);
                                            setIdState(restaurant.id);
                                            setSeatsState(seats)
                                            setRatingState(restaurant.stars)
                                            setTimeState(item.reservationTime)
                                            setDateState(item.reservationDate)
                                            setStatusState(item.cancelled ? statusRes[2] : item.confirmed ? statusRes[0] : statusRes[1])
                                        }
                                    }
                                    }
                                >
                                    <td>{findRestaurant(item.restaurantId).name}</td>
                                    {findRestaurant(item.restaurantId).NoSeats === 1 && <td>4</td>}
                                    {findRestaurant(item.restaurantId).NoSeats === 2 &&
                                    <td>{item.tableId % 2 === 0 ? "4" : "2"}</td>}
                                    {findRestaurant(item.restaurantId).NoSeats === 3 &&
                                    <td>{item.tableId % 2 === 0 ? "8" : "4"}</td>}
                                    <td>
                                        <div className='ratingColumn'>{
                                            findRestaurant(item.restaurantId).stars
                                        }
                                            <div>
                                                <img className='IconImg2' src={star}/>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{item.reservationTime}</td>
                                    <td>{item.reservationDate}</td>
                                    <td>{item.cancelled ? <div className='canc'>cancelled</div> : item.confirmed ?
                                        <div className='conf'>confirmed</div> : <div>pending</div>}</td>
                                </tr>
                        ))}
                    {
                        status !== "both loaded" && <div>Loading... {status}</div>
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ReservationsPage;