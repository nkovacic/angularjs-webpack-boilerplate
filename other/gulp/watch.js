var gulp = require('gulp');
var conf = require('../conf');
var path = require('path');

gulp.task('watch:dev',['build:dev'], function() {
	gulp.watch(['./src/**/*'], ['build:dev']);
});