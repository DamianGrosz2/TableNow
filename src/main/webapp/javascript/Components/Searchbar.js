import '../../css/main.css';
import React, { Component, useState } from 'react';
import { proposalSyntaxPlugins } from '@babel/preset-env/data/shipped-proposals';

export let globalSearchdata = "";

function Searchbar(props) {

    const [searchData, setSearchData] = React.useState( {
        search: globalSearchdata
    });

    function handleChange(e) {
        globalSearchdata = e.target.value;

        setSearchData(() => {
            return {
                search: e.target.value
            }
        })

        console.log(e.target.value);
        if(props.callback !== undefined) props.callback(e.target.value);

    }

    async function handleKeyPress(e) {

       // globalSearchdata = searchData.search;


      //  console.log("keypress: " + e.target.value);
        if (e.key === 'Enter') {
            console.log("pressed enter: " + e.target.value);
            if(props.stayOnPage !== true) {
                props.setTabPage(1,0);
            }
        }
    }

    return (
        <div className="search">
            <img
                src="images/searchbar.png"
                alt="Not Found"
                className="searchbar"
            />
            <input
                type="text"
                placeholder='Search'
                className={props.home?'searchHome2' : 'searchText'}
                value={searchData.search}
                onChange={handleChange}
                onKeyUp={handleKeyPress.bind(this)}
                
            />
        </div>
    );
}

export default Searchbar;