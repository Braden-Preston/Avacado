import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as routes from '../routes';
import { Recpie } from './Recipe';
import { RecipesCategory } from './RecipesCategory';
import { Screen } from './Screen';

interface PropTypes {
    store: any
    match: any
    location: any
    classes: any
}

const styles = (theme: Theme) => createStyles({
    root: {
        color: 'red !important',
        background: 'red',
    },
    paper: { /* ... */ },
    button: { /* ... */ },
});

export const RecipeBook =
    inject('store')(
        withStyles(styles)(
            observer(
                class extends Component<PropTypes> {

                    render() {
                        const { store, match, location, classes } = this.props
                        console.log(this.props)

                        return (
                            <Screen id={'Recipe Book'}>
                                <Switch location={location}>
                                    <Route exact path={`${match.path}/:category`} render={({ match }) => (<RecipesCategory {...{ store, match }} />)} />
                                    <Route path={`${match.path}/:category/:id`} render={({ match }) => (<Recpie {...{ store, match }} />)} />
                                    <DefaultRoute {...{ match, route: routes.BREAKFAST }} />
                                </Switch>
                            </Screen >
                        )
                    }
                }
            )
        )
    )

const DefaultRoute =
    withStyles(styles)(
        observer(
            ({ match, route }) =>
                <Route exact path={`${match.path}`} render={({ match }) => <Redirect to={`${match.path}${route}`} />} />
        )
    )

