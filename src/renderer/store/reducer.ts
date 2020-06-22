import { createReducer } from '@reduxjs/toolkit'

import { Store as MainStore } from '../../main/store'
import { alterHotkeys } from '../../utils/alterHotkeys'
import {
  madeTileFav,
  receivedStore,
  toggledTileVisibility,
  updatedTileHotkey,
} from './actions'

const mainStoreIntialState: MainStore = {
  fav: '',
  hiddenTileIds: [],
  hotkeys: {},
}

const mainStore = createReducer(mainStoreIntialState, (builder) =>
  builder
    .addCase(receivedStore, (state, action) => action.payload)
    .addCase(madeTileFav, (state, action) => {
      state.fav = action.payload
    })
    .addCase(toggledTileVisibility, (state, action) => {
      // Remove the id if it exists in the array
      const updatedHiddenTileIds = state.hiddenTileIds.filter(
        (id) => id !== action.payload,
      )

      // If no id was removed, it didn't exist to begin with and should be added
      if (updatedHiddenTileIds.length === state.hiddenTileIds.length) {
        updatedHiddenTileIds.push(action.payload)
      }

      state.hiddenTileIds = updatedHiddenTileIds
    })
    .addCase(updatedTileHotkey, (state, action) => {
      const updatedHotkeys = alterHotkeys(
        state.hotkeys,
        action.payload.browserId,
        // TODO move this lower casing ot alterHotkeys
        action.payload.value.toLowerCase(),
      )
      state.hotkeys = updatedHotkeys
    }),
)

export { mainStore }
