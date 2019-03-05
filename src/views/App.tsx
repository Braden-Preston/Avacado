import React, { Component, Fragment } from 'react';
import { MobxStore, defaultConfig } from '../mobxStore';
import { Provider, observer } from 'mobx-react';
import RecipeBookGallery from './RecipeBookGallery';
import logo from './logo.svg';
import * as routes from '../routes'

// import { BrowserRouter } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
  withRouter
} from 'react-router-dom'

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
        {/* <Switch>

</Switch> */}
      </Provider>
    )
  }
}

const RoutedApp = withRouter(({ location }) => (
  <main className="App">
    <ul style={{
      position: 'fixed', bottom: 0, zIndex: 9999, right: 20, padding: 10, borderRadius: 4, boxShadow: '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)', listStylePosition: "inside", background: 'lightgrey', paddingTop: 0, paddingBottom: 0, fontSize: 12,
    }}>
      <li><Link to={routes.ROOT}>Home</Link></li>
      <li><Link to={routes.RECIPES}>Recipes</Link></li>
      <li><Link to={routes.PLANNER}>Planner</Link></li>
      <li><Link to={routes.TIMER}>Timer</Link></li>
      <li><Link to={routes.SETTINGS}>Settings</Link></li>
    </ul>
    <div style={{ position: 'fixed', top: 0, color: 'dodgerblue', background: 'lightgrey' }}>{location.pathname}</div>
    <Switch location={location}>
      <Route exact path={routes.ROOT} component={() => (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>Welcome to Avacado</p>
            <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer" >
              Learn React
            </a>
          </header>
        </div>
      )} />
      <Route path={routes.RECIPES} component={RecipeBookGallery} />
      <Route render={() => (<Fragment><h1>404</h1><h4>Page not found.</h4></Fragment>)} />
    </Switch>
  </main>
))

