import gulp from 'gulp'
import svgmin from 'gulp-svgmin'
import browsersync from 'browser-sync'

export default function svgs() {
  return gulp.src('src/pages/**/*.svg')
    .pipe(svgmin())
    .pipe(gulp.dest('build/pages/'))
    .on('end', browsersync.reload)
}
