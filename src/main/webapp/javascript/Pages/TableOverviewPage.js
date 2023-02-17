import '../../css/main.css';
import React, {useState} from 'react';
import Searchbar from "../Components/Searchbar";
import Header from "../Components/Header";
import ComponentTable4 from "../Components/TableLayouts/ComponentTable4";
import ComponentTable2 from "../Components/TableLayouts/ComponentTable2";
import ComponentTable8 from "../Components/TableLayouts/ComponentTable8";
import {dataStorage} from "../Data/DataStorage";

function TableOverviewPage(props) {
    // This component is used to display the table overview page

    // variables that store the relevant data
    const restaurant = props.restaurant;
    const noSeats = restaurant.NoSeats;
    const date2 = dataStorage.getReservations();
    const datum = anfangsNullen(date2.getDate()) + "." + anfangsNullen(date2.getMonth() + 1) + "." + date2.getFullYear();
    const zeit = anfangsNullen(date2.getHours()) + ":" + anfangsNullen(date2.getMinutes());
    const dateOther = date2.getFullYear() + "-" + anfangsNullen(date2.getMonth() + 1) + "-" + anfangsNullen(date2.getDate());

    // function to add 0 to the front of a number if it is smaller than 10
    function anfangsNullen(i) {
        if (i < 10) {
            return "0" + i;
        }
        return i
    }

    // get the number of seats that are free
    const [tables, setTables] = useState([]);
    React.useEffect(() => {
        let url = "/seats?restaurant=" + restaurant.id + "&time=" + zeit + "&date=" + dateOther;
        console.log(url);
        fetch(url).catch(err => {
            console.log(err);
        }).then(res => {
            if (res === undefined) return;
            return res.json();
        }).then(data => {
            return data.map(obj => JSON.parse(obj));
        }).then(data => {
            setTables(data);
        });
    }, []);
    const numberOfTablesBooked = tables.length;

    return (
        <>
            <Searchbar name="Chinesisch" callback={(input) => {
                console.log("search for " + input);
                setSearch(input);
            }} setTabPage={props.setTabPage}/>

            <div className="headerTable">
                <Header displayInfos={true} name={restaurant.name} date={datum} time={zeit}
                        componentName="Reserve table"/>
            </div>
            <div className='Box'>
                <div className='tableView'>
                    {createWindows1()}
                    {(noSeats === 1 || noSeats === 2) &&
                    <div className='gridWrapper'>
                        {noSeats === 1 && createGridWrapper(numberOfTablesBooked)}
                        {noSeats === 2 && createGridWrapperTableTwo(numberOfTablesBooked)}
                    </div>
                    }
                    {noSeats === 3 &&
                    <div className='gridWrapper2'>
                        {createGridWrapperTable8(numberOfTablesBooked)}
                    </div>
                    }
                </div>
            </div>
        </>
    );


    // function that returns 21 Tables, with Tables for 4 persons
    function createGridWrapper(numberOfTablesBooked) {
        let numberOfTables = 21;
        // numberOfTablesBooked Tables are randomly selcted and marked as booked
        let tablesBooked = new Array(numberOfTables).fill(true);
        for (let i = 0; i < numberOfTablesBooked; i++) {
            tablesBooked[tables[i]] = false;
        }

        let gridWrapper = [];
        for (let i = 0; i < numberOfTables; i++) {
            gridWrapper.push(<ComponentTable4 key={i} className='gridItem' bookable={tablesBooked[i]}
                                              tableId={i} date={dateOther} time={zeit} setTabPage={props.setTabPage}
                                              restaurant={restaurant}/>);
        }
        return gridWrapper;
    }

    // function that returns 21 Tables, with Tables for 4 persons and tables for 2 persons
    function createGridWrapperTableTwo(numberOfTablesBooked) {
        let numberOfTables = 21;
        // numberOfTablesBooked Tables are randomly selcted and marked as booked
        let tablesBooked = new Array(numberOfTables).fill(true);
        for (let i = 0; i < numberOfTablesBooked; i++) {
            tablesBooked[tables[i]] = false;
        }

        let gridWrapper = [];
        for (let i = 0; i < numberOfTables; i++) {
            gridWrapper.push(<ComponentTable4 key={i} className='gridItem' bookable={tablesBooked[i]}
                                              tableId={i} date={dateOther} time={zeit} setTabPage={props.setTabPage}
                                              restaurant={restaurant}/>);

            if (i < numberOfTables && i < 20) {
                i++;
                gridWrapper.push(<ComponentTable2 key={i} className='gridItem' bookable={tablesBooked[i]}
                                                  tableId={i} date={dateOther} time={zeit} setTabPage={props.setTabPage}
                                                  restaurant={restaurant}
                />);
            }
        }
        return gridWrapper;
    }

    // function that returns 12 Tables, with Tables for 8 persons and tables for 4 persons
    function createGridWrapperTable8(numberOfTablesBooked) {
        let numberOfTables = 12;
        // numberOfTablesBooked Tables are randomly selcted and marked as booked
        let tablesBooked = new Array(numberOfTables).fill(true);
        for (let i = 0; i < numberOfTablesBooked; i++) {
            tablesBooked[tables[i]] = false;
        }
        let gridWrapper = [];
        for (let i = 0; i < numberOfTables; i++) {
            gridWrapper.push(<ComponentTable4 key={i} tableId={i} date={dateOther} time={zeit} className='gridItem'
                                              setTabPage={props.setTabPage} restaurant={restaurant}
                                              bookable={tablesBooked[i]}/>);
            if (i < numberOfTables) {
                i++;
                gridWrapper.push(<ComponentTable8 key={i} className='gridItem' bookable={tablesBooked[i]}
                                                  tableId={i} date={dateOther} time={zeit} setTabPage={props.setTabPage}
                                                  restaurant={restaurant}/>);
            }
        }
        return gridWrapper;
    }

    // function that creats the windows for the layout of the tables
    function createWindows1() {
        let windows = [];
        windows.push(<div key={1} className='window w1'>
            <div className='windowMid'/>
        </div>);
        windows.push(<div key={2} className='window w2'>
            <div className='windowMid'/>
        </div>);
        windows.push(<div key={3} className='window w3'>
            <div className='windowMid'/>
        </div>);
        windows.push(<div key={4} className='window w4'>
            <div className='windowMid'/>
        </div>);
        windows.push(<div key={5} className='window w5'>
            <div className='windowMid'/>
        </div>);
        windows.push(<div key={6} className='window w6'>
            <div className='windowMid'/>
        </div>);
        return windows;
    }
}

export default TableOverviewPage;
