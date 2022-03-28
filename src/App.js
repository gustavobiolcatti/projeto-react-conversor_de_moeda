import React, {Component} from 'react';
import { Resultado } from './assets/componentes/Resultado';
import { Cotacao } from './assets/componentes/Cotacao'

import './assets/css/App.css';

export class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      valor: 0,
      opcao: "BRL",
      stringCotacao: "",

      convertidoReal: "-",
      convertidoDolar: "-",
      convertidoEuro: "-",
      convertidoBitcoin: "-",

      cotacaoReal: "-",
      cotacaoDolar: "-",
      cotacaoEuro: "-",
      cotacaoBitcoin: "-",

      simbolo: {
        "USD": "$",
        "EUR": "€",
        "BRL": "R$",
        "BTC": "₿"
      }
    }

    this.obterCotacao = this.obterCotacao.bind(this)
    this.obterOpcao = this.obterOpcao.bind(this)

    this.exibirResultado = this.exibirResultado.bind(this)
  }

  obterOpcao(e) {
    const state = this.state
    const valor = e.target.value

    if (state.valor === null) {
      state.valor = 0
    }
    else if (isNaN(valor)) {
      state.opcao = valor
    }
    else {
      state.valor = valor
    }
    
    this.setState(state)
    this.obterCotacao()
  }

  obterCotacao() {
    const state = this.state
    state.stringCotacao = ""

    for (let i in state.simbolo) {
      if (state.opcao !== i) state.stringCotacao += `${i}-${state.opcao}`;
    }
    
    state.stringCotacao = state.stringCotacao.replace(/(.{7})?(.{7})?(.{7})/, "$1,$2,$3")

    
    fetch(`https://economia.awesomeapi.com.br/last/${state.stringCotacao}`)
      .then(resposta => resposta.json())
      .then(json => exibirCotacao(json))
      .finally(() => {
        this.setState(state)
        this.exibirResultado()
      });

      function exibirCotacao(json) {
        state.cotacaoReal = 1
        state.cotacaoDolar = 1
        state.cotacaoEuro = 1
        state.cotacaoBitcoin = 1

        for (let obj in json){          
          if (json[obj].code === "BRL") state.cotacaoReal = parseFloat(json[obj].ask).toFixed(2);

          else if (json[obj].code === "USD") state.cotacaoDolar = parseFloat(json[obj].ask).toFixed(2);

          else if (json[obj].code === "EUR") state.cotacaoEuro = parseFloat(json[obj].ask).toFixed(2);

          else if (json[obj].code === "BTC") state.cotacaoBitcoin = (parseFloat(json[obj].ask)*1000).toFixed(2);
        }
     };
  }

  exibirResultado() {
    const state = this.state

    state.convertidoReal = (state.valor / state.cotacaoReal).toFixed(2);
    state.convertidoDolar = (state.valor / state.cotacaoDolar).toFixed(2);
    state.convertidoEuro = (state.valor / state.cotacaoEuro).toFixed(2);
    state.convertidoBitcoin = (state.valor / state.cotacaoBitcoin).toFixed(6);

    this.setState(state)
  }

  render() {
    return (
      <div>
        <h1 className="titulo titulo--principal">Conversor de Moedas</h1>

        <div className="principal">
          <div id="formulario">
            <fieldset className="formulario__fieldset-radio">
              <label className="texto"><input type="radio" name="moeda" value="BRL" onChange={this.obterOpcao} defaultChecked/> Real</label>
              <label className="texto"><input type="radio" name="moeda" value="USD" onChange={this.obterOpcao} /> Dólar</label>
              <label className="texto"><input type="radio" name="moeda" value="EUR" onChange={this.obterOpcao} /> Euro</label>
            </fieldset>

            <input id="valor" className="formulario__valor" type="number" placeholder="Digite o valor" onChange={this.obterOpcao} required/>
          </div>

          <section id="resultado" className="resultado">
            <h2 className="titulo">Resultados</h2>

            <div className="resultado__container">
              <Resultado nome="REAL (BRL)" valor={this.state.convertidoReal} />
              <Resultado nome="DÓLAR (USD)" valor={this.state.convertidoDolar} />
              <Resultado nome="EURO (EUR)" valor={this.state.convertidoEuro} />
              <Resultado nome="BITCOIN (BTC)" valor={this.state.convertidoBitcoin} />
            </div>
          </section>

          <section id="cotacao" className="cotacao">
            <h2 className="titulo">Cotação</h2>
            
            <div className='cotacao__lista'>
              <Cotacao moeda="Real" valor={this.state.cotacaoReal} />
              <Cotacao moeda="Dólar" valor={this.state.cotacaoDolar} />
              <Cotacao moeda="Euro" valor={this.state.cotacaoEuro} />
              <Cotacao moeda="Bitcoin" valor={this.state.cotacaoBitcoin} />
            </div>
          </section>
        </div>
      </div>
    );
  }
}
