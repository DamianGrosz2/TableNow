import React, { Component, useState } from 'react';
import  Searchbar, { globalSearchdata } from "../Components/Searchbar";
import "./SearchResultPage.css";
import "./SelectTime.css";
import PickDate from "../Components/SelectTime/PickDate";
import PickTime from "../Components/SelectTime/PickTime";
import {dataStorage} from "../Data/DataStorage";

// With this component you can select the day and time of your booking and then press reserve
// After that you will be redirected to the table selection page

function SelectTime(props) {
    const [date, setDate] = React.useState(() => {
        const currentTime = new Date();
        if (new Date().getMinutes() < 31){
            currentTime.setMinutes(30);
        }
        else if(new Date().getMinutes() < 61){
            currentTime.setMinutes(0);
            currentTime.setHours(currentTime.getHours() + 1);
        }
        currentTime.setDate(currentTime.getDate() + 1);
        return currentTime;
    });

    const handleDateChange = (dt) => {
        dt.setTime(dt.getTime());
        setDate(dt)
        dataStorage.setReservations(dt)
        //console.log(dataStorage.getReservations())
        // console.log(" changedTime " + changedTime + " changedDate " + changedDate)
    }

    const handleTimeChange = (time) => {
        time.setDate(date.getDate())
        setDate(time);
        dataStorage.setReservations(time) // value before
        // console.log(dataStorage.getReservations())
        // console.log(" changedTime " + changedTime + " changedDate " + changedDate)
    }

    const reservation = props.reservation;
    function onClick(){
        dataStorage.setReservations(date);
        console.log("clicked");
        props.setTabPage(1,3);
    }

    return (
        <>
            <Searchbar name="Chinesisch"  setTabPage={props.setTabPage} />
            <div className='box'>
                <div className="Mid">
                <div className="TopLeft">
                    <h1 className="Title">{props.restaurant.name}</h1>
                    <p className="Type">{props.restaurant.type}</p>
                </div>
                <div className='DateTimePicker'>
                    <div className='First'>
                        <PickDate reservation={dataStorage.getReservations()} setTabPage={props.setTabPage} date={date} setDate={
                        (x) => {
                            handleDateChange(x);

                        }}/>
                    </div>
                    <PickTime reservation={dataStorage.getReservations()} setTabPage={props.setTabPage} time={date} setTime={
                        (x) => {
                            handleTimeChange(x);
                        }}/>
                </div>
                    <div className="button" onClick={onClick}>
                        Reserve
                    </div>
                </div>
            </div>
        </>

    );
}

export default SelectTime;