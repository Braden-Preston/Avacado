import { observer, Provider } from 'mobx-react';
import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Link, Route, Switch, withRouter } from 'react-router-dom';
import { defaultConfig, MobxStore } from '../mobxStore';
import * as routes from '../routes';
import logo from './logo.svg';
import { RecipeBook } from './RecipeBook';
import { Screen } from './Screen';

// Initialize State
const store = new MobxStore(defaultConfig)

interface PropTypes {
  store?: any // required
}

@observer
export default class App extends Component<PropTypes> {

  componentDidMount() {
    require('../index.css')
    require('./App.css')
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <RoutedApp />
        </Router>
      </Provider>
    )
  }
}

const RoutedApp = withRouter(({ location, match }) => (
  <Screen id="App">
    <ul style={{
      position: 'fixed', bottom: 0, zIndex: 9999, right: 20, padding: 10, borderRadius: 4, boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)', listStylePosition: "inside", background: 'lightgrey', paddingTop: 0, paddingBottom: 0, fontSize: 12,
    }}>
      <li><Link to={routes.ROOT}>Home</Link></li>
      <li><Link to={routes.RECIPES}>Recipes</Link></li>
      <li><Link to={routes.PLANNER}>Planner</Link></li>
      <li><Link to={routes.TIMER}>Timer</Link></li>
      <li><Link to={routes.SETTINGS}>Settings</Link></li>
    </ul>
    <div style={{ position: 'fixed', bottom: 0, color: 'dodgerblue', background: 'lightgrey' }}>{location.pathname}</div>
    <Switch location={location}>
      <Route exact path={routes.ROOT} component={() => (
        <div className="Welcome">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>Welcome to Avacado</p>
            <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer" >
              Learn React
            </a>
          </header>
        </div>
      )} />
      <Route path={routes.RECIPES} component={RecipeBook} />
      <Route render={() => (<Fragment><h1>404</h1><h4>Page not found.</h4></Fragment>)} />
    </Switch>
  </Screen>
))

