import InfoView from "../Components/InfoView";
import React, { Component, useState } from 'react';
import  Searchbar, { globalSearchdata } from "../Components/Searchbar";
import RestaurantSpawnArea from "../Components/SearchResultPage/RestaurantSpawnArea";
import "./SearchResultPage.css";
import Filters from "../Components/SearchResultPage/Filters";

function SearchResultPage(props) {

    const [search, setSearch] = useState(globalSearchdata);
    const [restaurants, setRestaurants] = useState([]);
    const [filterURL, setFiltersURL] = useState("");

    React.useEffect( () => {
        let url = "/search?q=" + search + filterURL;
        console.log(url);
        fetch(url).catch(err => {
            console.log(err);
            return;
        }).then(res => {
            if(res === undefined) return;
           return res.json();
        }).then(data => {
            // map each object in string array to object
            return data.map(obj => JSON.parse(obj));
        }).then(data => {
            console.log(data);
            setRestaurants(data);
        });

    }, [search,filterURL ]);
    return (
        <div className="SearchResultPageCotainer">
            <Searchbar name="Chinesisch" callback={(input) => { console.log("search for " + input); setSearch(input); }} setTabPage={props.setTabPage} />
            <div className="SearchResultPage">
                <div className='Mid'>

                    <p className="txt-TopSearchResults">TOP SEARCH RESULTS</p>
                    <RestaurantSpawnArea restaurants={restaurants} setTabPage={props.setTabPage}/>
                </div>
                <div className="Right">
                    <Filters onChangeURL={(url) => {setFiltersURL(url)}} />
                </div>
            </div>
        </div>
    );
}



export default SearchResultPage;

