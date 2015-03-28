'use strict';
// Gulp plugins
var gulp = require('gulp'),
  gutil = require('gulp-util'),

  // Load config file and moulder and detect environment
  moulder = require('./config/config-moulder'),
  environment = process.env.NODE_ENV || 'production',
  config = require('./config/config');

gutil.log('Detected environment: ', environment);

// Mould config to fit environment
config = moulder(config, environment).build;

// Cleaner for cleaning on a per-task basis
var cleaner = require('./tasks/clean')(config);

gulp.task('clean:copy', cleaner('copy'));
gulp.task('clean:scripts', cleaner('scripts'));
gulp.task('clean:styles', cleaner('styles'));
gulp.task('clean:vendor', cleaner('vendor'));
gulp.task('clean',
  ['clean:copy', 'clean:scripts', 'clean:styles', 'clean:vendor']);

// Generate critical CSS
gulp.task('copystyles', require('./tasks/copystyles')(config));
gulp.task('critical', ['copystyles'], require('./tasks/critical')(config));

// Convert JSX to js
//gulp.task('jsx',  require('./tasks/transform')(config));

// Jslinting
//gulp.task('lint', require("./tasks/lint")(config));

// Concat vendor scripts (described in config)
gulp.task('vendor', ['clean:vendor'], require('./tasks/vendor')(config));

// Compile scss to css
gulp.task('styles', ['clean:styles'], require('./tasks/styles')(config));

// Webpack bundle
gulp.task('webpack', ['clean:scripts', 'vendor'], require('./tasks/webpack')(config));

// Bundle once
//gulp.task('scripts', ['clean:scripts', 'vendor'], require('./tasks/webpack')(config));

// Bundle and watch for changes to all files appropriately
gulp.task('serve', ['vendor', 'copy', 'styles'],
  require('./tasks/serve')(config));

gulp.task('dev', ['webpack','serve']);

// Copies static files that don't need any build processing to `public/dist`
gulp.task('copy', ['clean:copy'], require('./tasks/copy')(config));

// For deployment. Makes front-end ready to serve from `public/dist`
gulp.task('build', ['vendor','copy', 'styles']);
gulp.task('default', ['build']);
