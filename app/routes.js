var React = require('react');
var { DefaultRoute, Redirect, Route, NotFoundRoute } = require('react-router');

module.exports = (token) => {

  // hand-wavy dependency injection
  //var CreateContact = require('./handlers/CreateContact');
  //CreateContact.token = token;

  return [
    <Route name="root" path="/" handler={require('./handlers/Layout')}>
      <DefaultRoute handler={require('./components/Home')} />
      <Route name="login" handler={require('./components/Login')} />
      <Route name="home" handler={require('./components/Home')} />
      <Route name="source" handler={require('./components/Login')} />
      <Route name="articles" handler={require('./components/Articles')}>
        <Route name="article/:id" handler={require('./components/Articles/item/index')} >
          <Route name="edit" handler={require('./components/Articles/item/edit')} >
          </Route>
        </Route>
      </Route>

      <Route name="mcfly" handler={require('./components/Mcfly')} />
    </Route>,
    <Redirect from="/" to="login" />,
    <NotFoundRoute name="not-found" handler={require('./handlers/NotFound')}/>
  ];
};
