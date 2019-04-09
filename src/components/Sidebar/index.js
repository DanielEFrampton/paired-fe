import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class Sidebar extends Component {
  render() {
    return (
      <aside className="Sidebar">
        <h1>Paired</h1>
        <NavLink to="/schedule">View Schedule</NavLink>
        <NavLink to="/book-pairing">Book a Pairing</NavLink>
      </aside>
    );
  }
}