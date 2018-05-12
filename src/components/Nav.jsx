import React from 'react';
import { Link } from 'react-router';

const Nav = () => (
    <nav className ="navbar navbar-default navbar-fixed-top">

    <div className="container">
        <button
            type ="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#navbar"
            aria-expanded="false"
            aria-controls="navbar"
        >
        <span className ="sr-only">Toggle navigation</span>
        <span className ="icon-bar" />
        <span className ="icon-bar" />
        <span className ="icon-bar" />
        </button>
        <link className="navbar-brand" to="/">React Youtube </link>
    </div>
    </nav>


);

export default Nav;
