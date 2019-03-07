import { observer } from 'mobx-react';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../routes';
import { Screen } from './Screen';

export const RecipeCategory = observer(({ store, match }) => {
    // const { store, match, location, classes } = props
    const { recipes, addRecipe, deleteAllRecipes } = store
    // console.log(query)
    // console.log(match.path)

    return (
        <Screen id={`[${match.params.category}] Recipes`}>
            <button onClick={() => addRecipe()} style={{ background: 'grey' }}>Add Recipe</button>
            <button onClick={() => deleteAllRecipes()} style={{ background: 'grey' }}>Delete All Recipes</button>

            <li><Link to={`/recipes${routes.BREAKFAST}`}>Breakfast</Link></li>
            <li><Link to={`/recipes${routes.LUNCH}`}>Lunch</Link></li>
            <li><Link to={`/recipes${routes.DINNER}`}>Dinner</Link></li>
            <li><Link to={`/recipes${routes.SNACK}`}>Snacks</Link></li>

            {recipes.map((rec: any) => (
                <RecipeItem key={rec.id} {...{ rec, match}} />
            ))}
        </Screen>
        // <Switch location={location}>
        //     <Route exact path={`${match.path}/:id`} render={({ match }) => <h1>{match.params.id}</h1>} />
        //     <Route exact path={`${match.path}`} render={({ match }) => (
        //         <Fragment>
        //             {recipes.map((rec: any) => (
        //                 <RecipeItem {...{ rec, match }} />
        //             ))}
        //         </Fragment>
        //     )} />
        // </Switch>
    )
})

const RecipeItem = observer(({ rec, query, match }) => {
    let recipe = rec.data
    // console.log(match, query)
    return (
        <Link to={`/recipes/${match.params.category}/${rec.id}`}>
            <div
                key={rec.id}
                style={{
                    marginTop: 16,
                    padding: 16,
                    minWidth: 300,
                    textAlign: 'left',
                    maxWidth: 500,
                    background: 'lightgrey',
                    lineHeight: 0.3
                }}
            >
                <p>{`${rec.id}:`}</p>
                <p>{`\t ${recipe.name}`}</p>
                <p>{`\t ${recipe.description}`}</p>
                <p>{`    ${recipe.ingredients}`}</p>
                <p>{`    ${recipe.instructions}`}</p>
            </div>
        </Link>
    )
})