import gulp from 'gulp';
import bump from 'gulp-bump';
import babel from 'gulp-babel';
import start from 'gulp-start-process';
import fs from 'graceful-fs';

gulp.task('default', ['spec']);

['major', 'minor', 'patch'].forEach((type) => {
  gulp.task(`bump:${type}`, ['build'], () =>
    gulp.src('./package.json')
    .pipe(bump({ type }))
    .pipe(gulp.dest('./'))
  );
});

gulp.task('bump', ['bump:patch']);

gulp.task('spec', ['spec:ut']);

gulp.task('spec:ut', (done) => {
  start('./node_modules/.bin/mocha --harmony --opts mocha.opts "specs/**/*Spec.js"', done);
});

gulp.task('spec:smoke', (done) => {
  start('./node_modules/.bin/mocha --harmony --opts mocha.opts "specs/smokingTest.js"', done);
});

gulp.task('build', ['build:babel']);

gulp.task('build:babel', () =>
  gulp.src('src/*.js')
    .pipe(babel())
    .pipe(gulp.dest('lib'))
);

// gulp.task('redis:folder', 'Create redis.tmp/ for temp redis db files', function(done) {
//   return fs.exists(__dirname + '/redis.tmp', function(exists) {
//     if (exists) {
//       return done();
//     }
//
//     return fs.mkdir(__dirname + "/redis.tmp", done);
//   });
// });
//
// gulp.task('redis:start', 'Start redis server', ['redis:folder'], function(done) {
//   return start('redis-server ' + __dirname + '/redis.conf', done);
// });
//
// gulp.task('redis:stop', 'Stop redis server', function(done) {
//   return start('redis-cli shutdown', done);
// });
