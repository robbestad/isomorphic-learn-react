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
var write = require('./utils/write');
var Cookies = require('cookies');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');

// gzip/deflate outgoing responses
var compression = require('compression');
var app = express();
//app.use(cacher.cache('days', 30));

app.use(compression({level:9}));

var oneYear = 31557600000;
app.use(express.static(__dirname + '/assets', { maxAge: oneYear }));
app.use(express.static(__dirname + '/js', { maxAge: oneYear }));

//favicon
app.use(favicon(__dirname + '/assets/favicon.ico'));

//// Body-parsing middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

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
    var html;
    if (state.routes[0].name === 'not-found') {
      html = React.renderToStaticMarkup(<Handler/>);
      cb({notFound: true}, html);
      return;
    }
    var token='', data={};
    var clientHandoff = { token, data: '' };
    html = React.renderToString(<Handler data={data} />);
    var output = indexHTML.
        replace(htmlRegex, html).
        replace(dataRegex, JSON.stringify(clientHandoff));
    cb(null, output, token);
    //
    //fetchData(token, state).then((data) => {
    //  //var clientHandoff = { token, data: cache.clean(token) };
    //  var clientHandoff = { token, data: '' };
    //  var html = React.renderToString(<Handler data={data} />);
    //  var output = indexHTML.
    //     replace(htmlRegex, html).
    //     replace(dataRegex, JSON.stringify(clientHandoff));
    //  cb(null, output, token);
    //});
  });
};


app.get('*', (req, res) => {
  var cookies = new Cookies(req, res);
  var token = cookies.get('token') || uuid();
  cookies.set('token', token, { maxAge: 30*24*60*60 });

  res.setHeader("Cache-Control", "public, max-age=2419200"); // 2419200 14 days
  res.setHeader("Expires", new Date(Date.now() + 2419200).toUTCString()); // 345600000

  switch (req.url) {
    case '/favicon.ico':
      return write('/assets/favicon.ico', 'text/plain', res);
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

app.listen(process.env.PORT || 5000);

