import a from '@artossystems/a'
import { ipcRenderer } from 'electron'
import produce from 'immer'
import * as mousetrap from 'mousetrap'
import * as React from 'react'
import {
  ACTIVITIES_SET,
  ACTIVITY_RUN,
  COPY_TO_CLIPBOARD,
  FAV_SET,
  URL_RECEIVED,
  URL_RESET,
} from '../config/events'
import { Activity } from '../model'
import {
  ActivityButton,
  ActivityImg,
  CopyButton,
  Key,
  LoadingText,
  Url,
  Window,
  WindowInner,
} from './StyledComponents'

const AUrlReceived = a(URL_RECEIVED, {} as { url: string })
const AFavSet = a(FAV_SET, {} as { name: string })
const AActivitiesSet = a(ACTIVITIES_SET, {} as { activities: Activity[] })
type AUrlReceived = ReturnType<typeof AUrlReceived>
type AFavSet = ReturnType<typeof AFavSet>
type AActivitiesSet = ReturnType<typeof AActivitiesSet>

interface State {
  url: string | null
  activities: Activity[]
  fav: string | null
}

const initialState: State = {
  url: null,
  activities: [],
  fav: null,
}

const reducer = produce(
  (state: State, action: AUrlReceived | AFavSet | AActivitiesSet) => {
    switch (action.type) {
      case AActivitiesSet.TYPE:
        state.activities = action.activities
        return
      case AUrlReceived.TYPE:
        state.url = action.url
        return
      case AFavSet.TYPE:
        state.fav = action.name
        return
    }
  },
)

const App: React.FC = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState)

  // Se-up event listeners
  React.useEffect(() => {
    mousetrap.bind('esc', () => ipcRenderer.send(URL_RESET))
    mousetrap.bind('space', e => {
      e.preventDefault() // stops space from opening previously selected act
      ipcRenderer.send(COPY_TO_CLIPBOARD)
    })
    ipcRenderer.on(URL_RECEIVED, (_: unknown, receivedUrl: string) => {
      dispatch(AUrlReceived({ url: receivedUrl }))
    })
    ipcRenderer.on(FAV_SET, (_: unknown, receivedFav: string) => {
      dispatch(AFavSet({ name: receivedFav }))
      mousetrap.bind('enter', () => ipcRenderer.send(ACTIVITY_RUN, receivedFav))
    })
    ipcRenderer.on(
      ACTIVITIES_SET,
      (_: unknown, receivedActivities: Activity[]) => {
        // setup hotkeys
        receivedActivities.forEach(act => {
          mousetrap.bind(act.hotKey, () => {
            ipcRenderer.send(ACTIVITY_RUN, act.name)
          })
        })
        dispatch(AActivitiesSet({ activities: receivedActivities }))
      },
    )
    return function cleanup() {
      ipcRenderer.removeAllListeners(URL_RECEIVED)
      ipcRenderer.removeAllListeners(FAV_SET)
      ipcRenderer.removeAllListeners(ACTIVITIES_SET)
    }
  }, [])

  const favActivities = state.activities.filter(act => act.name === state.fav)
  const notFavActivities = state.activities.filter(
    act => act.name !== state.fav,
  )
  const leftActivities = notFavActivities.filter(
    (_, i) => i < notFavActivities.length / 2,
  )
  const rightActivities = notFavActivities.filter(
    (_, i) => i >= notFavActivities.length / 2,
  )

  return (
    <Window onClick={() => ipcRenderer.send(URL_RESET)}>
      <WindowInner>
        {state.activities.length === 0 ? (
          <LoadingText>Loading...</LoadingText>
        ) : (
          <div style={{ display: 'flex' }}>
            <div
              style={{
                display: 'flex',
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
            >
              {leftActivities.map(activity => (
                <ActivityButton
                  key={activity.name}
                  onClick={e => {
                    e.stopPropagation()
                    ipcRenderer.send(ACTIVITY_RUN, activity.name)
                  }}
                  role="button"
                >
                  <ActivityImg
                    src={`../images/activity-icons/${activity.name}.png`}
                    alt={activity.name}
                  />
                  <Key>{activity.hotKey}</Key>
                </ActivityButton>
              ))}
            </div>
            <div
              style={{
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {favActivities.map(activity => (
                <ActivityButton
                  key={activity.name}
                  onClick={e => {
                    e.stopPropagation()
                    ipcRenderer.send(ACTIVITY_RUN, activity.name)
                  }}
                  role="button"
                  fav
                >
                  <ActivityImg
                    src={`../images/activity-icons/${activity.name}.png`}
                    alt={activity.name}
                  />
                  <Key>{activity.hotKey}</Key>
                </ActivityButton>
              ))}
            </div>
            <div
              style={{
                display: 'flex',
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              {rightActivities.map(activity => (
                <ActivityButton
                  key={activity.name}
                  onClick={e => {
                    e.stopPropagation()
                    ipcRenderer.send(ACTIVITY_RUN, activity.name)
                  }}
                  role="button"
                >
                  <ActivityImg
                    src={`../images/activity-icons/${activity.name}.png`}
                    alt={activity.name}
                  />
                  <Key>{activity.hotKey}</Key>
                </ActivityButton>
              ))}
            </div>
          </div>
        )}
      </WindowInner>
      <div>
        <Url>{state.url}</Url>
        <CopyButton onClick={() => ipcRenderer.send(COPY_TO_CLIPBOARD)}>
          Copy To Clipboard
        </CopyButton>
      </div>
    </Window>
  )
}

export default App
