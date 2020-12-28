import { createReducer } from '@reduxjs/toolkit'
import xor from 'lodash/xor'

import { AFFLIATE_URL, DEFAULT_URL, SPONSOR_URL } from '../../config/CONSTANTS'
import { App } from '../../config/types'
import { Store as MainStore } from '../../main/store'
import { alterHotkeys } from '../../utils/alterHotkeys'
import { backspaceUrlParse } from '../../utils/backspaceUrlParse'
import {
  changedHotkey,
  clickedCloseMenuButton,
  clickedEyeButton,
  clickedFavButton,
  clickedOkToAffliateButton,
  clickedSettingsButton,
  clickedSponsorButton,
  clickedUrlBackspaceButton,
  clickedVersionButton,
  pressedBackspaceKey,
  pressedEscapeKey,
  receivedApps,
  receivedDefaultProtocolClientStatus,
  receivedStore,
  receivedTheme,
  receivedUpdateAvailable,
  receivedUpdateDownloaded,
  receivedUrl,
  receivedVersion,
} from './actions'

/**
 * Apps Reducer
 */
const apps = createReducer<App[]>([], (builder) =>
  builder.addCase(receivedApps, (_, action) => action.payload),
)

/**
 * Theme Reducer
 */
export interface ThemeState {
  isDarkMode: boolean
  accent: string
}

const theme = createReducer<ThemeState>(
  {
    isDarkMode: false,
    accent: '',
  },
  (builder) => {
    builder.addCase(receivedTheme, (_, action) => action.payload)
  },
)

/**
 * UI Reducer
 */
interface UiState {
  isEditMode: boolean
  url: string
  version: string
  updateStatus: 'no-update' | 'available' | 'downloaded'
  isDefaultProtocolClient: boolean

  // From main's store
  fav: MainStore['fav']
  hiddenTileIds: MainStore['hiddenTileIds']
  hotkeys: MainStore['hotkeys']
}

const ui = createReducer<UiState>(
  {
    isEditMode: false,
    version: '',
    updateStatus: 'no-update',
    isDefaultProtocolClient: true,
    url: DEFAULT_URL,

    // From main's store
    fav: '',
    hiddenTileIds: [],
    hotkeys: {},
  },
  (builder) =>
    builder
      .addCase(changedHotkey, (state, action) => {
        const updatedHotkeys = alterHotkeys(
          state.hotkeys,
          action.payload.appId,
          action.payload.value,
        )
        state.hotkeys = updatedHotkeys
      })
      .addCase(clickedCloseMenuButton, (state) => {
        state.isEditMode = false
      })
      .addCase(clickedEyeButton, (state, action) => {
        const { hiddenTileIds } = state
        // Remove the id if it exists in the array, or add it if it doesn't
        state.hiddenTileIds = xor(hiddenTileIds, [action.payload])
      })
      .addCase(clickedFavButton, (state, action) => {
        state.fav = action.payload
      })
      .addCase(clickedSettingsButton, (state) => {
        state.isEditMode = true
      })
      .addCase(clickedUrlBackspaceButton, (state) => {
        state.url = backspaceUrlParse(state.url)
      })
      .addCase(clickedSponsorButton, (state) => {
        state.url = SPONSOR_URL
        state.isEditMode = false
      })
      .addCase(clickedVersionButton, (state) => {
        state.url = DEFAULT_URL
        state.isEditMode = false
      })
      .addCase(clickedOkToAffliateButton, (state) => {
        state.url = AFFLIATE_URL
      })
      .addCase(pressedEscapeKey, (state) => {
        if (state.isEditMode) {
          state.isEditMode = false
        }
      })
      .addCase(pressedBackspaceKey, (state) => {
        state.url = backspaceUrlParse(state.url)
      })
      .addCase(receivedDefaultProtocolClientStatus, (state, action) => {
        state.isDefaultProtocolClient = action.payload
      })
      .addCase(receivedStore, (state, action) => {
        state.fav = action.payload.fav
        state.hiddenTileIds = action.payload.hiddenTileIds
        state.hotkeys = action.payload.hotkeys
      })
      .addCase(receivedUpdateAvailable, (state) => {
        state.updateStatus = 'available'
      })
      .addCase(receivedUpdateDownloaded, (state) => {
        state.updateStatus = 'downloaded'
      })
      .addCase(receivedUrl, (state, action) => {
        state.isEditMode = false
        state.url = action.payload
      })
      .addCase(receivedVersion, (state, action) => {
        state.version = action.payload
      }),
)

export { apps, theme, ui }
