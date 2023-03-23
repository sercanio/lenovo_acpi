const { app, Tray, Menu } = require('electron')
const path = require('path')
const sudo = require('sudo-prompt')
const { exec } = require('child_process')

let tray = null
let conservationModeActive = false

app.whenReady().then(() => {
  // Check the current state of the conversation mode file on app start
  checkConservationModeState()

  tray = new Tray(path.join(`${__dirname}/battery.png`))
  const contextMenu = Menu.buildFromTemplate([
    {label: "Battery Charge Limiter"},
    {type: 'separator'},
    {
      label: `Enable Conservation Mode ${conservationModeActive ? ' 🟢' : ''}`,
      click: () => {
        enableConservationMode()
      },
    },
    {
      label: `Disable Conservation Mode ${!conservationModeActive ? ' 🟢' : ''}`,
      click: () => {
        disableConservationMode()
      },
    },
    {
      label: 'Quit',
      click: () => {
        app.quit()
      },
    },
  ])
  tray.setToolTip('Lenovo Charge Limiter.')
  tray.setContextMenu(contextMenu)
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

function checkConservationModeState() {
  exec(
    'cat /sys/bus/platform/drivers/ideapad_acpi/VPC2004:00/conservation_mode',
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error}`)
        return
      }

      // If the conversation mode file contains "1", it is active
      conservationModeActive = stdout.trim() === '1'
    }
  )
}

function enableConservationMode() {
  sudo.exec(
    `sh ${path.join(__dirname, 'limitcharge.sh')} 1`,
    { name: 'Lenovo Charge Limiter' },
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error}`)
        return
      }

      // Update the conservationModeActive variable and tray app's options
      conservationModeActive = true
      updateTrayMenu()
    }
  )
}

function disableConservationMode() {
  sudo.exec(
    `sh ${path.join(__dirname, 'limitcharge.sh')} 0`,
    { name: 'Lenovo Charge Limiter' },
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error}`)
        return
      }

      // Update the conservationModeActive variable and tray app's options
      conservationModeActive = false
      updateTrayMenu()
    }
  )
}

function updateTrayMenu() {
  const contextMenu = Menu.buildFromTemplate([
    {
      label: `Enable Conversation Mode ${conservationModeActive ? ' 🟢' : ''}`,
      click: () => {
        enableConservationMode()
      },
    },
    {
      label: `Disable Conversation Mode ${!conservationModeActive ? ' 🟢' : ''}`,
      click: () => {
        disableConservationMode()
      },
    },
    {
      label: 'Quit',
      click: () => {
        app.quit()
      },
    },
  ])
  tray.setContextMenu(contextMenu)
}
