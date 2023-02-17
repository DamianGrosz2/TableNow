import React, {useState} from "react";
import "./Filters.css";

function Filters(props) {

    const [filters, setFilters] = useState({
        type: "",
        price: "-1",
        rating: "0",
        distance: -1,
        sortOrder: "ASCENDING",
        sortField: "RATING"
    });

    function OnChangeFilters(newFilters) {
        const url = getFilterURL(newFilters);
        props.onChangeURL(url);
    }
    // handle change for type
    function handleTypeChange(event) {
        const newFilters = {
            ...filters,
            type: event.target.value
        };
        OnChangeFilters(newFilters);
        setFilters(newFilters);
        //console.log(filters.type + " event.target.value "+ event.target.value + newFilters.type);
    }
    // handle change for price
    function handlePriceChange(event) {
        const newFilters = {
            ...filters,
            price: event.target.value
        };
        OnChangeFilters(newFilters);
        setFilters(newFilters);
        //console.log(filters.price + " event.target.value "+ event.target.value + newFilters.price);
    }
    // handle change for rating
    function handleRatingChange(event) {
        const newFilters = {
            ...filters,
            rating: event.target.value
        };
        OnChangeFilters(newFilters);
        setFilters(newFilters);
        //console.log(filters.rating + " event.target.value "+ event.target.value + newFilters.rating);
    }
    // handle change for distance
    function handleDistanceChange(event) {
        const newFilters = {
            ...filters,
            distance: event.target.value
        };
        OnChangeFilters(newFilters);
        setFilters(newFilters);
        //console.log(filters.distance + " event.target.value "+ event.target.value + newFilters.distance);
    }

    // handle change for sort order
    function handleSortOrderChange(event) {
        const newFilters = {
            ...filters,
            sortOrder: event.target.value
        };
        OnChangeFilters(newFilters);
        setFilters(newFilters);
        //console.log(filters.sortOrder + " event.target.value "+ event.target.value + newFilters.sortOrder);
    }
    // handle change for sort field
    function handleSortFieldChange(event) {
        const newFilters = {
            ...filters,
            sortField: event.target.value
        };
        OnChangeFilters(newFilters);
        setFilters(newFilters);
        //console.log(filters.sortField + " event.target.value "+ event.target.value + newFilters.sortField);
    }
    return (
        <>
            <div className="Filters">
                <div className="Filter">
                    <p className="Filter-Title">Type</p>
                    <div className="Filter-Options">
                        <div className="Filter-Option"><input type="radio" name="type" value="" checked={filters.type === ""} onChange={handleTypeChange}/> <p className="OptionName">-</p></div>

                        <div className="Filter-Option"><input type="radio" name="type" value="GERMAN" onChange={handleTypeChange}/> <p className="OptionName">German</p></div>
                        <div className="Filter-Option"><input type="radio" name="type" value="ITALIAN" onChange={handleTypeChange}/> <p className="OptionName">Italien</p></div>
                        <div className="Filter-Option"><input type="radio" name="type" value="BAR" onChange={handleTypeChange} /> <p className="OptionName">Bar</p></div>
                        <div className="Filter-Option"><input type="radio" name="type" value="CHINESE" onChange={handleTypeChange} /> <p className="OptionName">Chinese</p></div>
                        <div className="Filter-Option"><input type="radio" name="type" value="VIETNAMESE" onChange={handleTypeChange} /> <p className="OptionName">Vietnamese</p></div>
                        <div className="Filter-Option"><input type="radio" name="type" value="INDIAN" onChange={handleTypeChange} /> <p className="OptionName">Indian</p></div>
                        <div className="Filter-Option"><input type="radio" name="type" value="JAPANESE" onChange={handleTypeChange} /> <p className="OptionName">Japanese</p></div>
                        <div className="Filter-Option"><input type="radio" name="type" value="MEDITERRANEAN" onChange={handleTypeChange} /> <p className="OptionName">Mediterranean</p></div>
                    </div>
                </div>
                <div className="Filter">
                    <p className="Filter-Title">Price</p>
                    <div className="Filter-Options">
                        <div className="Filter-Option"><input type="radio" name="price" value="-1" checked={filters.price === "-1"} onChange={handlePriceChange} /><p className="OptionName">-</p></div>
                        <div className="Filter-Option"><input type="radio" name="price" value="1" onChange={handlePriceChange} /><p className="OptionName">€</p></div>
                        <div className="Filter-Option"><input type="radio" name="price" value="2" onChange={handlePriceChange} /><p className="OptionName">€€</p></div>
                        <div className="Filter-Option"><input type="radio" name="price" value="3" onChange={handlePriceChange} /><p className="OptionName">€€€</p></div>
                        <div className="Filter-Option"><input type="radio" name="price" value="4" onChange={handlePriceChange} /><p className="OptionName">€€€€</p></div>
                    </div>
                </div>
                <div className="Filter">
                    <p className="Filter-Title">Rating</p>
                    <div className="Filter-Options">
                        <div className="Filter-Option"><input type="radio" name="rating" value="0" checked={filters.rating === "0"} onChange={handleRatingChange} /><p className="OptionName">>=0</p></div>
                        <div className="Filter-Option"><input type="radio" name="rating" value="1" onChange={handleRatingChange} /><p className="OptionName">>=1</p></div>
                        <div className="Filter-Option"><input type="radio" name="rating" value="2" onChange={handleRatingChange} /><p className="OptionName">>=2</p></div>
                        <div className="Filter-Option"><input type="radio" name="rating" value="3" onChange={handleRatingChange} /><p className="OptionName">>=3</p></div>
                        <div className="Filter-Option"><input type="radio" name="rating" value="4" onChange={handleRatingChange} /><p className="OptionName">>=4</p></div>
                        <div className="Filter-Option"><input type="radio" name="rating" value="5" onChange={handleRatingChange} /><p className="OptionName">==5</p></div>
                    </div>
                </div>
                <div className="Filter">
                    <p className="Filter-Title">Distance</p>
                    <div className="Filter-Options">
                        <input type="range" name="distance" min="0" max="35" onChange={handleDistanceChange} />
                    </div>
                </div>
                <div className="Filter">
                    <p className="Filter-Title">Sort Order</p>
                    <div className="Filter-Options">
                        <div className="Filter-Option"><input type="radio" name="sortOrder" value="ASCENDING" checked={filters.sortOrder === "ASCENDING" } onChange={handleSortOrderChange} /><p className="OptionName">Ascending</p></div>
                        <div className="Filter-Option"><input type="radio" name="sortOrder" value="DESCENDING" onChange={handleSortOrderChange} /><p className="OptionName">Descending</p></div>
                    </div>
                </div>
                <div className="Filter">
                    <p className="Filter-Title">Sort Field</p>
                    <div className="Filter-Options">
                        <div className="Filter-Option"><input type="radio" name="sortField" value="RATING" checked={filters.sortField === "RATING" } onChange={handleSortFieldChange} /><p className="OptionName">Rating</p></div>
                        <div className="Filter-Option"><input type="radio" name="sortField" value="DISTANCE " onChange={handleSortFieldChange} /><p className="OptionName">Distance</p></div>
                        <div className="Filter-Option"><input type="radio" name="sortField" value="PRICE" onChange={handleSortFieldChange} /><p className="OptionName">Price</p></div>
                    </div>
                </div>
            </div>
        </>
    );
}

function getFilterURL(filterSettings) {
    let filterString = "";
    if(filterSettings.type !== "" && filterSettings.type !== undefined) {
        filterString += "&type=" + filterSettings.type;
    }
    if(filterSettings.price !== -1 && filterSettings.price !== undefined) {
        filterString += "&price=" + filterSettings.price;
    }
    if(filterSettings.rating !== -1 && filterSettings.rating !== undefined) {
        filterString += "&rating=" + filterSettings.rating;
    }
    if(filterSettings.distance !== -1 && filterSettings.distance !== undefined) {
        filterString += "&distance=" + filterSettings.distance;
    }
    if(filterSettings.sortOrder !== "" && filterSettings.sortOrder !== undefined) {
        filterString += "&sortOrder=" + filterSettings.sortOrder;
    }
    if(filterSettings.sortField !== "" && filterSettings.sortField !== undefined) {
        filterString += "&sortField=" + filterSettings.sortField;
    }
    return filterString;
}

export default Filters;