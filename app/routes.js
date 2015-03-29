var React = require('react');
var { DefaultRoute, Redirect, Route, NotFoundRoute } = require('react-router');

module.exports = (token) => {

  // hand-wavy dependency injection
  var CreateContact = require('./handlers/CreateContact');
  CreateContact.token = token;

  return [
    <Route name="root" path="/" handler={require('./handlers/Layout')}>
      <DefaultRoute handler={require('./components/Home')} />
      <Route name="login" handler={require('./components/Login')} />
      <Route name="home" handler={require('./components/Login')} />
      <Route name="source" handler={require('./components/Login')} />
      <Route name="mcfly" handler={require('./components/Mcfly')} />
    </Route>,
    <Redirect from="/" to="login" />,
    <NotFoundRoute name="not-found" handler={require('./handlers/NotFound')}/>
  ];
};
/*
      <Route name="contact" path="contact/:id" handler={require('./handlers/Contact')} />
      <Route name="newContact" handler={require('./handlers/NewContact')} />
      <Route name="createContact" handler={CreateContact} />
*/
