import path, { resolve } from 'node:path'
import url from 'node:url'
import fs from 'node:fs'

const outDir = resolve(path.dirname(url.fileURLToPath(import.meta.url)), 'build/pages')

function readWriteAsync(item) {
  fs.readFile(item, 'utf8', function (err, data) {
    if (err) throw err
    const newValue = data.replace(/src="(\/)+/g, 'src="../../').replace(/xlink:href="(\/)+/g, 'xlink:href="../../')
    fs.writeFile(item, newValue, 'utf8', function (err_) {
      if (err_) throw err_
    })
  })
}

fs.readdir(outDir, async (err, files) => {
  if (err) throw err
  let promiseArray = []
  for (const file of files) {
    const ext = path.extname(file)
    if (ext == '') {
      const directory = file
      promiseArray.push(
        new Promise(() => {
          fs.readdir(`${outDir}/${directory}`, (error, innerFiles) => {
            if (error) throw error
            for (const file of innerFiles) {
              const ext = path.extname(file)
              if (ext !== null && ext === '.html') {
                const newPath = `${outDir}/${directory}/${file}`
                readWriteAsync(newPath)
              }
            }
          })
        })
      )
    }
  }
})
