import '../css/main.css';
import React, {useState} from "react";
import ReservationsPage from './Pages/ReservationsPage.js';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import HomePage from "./Pages/HomePage";
import MapPage from "./Pages/MapPage";
import TableOverviewPage from "./Pages/TableOverviewPage";
import SearchResultPage from "./Pages/SearchResultPage";
import RestaurantInfoPage from "./Pages/RestaurantInfoPage";
import { dataStorage } from "./Data/DataStorage"
import SelectTime from "./Pages/SelectTime";
import Modal from "./Components/Modal";
import Reminder from "./Components/Reminder";


function App() {

    // manages the active tabs (Homepage, MapPage, SearchListPage, SearchResultPage)
    const [shownTab, setShownTab] = React.useState(0);
    // A tab can contain multiple pages, this manages the active page of a tab
    const [shownPage, setShownPage] = React.useState(0);

    // this function is called when a tab or page gets changed
    const setTabPage = (tabId,pageId) => {
        if(shownTab !== tabId) {
            console.log("shown tab changed to " + tabId);
            setShownTab(tabId);
        }
        if(shownPage !== pageId){
            console.log("shown page changed to " + pageId);
            setShownPage(pageId);
        } 
    }

    const ListPage = () => {
            switch(shownPage) {
                case 0: return <SearchResultPage setTabPage={setTabPage}/>
                case 1: return <RestaurantInfoPage setTabPage={setTabPage} restaurant={dataStorage.getRestaurantObject()}/>
                case 2: return <SelectTime setTabPage={setTabPage} reservation={dataStorage.getReservations()} restaurant={dataStorage.getRestaurantObject()}/>
                case 3: return <TableOverviewPage setTabPage={setTabPage} reservation={dataStorage.getReservations()} restaurant={dataStorage.getRestaurantObject()}/>
            }
            return (
                <SearchResultPage setTabPage={setTabPage}/>
            )
    }

    const [isOpen, setIsOpen] = useState(false);
    let [reservationsList, setReservations] = useState([]);
    const [state, setState] = useState(false);


    React.useEffect( () => {
        let url = "/reservations";
        fetch(url).catch(err => {
            console.log(err);
        }).then(res => {
            if(res === undefined) return;
            return res.json();
        }).then(data => {
            return data.map(obj => JSON.parse(obj));
        }).then(data => {
            setReservations(data);
            reservationsList = data;
        }).then(() => {
            if(reservationsList.length > 0) {
                let i = 0;
                let reservation = reservationsList[i];
                let date = new Date();
                let reservationDate = new Date(Date.parse(reservation.reservationDate));
                reservationDate.setHours(reservation.reservationTime.substring(0,2), reservation.reservationTime.substring(3,5));
                let hours = Math.abs(date.getTime() - reservationDate.getTime()) / 36e5;

                while(!(reservation.cancelled) && !(reservation.confirmed) && (hours < 12 || hours > 24) && i < reservationsList.length) {
                    reservation = reservationsList[i++];
                    reservationDate = new Date(Date.parse(reservation.reservationDate));
                    reservationDate.setHours(reservation.reservationTime.substring(0,2), reservation.reservationTime.substring(3,5));
                    hours = Math.abs(date.getTime() - reservationDate.getTime()) / 36e5;
                }

                if(!reservation.cancelled && !reservation.confirmed && hours > 12 && hours < 24) {
                    console.log(hours);
                    if(hours <= 24 && hours > 12) {
                        setIsOpen(true);
                        console.log("open");
                    }
                }
            }
        }).then(() => {
            setState(!state);
            console.log("state changed");
        });
    }, []);

    return (
        <div className="App">

            <Tabs selectedIndex={shownTab} onSelect={(i) => {
                setShownTab(i);
                setShownPage(0);
            }}>
                {isOpen && <Reminder
                    setTabPage={setTabPage}
                    setIsOpen={setIsOpen}
                />}

                <TabList>
                    {/*Navbar*/}
                    <Tab>
                        <img src={iconHome} alt="" className='IconImg2'/>
                        <p className='navbarP'>Home</p>
                    </Tab>
                    <Tab>
                        <img src={iconList} alt="" className='IconImg2'/>
                        <p className='navbarP'>List</p>
                    </Tab>
                    <Tab>
                        <img src={iconMap} alt="" className='IconImg2'/>
                        <p className='navbarP'>Map</p>
                    </Tab>
                    
                    <Tab>
                        <img src={iconReservations} alt="" className='IconImg2'/>
                        <p className='navbarP'>Reservations</p>
                    </Tab>
                </TabList>

                {/* HOMEPAGE */}
                <TabPanel>
                    <HomePage setTabPage={setTabPage}/>
                    {/* todo make element not scrollable down and left/right*/}
                </TabPanel>

                {/* SEARCHLISTPAGE*/}
                <TabPanel>
                    {ListPage()}
                </TabPanel>

                {/* MAPPAGE */}
                <TabPanel>
                    <MapPage setTabPage={setTabPage}/>
                    {/*<MapPage />*/}
                </TabPanel>

                {/* RESERVATIONSPAGE */}
                <TabPanel>
                    <ReservationsPage setTabPage={setTabPage}/>
                </TabPanel>
            </Tabs>
        </div>
    );
}




const iconHome = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABu0lEQVRIie2SwUuTcRjHP89vry9ChIeQwLwk6VrRrYNdDUHbyYOXpCDbu8tekCTw6P6FrQ1sTgXLLh46FOglQfCoQQdxW6DnFR0qwTbzfbpomOzd3ikdwr7HH9/n+3m+/B44V0o4xfGEUxxvZkaC2VTcWGkSmARQNN3eGX6STIp3ZkByeNP+3NYyK+gIUD18thVZaP+6P5pcvFmtN18X8PTBhws/7NZFhEFg11MdtpSKZ+Q10AasyJ4ZerbQ/a1pQOLh1iWxzVugFyirMfeyue73AG586xaeWQKugGyEsKKpfFc5MMCNFa6CLAM9wLYJHQykn9/4WMezo+INZKcjpYaAw+2WgQ5g/acVik5NXfvk31LegNwBygYvms5HNo57zImt+lCzBnQIvJM9c9cvHCA7H/nSWqn0oywBlz3MqusUB2s2cB+X7iM6B9gAVfPdzuVu7/uFH1c8vt5iexePrqmKyqPMTM+r3w1cpzCG6IujcICg4TW8NqIvE05hAsACyExfTwEpADdW1KDBtZTJh//4VyvIkB/0ZFgtmUaGs6opQCYfliBbnxpwGv37AN8rCnKuQTx/vcF/NdQvEiCWMr9l3oMAAAAASUVORK5CYII="
const iconMap = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAACaUlEQVRIid2VPWhTURiGn+8kxUnBn8GCf0NtSgs6ikOLCLZFcKlV6CJWQwdNQGorgksmB6F/NMlQblJxUIq1jgaKiBVRNx3UJnaqlTq0OCgW9d77OdxEb9L0h6aLvnCH873ved9zvnvuuUIFuNQ5s9cYe0BFmgFEeBxw9PpQui5b0EhF5gHnNbCjmJEvrmMOJ0drPgKYtYxiMTWgyxZijD1QMBfICGQ8RreboNtX0AVXXOH5t7slEOxcmMuFI2ENimbHXTXjifTBFwAq0iwAyqPhVOgkQCScy4C2eE+ZgFhMzcKn6ROo6QJOAVX5baNCt4jbfe3C9LZb6bqvBn4obBVZ3mZRfpYNWJjLPQHTlB/+AiaAtvykfhVt/y4cAp4rTAFtCq2RcC6DuIJqs7cppv60siS8Kd/TG0Hj7I9bodMFYjgVuhq3QgfcLc4bAFUZ8rwAtAX1ThKgea5sgGdmhW4OjtTPL2dEk8mGbwCJVO0U6L1ShSJ3PW6VgPUiaNweYNFXWqwydq9fs+GAaDjbODhSP69IB+AAjiIdpTvfcIDC2JWud9UJq3YSpRelN2HVTl4+936nX7fid7AOVNtuYAxoiqdCAwDR6IctuuQ+JH9YoMJ3ADQWjZbcO6W1SgOKoHC2tLapAeXw7weseZsWxtGL2T7E3B+2al6B6GpaP4puwkg4W5g4QdFt6ofOisq4Ct3ltfo0btUdK6hXalGbp9UH4poWwRwVpR90FmSfz/yvFiYQt3XXntBxv1Fpi54B1QKjjm2nk7cbPvu4l6A90fDMEdQ9o6LtILYqljr2aIl2M6Di/U7/d/wGmjHoyW1mgOMAAAAASUVORK5CYII="
const iconReservations = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABFklEQVRIie2TPU7DQBCFv9mkCeIKNEixcwDuQ2MqLKGcxBQWRZRIHAubgiK5gfkTSXYo/G9MsSYV8mt2dzT73s6+GRgx4q+QchMGiZ6SOF77AmBOSdoHaR7Cm6c7VO5RHuKNf+tCFAbJI3ANGsTrxaaMtyuw4gGo6POAl6YACn4zPu1kefkiURgkkYtAaaCoaQl0PFDPhbRXSLQlUHmwXG5n++z9FbBfJjtbra72LsS/3a8q+Mze5oBB5cWVHCCKLj5Ad8B0dji/LOOVwEQLc4ymruQ1JAU4Tmqjaw/E5AarOHdQRQEJAJbFTwF0DsNatCGRt6oxPRUUHSRF0hAc1aYAotonkA+ZtYfBFRjJv0g6wzbin+Mbrf9eGfq0CqcAAAAASUVORK5CYII="
const iconList = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAcElEQVRIie3SMQ5AQBBG4TfiLnsnSnTrDu5ARyfuZNVKdxiFWrIRIWS+A8w/xQPzNgFoGk22NWQA3eAmEL1rIAU4jssIUFdB254JwJfh8lA3OAFI7vgygkpdzbkvlgxUHhr9CKsollV0ziqKZRX92Q7JUE6amrMGogAAAABJRU5ErkJggg=="

export default App;
