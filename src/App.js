import React from 'react';
import './styles/ice-cream.scss';
import Header from './structure/Header';
import Footer from './structure/Footer';
import Menu from './ice-cream/Menu';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import EditIceCream from './ice-cream/EditIceCream';
import IceCreams from './ice-cream/IceCreams';
import AddIceCream from './ice-cream/AddIceCream';

function App() {
  return (
    <Router>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <Switch>
        <Route path="/" component={Menu} exact />
        <Route path="/ice-creams" component={IceCreams} />
        <Route path="/menu-items/add" component={AddIceCream} exact />
        <Route path="/menu-items/:menuItemId" component={EditIceCream} />
        <Redirect to="/" />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
