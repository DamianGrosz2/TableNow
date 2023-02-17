import '../../css/main.css';
import React from "react";

const Reminder = (props) => {
    // Component for the reminder that is shown on the homepage when a reservation is less than 24 hours away from the current time
    return (
        <div className='infoModal'>
            <div className='darkBG' onClick={() => props.setIsOpen(false)}/>
            <div className='centered'>
                <div className='modal2'>
                    <div className='modalHeader2'>
                        <h5 className='heading'>Reminder for reservation tomorrow</h5>
                    </div>
                    <div className='modalActions'>
                        <div className='actionsContainer'>
                            <button
                                className='confirmBtn'
                                onClick={() => {
                                    props.setTabPage(3, 1);
                                    props.setIsOpen(false)
                                }}>Okay
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reminder;