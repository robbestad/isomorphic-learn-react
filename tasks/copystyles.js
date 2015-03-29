var gulp = require('gulp');

// load plugins
var $ = require('gulp-load-plugins')();

module.exports = function(config){
  return function(){
    return gulp
      .src(
        ['./app/assets/app.css'],
        {base:'./app/assets/'}
      )
      .pipe($.rename({
          basename: "site" // site.css
      }))
      .pipe(gulp.dest('./app/assets'));
  };
};