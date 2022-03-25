import React, { Component } from "react";

import "../css/Resultado.css";

export class Resultado extends Component {
    render() {
        return (
            <article className="resultado__box">
                <h3 className="subtitulo">{this.props.nome}</h3>
                <p id="resultado__real" className="resultado__texto texto">{this.props.valor}</p>
            </article>
        );
    }
}