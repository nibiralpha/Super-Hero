import React, { Suspense } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store/store';
import LocalStorageComponent from '../Components/Local/Local';

const Landing = React.lazy(() => import('../screens/home/landing'));
const Search = React.lazy(() => import('../screens/home/search'));
const Team = React.lazy(() => import('../screens/team'));
const Details = React.lazy(() => import('../screens/details/index'));

interface PathModel {
  exact: Boolean;
  path: string;
  component: any;
}

const publicPaths: PathModel[] = [
  { exact: true, path: '/', component: Landing },
  { exact: false, path: '/search', component: Search },
  { exact: false, path: '/team', component: Team },
  { exact: false, path: '/hero/details/:id', component: Details }
];

const publicRoutes = publicPaths.map(({ path, ...props }: any, index: number) => (
  <Route key={index} path={path} {...props} />
));

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Suspense fallback={<div />}>
            <LocalStorageComponent />
            {publicRoutes}
          </Suspense>
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
