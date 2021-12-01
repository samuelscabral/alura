import React, { Component } from 'react';
import './Timeline.css';
import Foto from '../Foto/Foto';

export default class Timeline extends Component {

  constructor() {
    super();
    this.state = { fotos: [] };
  }

  componentDidMount() {
    fetch('https://instalura-api.herokuapp.com/api/public/fotos/rafael')
      .then(response => response.json())
      .then(fotos => this.setState({ fotos }));
  }

  render() {
    return (
      <div className="fotos container">
        {
          this.state.fotos.map(foto => <Foto foto={foto} key={foto.id} />)
        }
      </div>
    );
  }
}