const fs = require('fs')
const path = require('path')

const date = new Date()
const timestamp = `${
  date.getMonth() + 1
}-${date.getDate()}-${date.getFullYear()}_${date.getHours()}.${date.getMinutes()}.${date.getSeconds()}`
const root = `../../../../pm2Logs/${timestamp}/`

fs.mkdirSync(path.join(__dirname, root), (err) => {
  if (err) {
    return console.error(err)
  }
  console.log('Directory created successfully!')
})

module.exports = {
  apps: [
    {
      name: 'app',
      script: './dist/server/index.js',
      env: {
        NODE_ENV: 'production',
      },
      error_file: `${root}err.log`,
      out_file: `${root}out.log`,
      log_file: `${root}combined.log`,
      time: true,
    },
  ],
}
