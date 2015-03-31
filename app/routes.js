var React = require('react');
var { DefaultRoute, Redirect, Route, NotFoundRoute } = require('react-router');

module.exports = (token) => {

  return [
    <Route name="root" path="/" handler={require('./handlers/Layout')}>
      <DefaultRoute handler={require('./components/Home')} />
      <Route name="home" handler={require('./components/Home')} />

    </Route>,
    <Redirect from="/" to="login" />,
    <NotFoundRoute name="not-found" handler={require('./handlers/NotFound')}/>
  ];
};
