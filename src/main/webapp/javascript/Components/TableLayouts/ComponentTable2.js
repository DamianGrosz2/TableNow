import '../../../css/main.css';
import React, {useState} from 'react';
import Modal from "../Modal";

function ComponentTable2(props) {
    // This Component creates a table with 2 seats
    // When clicked it opens a modal with the reservation information and the buttons to book the reservation or not

    const [isOpen, setIsOpen] = useState(false);
    const restaurant = props.restaurant;
    return (
        <div className="gridItem">
            {isOpen && <Modal setIsOpen={setIsOpen}
                              header="Confirm reservation"
                              name={restaurant.name}
                              seats="2"
                              time={props.time}
                              date={props.date}
                              setTabPage={props.setTabPage}
                              id={restaurant.id}
                              tableId={props.tableId}
                              res={false}
            />}
            <div className='tableWrapper'
                 onClick={() => setIsOpen(!!props.bookable)}>
                <div className='tableWhole'>
                    <div className={props.bookable ? 'chair chair1 chair-blue' : 'chair chair1'}/>
                    <div className={props.bookable ? 'tableTwo table-blue' : 'tableTwo'}>
                        <p className='numberSeats'>2</p>
                    </div>
                    <div className={props.bookable ? 'chair chair2 chair-blue' : 'chair chair2'}/>
                </div>
            </div>
        </div>
    );
}

export default ComponentTable2;