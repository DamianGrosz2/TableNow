import '../../css/main.css';
import React from 'react';
import Searchbar from "../Components/Searchbar";

function HomePage(props) {
    // This page is the home page of the application.
    // It contains a searchbar and an image.

    return (
        <>
            {/* purple background*/}
            <svg className='blob' viewBox="0 0 1486 664" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M194.549 0H1486V438.389C1486 438.389 632.284 789.301 194.549 615.845C-243.186 442.388 194.549 0 194.549 0Z"
                    fill="#6C64D9"/>
            </svg>
            {/*Background image and TableNow text*/}

            {/*<svg className='t' width="169" height="181" viewBox="0 0 169 181" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
                <rect x="37" y="16" width="20" height="153" fill="white"/>
                <path d="M0 0L169 0L138.5 16H11L0 0Z" fill="white"/>
                <rect x="29" y="169" width="36" height="12" rx="3" fill="white"/>
            </svg>
            <p className='able'>able</p>
            <p className='now'>Now</p>*/
            }
            <img src="images/Logo.png" alt="" className="Logo" />
            <div className='searchHome'>
                <Searchbar home={true} setTabPage={props.setTabPage} name="Chinesisch"/>
            </div>
            <img src="images/imageHome.svg" alt="" className='imageHome'/>
        </>
    );
}

export default HomePage;