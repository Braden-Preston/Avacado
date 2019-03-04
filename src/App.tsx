import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { RecipeBook, Ingredient } from './avacado';

class App extends Component {

  render() {

    const recipeBook = new RecipeBook(new Date, 'Kittens')
    const ingredient = new Ingredient(1.25, 'cup', 'caco')
    ingredient.get('measurement')

    // recipeBook.getIngredients().map(ingredient => {
    //    ingredeint.getName()
    // })

    console.log(recipeBook.name)
    console.log(recipeBook.greeting())
    console.log(ingredient.get('measurement'))
    // console.log(ingredient.set('test', 'test'))
    ingredient.set('portion', 1.8)
    console.log(ingredient)

    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <p>{recipeBook.greeting()}</p>
          <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer" >
            Learn React
          </a>
        </header>
      </div>
    )
  }

}

export default App;
