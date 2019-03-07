import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { Document } from 'firestorter';
import { observer } from 'mobx-react';
import React, { Component, Fragment } from 'react';
import { Link, Route } from 'react-router-dom';
import { RecipeDocument } from '../avacado/Recipe';
import { Screen } from './Screen';
import { ObservableMap, action, observable, computed, IObservableValue } from 'mobx';
import { CircularProgress } from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
    root: {
        border: '1px solid blue'
    },
    input: {
        padding: 20,
        background: 'red',
        transition: 'all 0.5s ease-in-out 0s',
        '.edit &': {
            paddingTop: 40,
            color: 'green',
            background: 'darkgreen'
        },
        '.bake &': {
            padding: 60,
            color: 'dodgerblue',
            background: 'navy',
            transition: 'all 0.5s ease-in-out 0s',
        }
    },
    edit: {
        color: 'green !important'
    },
    bake: {
        color: 'blue !important'
    }
});

type RecipePropTypes = {
    store: any
    match: any
    mode: string
    classes: any
    [key: string]: any
}

type DocumentSchemea = {
    [key: string]: any
}

// : Display a Route whether there is a Mode or not
export const RecipePage =
    observer(
        ({ store, match }) => <Route path={`${match.path}/:mode`} children={
            (props: any) =>
                <PageRoot {...props} {...{  // Replace props.match with parent route's match
                    store, match, id: match.params.id,
                    mode: props.match && props.match.params.mode
                }} />
        } />
    )

// : Main Class for RecipePage
const PageRoot =
    withStyles(styles)(
        observer(
            class extends Component<RecipePropTypes> {

                recipe = new Document<RecipeDocument>(`users/${'3SRvQoY7u0E7WA1qUCpz'}/recipeBook/${this.props.match.params.id}`)

                todoStore = observable<Array<string>>(['cat'])

                handleAddTodo = () => {
                    this.todoStore.push('cat')
                }

                render() {
                    const { recipe } = this
                    const { match, classes, mode, id } = this.props
                    const { name, instructions, ingredients, description } = this.recipe.data

                    console.log('MODE', mode)

                    return (
                        <Screen id={`Recipe-${id}`}>
                            {recipe.isLoading && <CircularProgress disableShrink />}
                            <EditButton {...{ match, mode }} />
                            <BakeButton {...{ match, mode }} />
                            <Navigation {...{ match }} />
                            <div className={classnames(classes.root, mode)} > {/* All children are decendand of mode class */}
                                <div key={id} style={{ marginTop: 16, padding: 16, minWidth: 300, textAlign: 'left', maxWidth: 500, background: 'lightgrey', lineHeight: 0.3 }} >
                                <Fragment>
                                            <p className={classnames(classes.input)}>{id}</p>
                                            <p>{name}</p>
                                            <p>{description}</p>
                                            <p>{ingredients}</p>
                                            <p>{instructions}}</p>
                                            <button onClick={this.handleAddTodo}>Add</button>
                                            {this.todoStore.map((todo) => (
                                                <p>{todo}</p>
                                            ))}
                                        </Fragment>
                                </div>
                            </div>
                        </Screen>
                    )
                }
            }
        )
    )

const Loader = observer(() => {
    return (
        <p>LOADING.....</p>
    )
})
    

const EditButton = observer(({ match, mode }) => {
    return (
        <p
            style={{position: 'fixed', top: 16, minWidth: 60, textAlign: 'center', padding: 8, right: 16, background: 'grey'}}
        ><Link to={`${match.url}${mode === 'edit' ? '' : '/edit'}`}>
            {mode === 'edit' ? 'Done' : 'Edit'}
        </Link></p>
    )
})

const BakeButton = observer(({ match, mode }) => {
    return (
        <p
            style={{position: 'fixed', top: 16, minWidth: 60, textAlign: 'center', padding: 8, right: 16, background: 'grey'}}
        ><Link to={`${match.url}${mode === 'bake' ? '' : '/bake'}`}>
            {mode === 'bake' ? 'Finished' : 'Bake'}
        </Link></p>
    )
})

const Navigation = observer(({ match }) => (
    <div style={{ position: 'fixed', bottom: 30, zIndex: 9999, left: 20, padding: 10, borderRadius: 4, boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)', listStylePosition: "inside", background: 'lightgrey', paddingTop: 0, paddingBottom: 0 }}>
        {match.params && <li><Link to={`/recipes/${match.params.category}`}>Back</Link></li>}
        <li><Link to={`${match.url}/edit`}>Edit</Link></li>
        <li><Link to={`${match.url}/bake`}>Bake</Link></li>
        <li><Link to={`${match.url}`}>Done</Link></li>
    </div>
))


// export const Recpie: SFC<Props> = observer(({ match }) => {
//     // console.log(match)
//     let id = match.params.id
//     return (
//         <Screen id={`Recipe-${id}`}>
//             <li><Link to='/recipes'>Back</Link></li>
//             <h1>{`Recipe: ${id}`}</h1>
//         </Screen>
//     )
// })