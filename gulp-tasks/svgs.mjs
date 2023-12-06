import gulp from 'gulp'
import svg from 'gulp-svg-sprite'
import browsersync from 'browser-sync'

export default function svgs() {
  return gulp.src('src/img/**/*.svg')
    .pipe(svg({
      shape: {
        dest: 'svgs'
      },
      mode: {
        stack: {
          sprite: '../sprite.svg'
        }
      }
    }))
    .pipe(gulp.dest('build/img'))
    .on('end', browsersync.reload)
}
