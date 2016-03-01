var gulp = require('gulp-help')(require('gulp'));
var start = require('gulp-start-process');
var fs = require('graceful-fs')
var __ = require('lodash');
var argv = require('yargs').argv;

function runSpecs(done) {
  if (done == null) {
    done = (function() {});
  }
  return start("app=test DEBUG=test* NODE_ENV=Test ./node_modules/.bin/mocha --harmony --opts mocha.opts \"test/**/*.spec.*\"", done);
};

gulp.task('redis:folder', 'Create redis.tmp/ for temp redis db files', function(done) {
  return fs.exists(__dirname + "/redis.tmp", function(exists) {
    if (exists) {
      return done();
    }

    return fs.mkdir(__dirname + "/redis.tmp", done);
  });
});

gulp.task('redis:start', 'Start redis server', ['redis:folder'], function(done) {
  return start("redis-server " + __dirname + "/redis.conf", done);
});

gulp.task('redis:stop', 'Stop redis server', function(done) {
  return start('redis-cli shutdown', done);
});

gulp.task('spec:once', 'Run spec one time', ['redis:start'], function(done) {
  return runSpecs(done);
});

gulp.task('spec', 'Run spec in watch mode', ['redis:start', 'spec:once'], function() {
  var watch = require('gulp-watch');
  return watch(['**/*.js', '**/*.es', '!node_modules/**', '!.git/**'], function() {
    return runSpecs();
  });
});
