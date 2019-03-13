import { app, ipcMain } from 'electron'
import Store = require('electron-store')
import activities from './config/activities'
import { ACTIVITIES_GET, ACTIVITIES_SET, SET_FAV, URL_RECEIVED } from './config/events'
import createPickerWindow from './main.createPicker'
import createTrayIcon from './main.createTray'
import { Activity } from './model'
import eventEmitter from './utils/eventEmitter'
import scanForApps from './utils/scanForApps'
import { runCommand } from './utils/runCommand'

// Start store and set activities if first run
const store = new Store({ defaults: { fav: undefined } })

let pickerReady = false
let urlToOpen: string | undefined

/**
 * Get Activities
 */
const getActivities = async (): Promise<Activity[]> => {
  // get all apps on system
  // returns object of {appName: "appName"}
  const installedApps = await scanForApps()

  const isActivityAvailable = (activity: Activity) => {
    if (activity.appId && installedApps[activity.appId]) {
      return true
    } else if (!activity.appId) {
      // always show activity that does not depend on app presence
      return true
    }
    return false
  }

  const mapFav = (activity: Activity) => ({
    ...activity,
    fav: store.get('fav') === activity.name,
  })

  const installedActivities = activities.filter(isActivityAvailable).map(mapFav)

  eventEmitter.emit(ACTIVITIES_SET, installedActivities)

  return installedActivities
}

/**
 * Event: Get Activities
 *
 * Listens for the ACTIVITIES_GET event, triggered by the renderers on load.
 * Scans for apps and sends them on to the renderers.
 */
eventEmitter.on(ACTIVITIES_GET, () => {
  getActivities()
})

eventEmitter.on(SET_FAV, (browserName: string) => {
  store.set('fav', browserName)
  getActivities()
})

ipcMain.on('run-act', (_: Event, arg: { name: string; url: string }) => {
  const activity = activities.find(act => act.name === arg.name)
  activity && runCommand(activity.cmd.replace('{URL}', arg.url))
  // event.sender.send('asynchronous-reply', 'pong')
})

/**
 * Event: App Ready
 *
 * Run once electron has loaded and the app is considered _ready for use_.
 */
app.on('ready', async () => {
  // Prompt to set as default browser
  app.setAsDefaultProtocolClient('http')

  const acts = await getActivities()

  await Promise.all([createPickerWindow(acts), createTrayIcon(acts)])

  pickerReady = true

  if (urlToOpen) {
    // if Browserosaurus was opened with a link, this will now be sent on to the
    // picker window.
    eventEmitter.emit(URL_RECEIVED, urlToOpen)
    urlToOpen = undefined // not required any more
  }
})

// App doesn't always close on ctrl-c in console, this fixes that
app.on('before-quit', () => {
  app.exit()
})

/**
 * Event: Open URL
 *
 * When a URL is sent to Browserosaurus (as it is default browser), send it to
 * the picker.
 * @param {string} url
 */
app.on('open-url', (event, url) => {
  event.preventDefault()
  if (pickerReady) {
    eventEmitter.emit(URL_RECEIVED, url)
  } else {
    // app not ready yet, this will be handled later in the createWindow callback
    urlToOpen = url
  }
})

// Hide dock icon. Also prevents Browserosaurus from appearing in cmd-tab.
app.dock.hide()
