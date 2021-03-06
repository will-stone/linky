import { AnyAction } from '@reduxjs/toolkit'
import electron, { app } from 'electron'

import { appReady, urlOpened } from '../shared/state/actions'
import { Channel } from '../shared/state/channels'
import { permaStore } from './state/perma-store'
import { dispatch } from './state/store'

// Attempt to fix this bug: https://github.com/electron/electron/issues/20944
app.commandLine.appendArgument('--enable-features=Metal')

if (permaStore.get('firstRun')) {
  // Prompt to set as default browser
  app.setAsDefaultProtocolClient('http')
  app.setAsDefaultProtocolClient('https')
}

permaStore.set('firstRun', false)

app.on('ready', () => dispatch(appReady()))

// App doesn't always close on ctrl-c in console, this fixes that
app.on('before-quit', () => app.exit())

app.on('open-url', (event, url) => {
  event.preventDefault()
  dispatch(urlOpened(url))
})

/**
 * Enter actions from renderer into main's store's queue
 */
electron.ipcMain.on(Channel.PREFS, (_, action: AnyAction) => dispatch(action))

/**
 * Enter actions from renderer into main's store's queue
 */
electron.ipcMain.on(Channel.TILES, (_, action: AnyAction) => dispatch(action))
