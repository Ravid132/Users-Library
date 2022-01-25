import React from 'react';
import { Switch, Route } from 'react-router';

import routes from './routes';

import { AppHeader } from './cmps/AppHeader';

export class RootCmp extends React.Component {
  render() {
    return (
      <div>
        <AppHeader />
        <main className='main-app'>
          <Switch>
            {routes.map((route) => (
              <Route
                key={route.path}
                exact
                component={route.component}
                path={route.path}
              />
            ))}
            {/* <Route path='/user/:id' component={UserDetails} /> */}
          </Switch>
        </main>
        {/* <AppFooter /> */}
      </div>
    );
  }
}
