import React, { Component } from 'react';
import { RecipeBook, Ingredient, Recipe } from '../avacado';
import { inject, observer, Provider } from 'mobx-react';
import { toJS } from 'mobx';

interface PropTypes {
    store?: any // required
}

@inject('store')
@observer
export default class RecipeBookGallery extends Component<PropTypes> {

    render() {
        const { store } = this.props
        const { recipeBook, recipes, recipes2, addRecipe, deleteAllRecipes } = store
        // console.log(recipes2)
        return (
            <div id={'Recipe Book Gallery'}>

                {/* <p>{recipeBook.greeting()}</p> */}
                <button onClick={() => addRecipe()} style={{ background: 'grey' }}>Add Recipe</button>
                <button onClick={() => deleteAllRecipes()} style={{ background: 'grey' }}>Delete All Recipes</button>

                {recipes.map((rec: any) => (
                    <RecipeItem rec={rec}/>
                ))}

            </div>
        )
    }
}

const RecipeItem = observer(({rec}) => {
    let recipe = rec.data
    return (
        <div key={rec.id} style={{ marginTop: 16, padding: 16, minWidth: 300, textAlign: 'left', maxWidth: 500, background: 'lightgrey', lineHeight: 0.3 }}>
            <p>{`${rec.id}:`}</p>
            <p>{`\t ${recipe.name}`}</p>
            <p>{`\t ${recipe.description}`}</p>
            <p>{`    ${recipe.ingredients}`}</p>
            <p>{`    ${recipe.instructions}`}</p>
        </div>
    )
})
