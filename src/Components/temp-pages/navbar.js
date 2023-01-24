import React from 'react'
import {Link, NavLink} from 'react-router-dom'

const navbar = () => {
    return(
        <nav>
            <button><link to="/">Home</link></button>
            <button> <link to="/about">About</link></button>
            <button><link to="/contact">Contact</link></button>
        </nav>
    )
}

export default navbar; 