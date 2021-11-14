import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './components/landing-page/LandingPage';
import SearchDonor from './components/search-donor/SearchDonor';
import RegisterDonor from './components/register-donor/RegisterDonor';

const App: React.FC = (): JSX.Element => {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route path='/register-donor' component={RegisterDonor} />
          <Route path='/search' component={SearchDonor} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
