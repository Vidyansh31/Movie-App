import React, { Component } from 'react';
import {Link} from "react-router-dom";

export class Navbar extends Component {
  render() {
    return (
      <div style={{display: 'flex', alignItems: 'center' , marginLeft: '1.5rem'}}>
          <Link to="/" style={{textDecoration: 'none'}}><h1>Movies app</h1></Link>
          <Link to="/favourite" style={{textDecoration: 'none'}}><h2 style={{padding:'1.6rem'}}>Favourites</h2></Link>
      </div>
    )
  }
}

export default Navbar;