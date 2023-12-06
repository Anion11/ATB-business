import gulp from 'gulp'
import clean from './gulp-tasks/clean.mjs'
import pugMixins from './gulp-tasks/pugMixins.mjs'
import pug2html from './gulp-tasks/pug2html.mjs'
import styles from './gulp-tasks/styles.mjs'
import scriptsTask from './gulp-tasks/scripts.mjs'
import scriptsAMPTask from './gulp-tasks/scriptsAMP.mjs'
import fonts from './gulp-tasks/fonts.mjs'
import images from './gulp-tasks/images.mjs'
import svgs from './gulp-tasks/svgs.mjs'
import svgsPages from './gulp-tasks/svgsPages.mjs'
import serve from './gulp-tasks/serve.mjs'

const build = gulp.series(clean, pugMixins, gulp.parallel(pug2html, styles, scriptsTask, scriptsAMPTask, fonts, images, svgs, svgsPages))

const development = gulp.series(build, serve)
const production = build
const scripts = gulp.series(clean, scriptsTask, scriptsAMPTask)

export { development, production, scripts }
