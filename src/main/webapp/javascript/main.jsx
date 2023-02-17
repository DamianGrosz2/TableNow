import React, { Component } from "react";
import ReactDOM from 'react-dom';
import '../css/main.css';
import App from './App';

class Main extends Component {
    render() {
        return (
            <div id="main">
                <App />
            </div>
        );
    }
}

ReactDOM.render(
    <Main />,
    document.getElementById('root')
);