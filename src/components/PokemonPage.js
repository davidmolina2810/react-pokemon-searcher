import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import Search from './Search'
import { Container } from 'semantic-ui-react'

class PokemonPage extends React.Component {
  state = {
    pokemon: [],
    searched: ''
  }

  componentDidMount() {
    fetch('http://localhost:3000/pokemon')
    .then( res => res.json() )
    .then( pokemon => this.setState({pokemon}))
  }

  addPokemon = (e, pokemon) => {
    e.preventDefault()
    fetch('http://localhost:3000/pokemon', {
      method: "POST",
      headers: {
        'Content-Type':'application/json',
        'Accept':'application/json',
      },
      body: JSON.stringify(pokemon)
    })
    .then( res => res.json() )
    .then( pokemon => {
      const newPokemon = [...this.state.pokemon, pokemon]
      this.setState({
        pokemon: newPokemon
      })
    })
    e.target.reset()
  }

  searchPokemon = (e) => {
    this.setState({searched: e.target.value.toLowerCase()})
  }

  render() {
    return (
      <Container>
        <h1>Pokemon Searcher</h1>
        <br />
        <PokemonForm addPokemon={this.addPokemon}/>
        <br />
        <Search searchPokemon={this.searchPokemon}/>
        <br />
        <PokemonCollection pokemon={this.state.pokemon.filter(pokemon => pokemon.name.toLowerCase().includes(this.state.searched))}/>
      </Container>
    )
  }
}

export default PokemonPage
