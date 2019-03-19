import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as routes from '../routes';
import { RecipePage } from './RecipePage';
import { RecipeCategory } from './RecipeCategory';
import { Screen } from './Screen';

const styles = (theme: Theme) => createStyles({
    root: {
        color: 'red !important',
        background: 'red',
    },
    paper: { /* ... */ },
    button: { /* ... */ },
});

interface PropTypes {
    store: any
    match: any
    location: any
    classes: any
}

mui

export const RecipeGallery =
    inject('store')(
        withStyles(styles)(
            observer(
                class extends Component<PropTypes> {
                    render() {
                        const { store, match, location } = this.props
                        return (
                            <Screen id={'Recipe Book'}>
                                <Switch location={location}>
                                    <Route exact path={`${match.path}/:category`} render={({ match }) => (<RecipeCategory {...{ store, match }} />)} />
                                    <Route path={`${match.path}/:category/:id`} render={({ match }) => (<RecipePage {...{ store, match }} />)} />
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

