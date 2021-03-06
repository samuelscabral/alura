import React, { Component } from 'react';
import './Foto.css';

class FotoHeader extends Component {
  render() {
    return (
      <header className="foto-header">
        <figure className="foto-usuario">
          <img src={this.props.foto.urlPerfil} alt="foto do usuario" />
          <figcaption className="foto-usuario">
            <a href="#">{this.props.foto.loginUsuario}</a>
          </figcaption>
        </figure>

        <time className="foto-data">{this.props.foto.horario}</time>

      </header>
    )
  }
}

class FotoInfo extends Component {

  render() {



    return (

      <div className="foto-info">

        <div className="foto-info-likes">
          {
            (() => {
              let likers = this.props.foto.likers;
              if (likers) {
                likers.map(liker => {
                  return (
                    <>
                      <a href={`"https://instagram.com/${liker.login}"`} >{liker.login}</a> ,
                      </>
                  )
                }).concat(<>curtiram</>);
              }
            })()
          }

        </div>

        <p className="foto-info-legenda">
          <a className="foto-info-autor">{this.props.foto.loginUsuario} </a>
          {this.props.foto.comentario}
        </p>
        <ul className="foto-info-comentarios">
          {
            this.props.foto.comentarios.map(comentario => {
              return (
                <li className="comentario" key={comentario.id}>
                  <a className="foto-info-autor">{comentario.login}</a>
                  {comentario.texto}
                </li>
              )
            })
          }
        </ul>

      </div >
    )
  }
}

class FotoAtualizacoes extends Component {
  render() {
    return (
      <section className="fotoAtualizacoes">
        <a href="#" className="fotoAtualizacoes-like">Likar</a>
        <form className="fotoAtualizacoes-form">
          <input type="text" placeholder="Adicione um comentário..." className="fotoAtualizacoes-form-campo" />
          <input type="submit" value="Comentar!" className="fotoAtualizacoes-form-submit" />
        </form>
      </section>
    )
  }
}


export default class Foto extends Component {
  componentDidMount() {
    fetch(`http://localhost:8080/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`)
      .then(response => response.json())
      .then(fotos => {
        this.setState({ fotos: fotos });
      });
  }
  
  render() {
    return (
      <div className="foto">
        <FotoHeader foto={this.props.foto} />
        <img alt="foto" className="foto-src" src={this.props.foto.urlFoto} />
        <FotoInfo foto={this.props.foto} />
        <FotoAtualizacoes />
      </div>
    )
  }
}