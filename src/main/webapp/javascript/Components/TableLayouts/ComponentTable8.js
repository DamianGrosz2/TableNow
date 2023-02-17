import '../../../css/main.css';
import React, {useState} from 'react';
import Modal from "../Modal.js";

function ComponentTable8(props) {
    // This Component creates a table with 8 seats
    // When clicked it opens a modal with the reservation information and the buttons to book the reservation or not

    const [isOpen, setIsOpen] = useState(false);
    const restaurant = props.restaurant;
    return (
        <div className="gridItem">
            {isOpen && <Modal setIsOpen={setIsOpen}
                              header="Confirm reservation"
                              name={restaurant.name}
                              seats="8"
                              time={props.time}
                              date={props.date}
                              tableId={props.tableId}
                              id={restaurant.id}
                              setTabPage={props.setTabPage}
                              res={false}
            />}
            <div className='tableWrapper'
                 onClick={() => setIsOpen(!!props.bookable)}>
                <div className='tableWhole'>
                    <div className={props.bookable ? 'chair chair1 chair-blue c1-2' : 'chair chair1 c1-2'}/>
                    <div className={props.bookable ? 'chair chair1 chair-blue c1-2-2' : 'chair chair1 c1-2-2'}/>
                    <div className={props.bookable ? 'chair chair1 chair-blue c1-2-3' : 'chair chair1 c1-2-3'}/>

                    <div className={props.bookable ? 'tableEight table-blue' : 'tableEight'}>
                        <p className='numberSeats'>8</p>
                    </div>

                    <div className={props.bookable ? 'chair chair2 chair-blue c2-2' : 'chair chair2 c2-2'}/>
                    <div className={props.bookable ? 'chair chair2 chair-blue c2-2-2' : 'chair chair2 c2-2-2'}/>
                    <div className={props.bookable ? 'chair chair2 chair-blue c2-2-3' : 'chair chair2 c2-2-3'}/>

                    <div className={props.bookable ? 'chair chair3 chair-blue c3-1' : 'chair chair3 c3-1'}/>

                    <div className={props.bookable ? 'chair chair4 chair-blue c4' : 'chair chair4 c4'}/>

                </div>
            </div>
        </div>
    );
}

export default ComponentTable8;