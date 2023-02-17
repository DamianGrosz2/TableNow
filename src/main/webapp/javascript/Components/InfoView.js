import '../../css/main.css';
import React from 'react';

function InfoView() {
    // This is simply a small component, which is used to show the user information about the restaurant.
    // It is used in the RestaurantView.js file.
    // The buttons are used to navigate to the next page or the website.
    return (
        <div className="Box">

            <div className="infoView">
                <h1 className='header3'>Title</h1>
                <div className='header2'>
                    <img src={icon2} alt="Not Found" className="IconImg2"/>
                    <p className='headerInfo'>Name</p>
                    <img src={icon1} alt="Not Found" className="IconImg2"/>
                    <p className='headerInfo'>Date</p>
                    <img src={icon3} alt="Not Found" className="IconImg2"/>
                    <p className='headerInfo'>Time</p>
                </div>

            </div>

            <button>Visit website</button>
            <button>Reserve</button>
        </div>
    );
}

const icon1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAlElEQVRIie2UMQ7CMAxFnxHHCHPvwjmiLPQ4XSp6D86SmZ4Ds4DkNBN1qw7kb/768feX5cBR6GPWPmb16k7bjlVDbHGL+SowAmFlvxkhDffu8SWKBM7mAAFltMS5EgDD1Akr8NnFxXK772CZwE6yCY5J4NxBgd0TNINm0AzqS56B4PyLnrYoEwhpKfi1+Us1Od7/I97E2SgzXOJbBwAAAABJRU5ErkJggg=="
const icon2 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABrklEQVRIie2Tv0scYRCGn9kfZ6FBgghBuMbi7iQpJE0wlX1KLYLFiaDGO7VM5V+gpW6ImNXCJq2tRSxiYykWJ6doICnSBhID0dudFLs5j939codcI8kLC9/OO98838AM3HeJyViaO1tG9TWAKGsb20UvlTNbV+BSVWbebBc+ZtWxsovXq6iuA3kgr8LG0ly9anjLsIi+n5+/6O8IsFg+HUBZjf7kVfQByupi+XTAABlyw5uZjgDiWmWgD2Tf8wtbnl/YAtkH+mIvUxYy1RFAhcmIxLtbanwWJgz1GwpPK5WTh+07gCJAw7YOm7dvz6Ws6qIcAbZc5561BQABgNvQXDPpFz2tXlJqcQxgizxOek46mwOElyrh5vLs+UIUCjZj90MmQLUmCKHypC0gUFmxRcdRXijhlxbrK+hKFsASu6YaIjCS8pKBtzuFS8cJx4DdlvCu44TPPb/0KbuD4DMAwqOkZ9xkaG4qnl/MzPvjX1sPenPh9yvQn55f6v1rB3eRG3wbjN/7I+l1BSBi78XH1BB0BQCMYhiCbgGMQ5DegzvI84vTJq9bHRj1H/AP6DfyK4Z2HopX/AAAAABJRU5ErkJggg=="
const icon3 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAC0UlEQVRIidWVTU8TURSGnzNTqB+EmKAGP4iGUCpBN+oP8Ft3FpP+AYoFvw3RaIyLWSmGGBdUoxbiD2hU6ooETXRrYINULehCIRpsTFgYsdiZ44Ip1k4LdclZndxz5n3OfW/mXljpIUsVrXCqOrPODIlKSGG3wFYAhWlBR1VIbpi1B61E6/x/A851TJxQtBdoXGbIjypcvhsPPq0IYFlqZKbTPYJcdhvGQAaw5bk/9/MTwNyqNdsF+xAqEWAXgKjcqmsIXLMscQr1fMWAAvGsqFyoawjEiz8CUkDKsrQvM53uFOSOil75PjUJcLXsDlxbHgNZEeNoXzzwqrB+tiOtALH+oPy7/m4fGEOAH6UtNhAczNeMRWvCqWrXc0TlQrH4UhHrb3mJ0O2O3BuNjlR5AJl1ZghoFBirawjEKxXPx8xs8wOQcaDJ79Qc9wDEkTYAFekv4fmykUiIrTgDAA5GyANA2A0gOXnxv+J/NczhhUT3egAKmwBWiz21nE5X14eNpdbX2vZnN93sAVQ44jiAL+e8KAcpjr9nAF8B5tRsKNec8xkHFyC6sxTklzjb3PSLBwA6AqA++3A5wP37Td/ElgPAmwWI/epi9O2mfN02zCMAhvDaA1Ah6SYRy9Ky1vU9CmRyPvOQa9eOnJptAOGwmqK0L2joMw9gw6w9CHwEdmWm053lAPmd5HzGQUVPx+LBewD1tROngFZUJrPGj2S+959f/szJdJsoT4AsOMdi/S0vlwLl43z7+/2OIUNAFaKhWHzH4g48t+m5yESPil4BsgjdM7PNDxIJsUsJh8Nq1tdOnFLhNlCNcDMWD14r7Cl5XX+fmrzhQgAZV5wBxBzWqvlPAL6sbHcwDyNEgFZAEXrWb2m+XnwLlH1wzkbSIYReoKlcDwAqkxjOpUJbKgIARKMjVX6n5riDERJ0D+6TCUwBo4Ims8aP5MOHe38vOcSKjj8DdheXIcKgEAAAAABJRU5ErkJggg=="

export default InfoView;