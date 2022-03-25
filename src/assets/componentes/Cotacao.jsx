import React, {Component} from "react";
import "../css/Cotacao.css";

export class Cotacao extends Component {
    render() {
        return (
            <article className="cotacao__item texto">
                <p>{this.props.moeda}:</p>
                <p id="cotacao__real">{this.props.valor}</p>
            </article>
        );
    }
}