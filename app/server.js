var express = require('express');
var fs = require('fs');
var React = require('react');
var Router = require('react-router');
var uuid = require('uuid');
var cache = require('./utils/cache');
var getRoutes = require('./routes.js');
var fetchData = require('./utils/fetchData');
var indexHTML = fs.readFileSync(__dirname+'/index.html').toString();
var mainJS = fs.readFileSync(__dirname+'/../public/js/main.js');
var critical_css = fs.readFileSync(__dirname+'/assets/main.css');
var main_css = fs.readFileSync(__dirname+'/assets/site.css');
var write = require('./utils/write');
var Cookies = require('cookies');
var bodyParser = require('body-parser');

// gzip/deflate outgoing responses
var compress = require('compression');
var app = express();

// Body-parsing middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// compress
app.use(compress());

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

  switch (req.url) {
    case '/js/main.js':
      return write(mainJS, 'text/javascript', res);
    case '/favicon.ico':
      return write('haha', 'text/plain', res);
    case '/main.css':
      return write(critical_css, 'text/css', res);
    case '/site.css':
      return write(main_css, 'text/css', res);
    case '/assets/react_logo.png':
      res.setHeader("Cache-Control", "public, max-age=172800"); // 2419200 14 days
      res.setHeader("Expires", new Date(Date.now() + 172800).toUTCString()); // 345600000
      return(res.sendFile(__dirname+req.url));
    case '/assets/fonts/bootstrap/glyphicons-halflings-regular.woff2':
      res.setHeader("Cache-Control", "public, max-age=172800"); // 2419200 14 days
      res.setHeader("Expires", new Date(Date.now() + 172800).toUTCString()); // 345600000
      return(res.sendFile(__dirname+req.url));
    case '/assets/fonts/bootstrap/glyphicons-halflings-regular.woff':
      res.setHeader("Cache-Control", "public, max-age=172800"); // 2419200 14 days
      res.setHeader("Expires", new Date(Date.now() + 172800).toUTCString()); // 345600000
      return(res.sendFile(__dirname+req.url));
    case '/assets/fonts/bootstrap/glyphicons-halflings-regular.ttf':
      res.setHeader("Cache-Control", "public, max-age=172800"); // 2419200 14 days
      res.setHeader("Expires", new Date(Date.now() + 172800).toUTCString()); // 345600000
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

