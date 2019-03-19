import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { Document } from 'firestorter';
import { observer } from 'mobx-react';
import React, { Component, Fragment } from 'react';
import { Link, Route } from 'react-router-dom';
import { RecipeDocument } from '../avacado/Recipe';
import { Screen } from './Screen';
import { ObservableMap, action, observable, computed, IObservableValue, toJS } from 'mobx';
import { CircularProgress, TextField } from '@material-ui/core';
import { recipeFormNew } from '../forms'

// const form = recipeFormNew

const styles = (theme: Theme) => createStyles({
    root: {
        border: '1px solid blue'
    },
    input: {
        padding: 20,
        transition: 'all 0.5s ease-in-out 0s',
        '.edit &': {
            paddingTop: 40,
            color: 'green',
            // background: 'darkgreen'
        },
        '.bake &': {
            padding: 60,
            color: 'dodgerblue',
            // background: 'navy',
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
            (props) => {
                class Page extends Component<RecipePropTypes> {

                    [key: string]: any;
                    
                    @observable recipe = new Document<RecipeDocument>(`users/${'3SRvQoY7u0E7WA1qUCpz'}/recipeBook/${this.props.match.params.id}`)
                    @observable todoStore = ['cat', 'cat', 'cat']
                    @observable recipeForm = {
                        name: this.recipe.data.name,
                        prep_time: this.recipe.data.prep_time,
                        img_url: this.recipe.data.img_url,
                        favorite: this.recipe.data.favorite,
                        tags: this.recipe.data.tags,
                        description: this.recipe.data.description,
                        instructions: this.recipe.data.instructions,
                        ingredients: this.recipe.data.ingredients,
                    }

                    @action handleAddTodo = () => {
                        this.todoStore.push('cat')
                    }

                    componentWillMount() {
                        // : Manually for instances where the route does not call the mode method
                        this[`_${this.props.mode}`]()
                    }

                    _submit = async () => {
                        const { recipe, recipeForm } = this
                        // : Validate Form and get Field Data
                        recipeFormNew.submit({
                            onSuccess: async (form: any) => {
                                console.warn("Form is valid! Send the request here.");
                                console.log("Form Values!", form.values());
                                // : Update only New Recipe Fields
                                const formValues = form.values()
                                try {
                                    for (const key in formValues) {
                                        if (formValues.hasOwnProperty(key)) {
                                            console.table({ key, formValuesKEY: typeof formValues[key] })
                                            if (formValues[key] !== recipe.data[key]) {
                                                // console.table({key, formValuesKEY: formValues[key]})
                                                await recipe.set({ [`${key}`]: formValues[key] }, { merge: true })
                                                // console.log(`Updated: ${key} with ${recipeForm[key]}`)
                                            }
                                        }
                                    }
                                } catch (error) {
                                    console.error(error)
                                }
                            },
                            onError: (form: any) => {
                                console.warn("Form has errors!");
                                console.table("All form errors", form.errors());
                            },
                        })
                        // // : Update only New Recipe Fields
                        // try {
                        //     for (const key in recipeForm) {
                        //         if (this.recipeForm.hasOwnProperty(key)) {
                        //             if (recipeForm[key] !== recipe.data[key]) {
                        //                 await recipe.set({ [`${key}`]: recipeForm[key] || '' }, { merge: true })
                        //                 // console.log(`Updated: ${key} with ${recipeForm[key]}`)
                        //             }
                        //         }
                        //     }
                        // } catch (error) {
                        //     console.error(error)
                        // }
                        // // : Reset Form Data
                        // for (const key in recipeForm) {
                        //     if (this.recipeForm.hasOwnProperty(key)) {
                        //         recipeForm[key] = recipe.data[key]
                        //     }
                        // }
                    }

                    _edit = async () => {
                        const { recipe, recipeForm } = this
                        // : Are we empty?
                        let recipeKeys = Object.values(toJS(recipe.data))
                        let recipeEmpty = recipeKeys.every((value: string) => !value)
                        let document = recipe
                        // : Fetch if empty
                        if (recipeEmpty) {
                            try { document = await recipe.fetch() }
                            catch (error) { console.log(error) }
                        }
                        // : Set Initial Values
                        // console.table({
                        //     name: this.recipe.data.name,
                        //     description: this.recipe.data.description,
                        //     prep_time: this.recipe.data.prep_time,
                        //     tags: this.recipe.data.tags,
                        //     img_url: this.recipe.data.img_url,
                        //     favorite: this.recipe.data.favorite,
                        //     ingredients: this.recipe.data.ingredients,
                        //     instructions: this.recipe.data.instructions,
                        // })
                        recipeFormNew.update({
                            name: this.recipe.data.name,
                            description: this.recipe.data.description,
                            prep_time: this.recipe.data.prep_time,
                            tags: this.recipe.data.tags,
                            img_url: this.recipe.data.img_url,
                            favorite: this.recipe.data.favorite,
                            ingredients: this.recipe.data.ingredients,
                            instructions: this.recipe.data.instructions,
                        })
                        console.log(toJS(recipeFormNew.fields))
                        console.log(recipeFormNew.$('favorite').type)
                        // for (const key in recipeForm) {
                        //     if (recipeForm.hasOwnProperty(key)) {
                        //         recipeForm[key] = document.data[key]
                        //     }
                        // }
                    }

                    render() {
                        const { recipe, recipeForm, _submit, _edit } = this
                        const { match, classes, mode, id } = this.props
                        const { name, instructions, ingredients, description } = this.recipe.data

                        // console.log(toJS(recipeForm))
                        // console.log(Object.keys(recipeForm))
                        // console.log(form)
                        return (
                            <Screen id={`Recipe-${id}`}>
                                {recipe.isLoading && <CircularProgress disableShrink />}
                                <EditButton {...{ match, mode, _submit: this._submit, _edit: this._edit }} />
                                <BakeButton {...{ match, mode }} />
                                <Navigation {...{ match }} />
                                <div className={classnames(classes.root, mode)} > {/* All children are decendand of mode class */}
                                    <div key={id} style={{ marginTop: 16, padding: 16, minWidth: 300, textAlign: 'left', maxWidth: 500, background: 'lightgrey', lineHeight: 0.3 }} >

                                        <EditForm form={recipeFormNew} />


                                        <p>Break</p>
                                        <Fragment>
                                            <p>{id}</p>
                                            {Object.keys(recipeForm).map((value: any) =>
                                                <IngredientItem
                                                    {...{
                                                        classes, mode, recipe, form: recipeFormNew,
                                                        recipeForm, value, _submit
                                                    }}
                                                    key={`Field-${value}`}
                                                />
                                            )}
                                            {/* <IngredientItem {...{ classes, mode, recipe, recipeForm, value: 'name', _submit: this._submit }} />
                                        <IngredientItem {...{ classes, mode, recipe, recipeForm, value: 'description', _submit: this._submit }} />
                                        <IngredientItem {...{ classes, mode, recipe, recipeForm, value: 'ingredients', _submit: this._submit }} />
                                        <IngredientItem {...{ classes, mode, recipe, recipeForm, value: 'instructions', _submit: this._submit }} /> */}
                                            <p>Ingredients</p>
                                            <button onClick={this.handleAddTodo}>Add</button>
                                            {/* {this.todoStore.map((todo) => (
                                            <IngredientItem {...{ classes, mode, value: todo }} />
                                        ))} */}
                                        </Fragment>
                                    </div>
                                </div>
                            </Screen>
                        )
                    }
                }
                return (
                    <Page {...props} />
                )
            }
        )
    )

const EditForm =
    observer(({ form }) => {
        const cat = 'test'
        return (
            <form>
                <h1>test</h1>
                {/* <TextField
                    fullWidth
                    variant="filled"
                    id={form.$('email').id}
                    error={form.$('email').hasError}
                    helperText={form.$('email').error}
                    {...form.$('email').bind()}
                /> */}

                {/* ... other inputs ... */}

                <button type="submit" onClick={form.onSubmit}>Submit</button>
                <button type="button" onClick={form.onClear}>Clear</button>
                <button type="button" onClick={form.onReset}>Reset</button>

                <p>{form.error}</p>
            </form>
        )
    })

const IngredientItem =
    observer(({ classes, mode, recipe, recipeForm, value, form }) => (
        <div className={classes.input}>
            {mode !== 'edit' && <p>{recipe.data[value]}</p>}
            {}
            <ObservedField {...{ recipeForm, recipe, mode, value, form }} />
        </div>
    ))

const ObservedField =
    observer(({ recipeForm, recipe, mode, value, form }) => (
        <Fragment>
            {mode === 'edit' &&
                <TextField
                    fullWidth
                    variant="filled"
                    id={form.$(value).id}
                    // type={form. ? 'number' : 'string'}
                    label={form.$(value).label}
                    error={form.$(value).hasError}
                    helperText={form.$(value).error}
                    {...form.$(value).bind()}
                />
                // <TextField
                //     fullWidth
                //     variant="filled"
                //     label={value}
                //     value={recipeForm[value]}
                //     onChange={event => { recipeForm[value] = event.target.value }}
                // />
            }
        </Fragment>
    ))

// const IngredientItem = observer(({ classes, mode, value, recipe, recipeForm }) => {
//     return (
//         <div className={classes.input}>
//             {mode !== 'edit' && 
//                 <p>{recipe.data[value]}</p>
//             }
//             {mode === 'edit' &&
//                 <TextField
//                     variant="filled"
//                     value={recipeForm[value] === '' ? recipe.data[value] : recipeForm[value]}
//                     onChange={event => {recipeForm[value] = event.target.value}}
//                 />
//             }
//         </div>
//     )
// })


const EditButton = observer(({ match, mode, _submit, _edit }) => {
    return (
        <p
            style={{ position: 'fixed', top: 16, minWidth: 60, textAlign: 'center', padding: 8, right: 16, background: 'grey' }}
            onClick={mode === 'edit' ? _submit : _edit}
        ><Link to={`${match.url}${mode === 'edit' ? '' : '/edit'}`}>
                {mode === 'edit' ? 'Done' : 'Edit'}
            </Link></p>
    )
})

const BakeButton = observer(({ match, mode }) => {
    return (
        <p
            style={{ position: 'fixed', top: '30vh', minWidth: 60, textAlign: 'center', padding: 8, left: '50%', transform: 'translateX(-50%)', background: 'grey' }}
        ><Link to={`${match.url}${mode === 'bake' ? '' : '/bake'}`}>
                {mode === 'bake' ? 'All Done!' : 'Bake'}
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