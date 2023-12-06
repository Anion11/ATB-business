import gulp from 'gulp'
import include from 'gulp-include'
import uglify from 'gulp-uglify'
import browsersync from 'browser-sync'

export default function scriptsAMP() {
  return gulp.src(['src/pages/**/*-amp.js'])
    .pipe(include())
      .on('error', console.log)
    .pipe(uglify({
      compress: false,
      mangle: false,
    }))
    .pipe(gulp.dest('build/pages'))
    .on('end', browsersync.reload)
}
