var express = require('express');
var fs = require('fs');
var React = require('react');
var ReactAsync = require('react-async');
var Router = require('react-router');
var uuid = require('uuid');
var cache = require('./utils/cache');
var getRoutes = require('./routes.js');
var fetchData = require('./utils/fetchData');
var indexHTML = fs.readFileSync(__dirname+'/index.html').toString();
var mainJS = fs.readFileSync(__dirname+'/../public/js/main.js');
//var critical_css = fs.readFileSync(__dirname+'/assets/main.css');
//var main_css = fs.readFileSync(__dirname+'/assets/site.css');
var write = require('./utils/write');
var Cookies = require('cookies');
var bodyParser = require('body-parser');

// gzip/deflate outgoing responses
var compression = require('compression');
//var gzippo = require('gzippo');
var app = express();//.use(gzippo.compress());
//app.use(gzippo.staticGzip(__dirname + '/app'));

//// Body-parsing middleware
//app.use(bodyParser.urlencoded({extended: true}));
//app.use(bodyParser.json());
app.use(compression());

var renderApp = (req, token, cb) => {
  var path = req.url;
  var htmlRegex = /¡HTML!/;
  var dataRegex = /¡DATA!/;

  var router = Router.create({
    routes: getRoutes(token),
    location: path,
    onAbort: function (redirect) {
      cb({redirect});
    },
    onError: function (err) {
      console.log('Routing Error');
      console.log(err);
    }
  });

  router.run((Handler, state) => {
    if (state.routes[0].name === 'not-found') {
      var html = React.renderToStaticMarkup(<Handler/>);
      cb({notFound: true}, html);
      return;
    }
    if (state.routes[1].name === 'login') {
      //var App = require(__dirname+'/components/Login');
      ////var html = React.renderToString(require(__dirname+'/components/Login'));
      //cb(null, __dirname+'/components/Login', false);
      //return;
    }
    fetchData(token, state).then((data) => {
      var clientHandoff = { token, data: cache.clean(token) };
      var html = React.renderToString(<Handler data={data} />);
      var output = indexHTML.
         replace(htmlRegex, html).
         replace(dataRegex, JSON.stringify(clientHandoff));
      cb(null, output, token);
    });
  });
};


app.get('*', (req, res) => {
  var cookies = new Cookies(req, res);
  var token = cookies.get('token') || uuid();
  cookies.set('token', token, { maxAge: 30*24*60*60 });

  res.setHeader("Cache-Control", "public, max-age=172800"); // 2419200 14 days
  res.setHeader("Expires", new Date(Date.now() + 172800).toUTCString()); // 345600000

  switch (req.url) {
    //case '/js/main.js':
    //  return write(mainJS, 'text/javascript', res);
    case '/favicon.ico':
      return write('/assets/favicon.ico', 'text/plain', res);
   /* case '/main.css':
      return write(critical_css, 'text/css', res);
    case '/site.css':
      return write(main_css, 'text/css', res);*/
    case '/assets/react_logo.png':
      return(res.sendFile(__dirname+req.url));
    case '/assets/fonts/bootstrap/glyphicons-halflings-regular.woff2':
      return(res.sendFile(__dirname+req.url));
    case '/assets/fonts/bootstrap/glyphicons-halflings-regular.woff':
      return(res.sendFile(__dirname+req.url));
    case '/assets/fonts/bootstrap/glyphicons-halflings-regular.ttf':
      return(res.sendFile(__dirname+req.url));
    case '/js/main.js':
      return(res.sendFile(__dirname+req.url));
    default:
      renderApp(req, token, (error, html, token) => {
        if (!error) {
          write(html, 'text/html', res);
        }
        else if (error.redirect) {
          res.writeHead(303, { 'Location': error.redirect.to });
          res.end();
        }
        else if (error.notFound) {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.write(html);
          res.end();
        }
      });
  }
});

app.use(express.static(__dirname + '/app/assets'));

app.listen(process.env.PORT || 5000);

