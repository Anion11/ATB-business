import gulp from 'gulp'
import webpack from 'webpack-stream'
import webpackConfig from '../webpack.config.mjs'
import eslint from 'gulp-eslint-new'
import browsersync from 'browser-sync'

export default function scripts() {
  return gulp.src(['src/js/**/*.js', 'src/pages/**/*.js', '!src/pages/**/*-amp.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('build'))
    .on('end', browsersync.reload)
}
