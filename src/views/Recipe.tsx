import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Screen } from './Screen';

type Props = {
    store: any
    match: any
}

export const Recpie =
    observer(
        class extends Component<Props> {

            componentWillMount() {
                const { store, match } = this.props
                store.setDocID(match.params.id)
            }

            render() {
                const { store, match } = this.props
                const { currentDocument, setDocID } = store
                console.log(match)
                const { id, category }  = match.params
                let recipe = currentDocument.data
                return (
                    <Screen id={`Recipe-${id}`}>
                        <li><Link to={`/recipes/${category}`}>Back</Link></li>
                        <li><Link to={`${match.url}/edit`}>Edit</Link></li>
                        <li><Link to={`${match.url}`}>Done</Link></li>
                        <div
                            key={currentDocument.id}
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
                            <p>{`${currentDocument.id}:`}</p>
                            <p>{`\t ${recipe.name}`}</p>
                            <p>{`\t ${recipe.description}`}</p>
                            <p>{`    ${recipe.ingredients}`}</p>
                            <p>{`    ${recipe.instructions}`}</p>
                        </div>
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
            }
        }
    )

// export const Recpie: SFC<Props> = observer(({ match }) => {
//     // console.log(match)
//     let id = match.params.id
//     return (
//         <Screen id={`Recipe-${id}`}>
//             <li><Link to='/recipes'>Back</Link></li>
//             <h1>{`Recipe: ${id}`}</h1>
//         </Screen>
//         // <Switch location={location}>
//         //     <Route exact path={`${match.path}/:id`} render={({ match }) => <h1>{match.params.id}</h1>} />
//         //     <Route exact path={`${match.path}`} render={({ match }) => (
//         //         <Fragment>
//         //             {recipes.map((rec: any) => (
//         //                 <RecipeItem {...{ rec, match }} />
//         //             ))}
//         //         </Fragment>
//         //     )} />
//         // </Switch>
//     )
// })