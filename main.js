const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')

let window = null

// Wait until the app is ready
app.once('ready', () => {
  // Create a new window
  window = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: '#111',
    show: false
  })

  // Load index.html in the main window
  window.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Display window once it's ready to show
  window.once('ready-to-show', () => {
    window.show()
  })
})
