import gulp from 'gulp'
import fonts from './fonts.mjs'
import images from './images.mjs'
import svgs from './svgs.mjs'
import svgsPages from './svgsPages.mjs'
import pugMixins from './pugMixins.mjs'
import pug2html from './pug2html.mjs'
import styles from './styles.mjs'
import scripts from './scripts.mjs'
import scriptsAMP from './scriptsAMP.mjs'
import server from 'browser-sync'

export default function serve(callback) {
  server.init({
    server: 'build',
    notify: false,
    cors: true
  })

  gulp.watch('src/{img,pages}/**/*.{gif,jpg,png,webp}', gulp.series(images))
  gulp.watch('src/img/**/*.svg', gulp.series(svgs))
  gulp.watch('src/pages/**/*.svg', gulp.series(svgsPages))
  gulp.watch('src/fonts/**/*', gulp.series(fonts))
  gulp.watch(['src/**/*.pug', '!src/blocks/mixins.pug'], gulp.series(pugMixins, pug2html))
  gulp.watch('src/**/*.scss', gulp.series(styles))
  gulp.watch('src/**/*.js', gulp.series(scripts))
  gulp.watch('src/**/*.js', gulp.series(scripts, scriptsAMP))

  return callback()
}
