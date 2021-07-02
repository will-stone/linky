import brave from '@browser-logos/brave/brave_128x128.png'
import braveBeta from '@browser-logos/brave-beta/brave-beta_128x128.png'
import braveDev from '@browser-logos/brave-dev/brave-dev_128x128.png'
import braveNightly from '@browser-logos/brave-nightly/brave-nightly_128x128.png'
import chrome from '@browser-logos/chrome/chrome_128x128.png'
import chromeBeta from '@browser-logos/chrome-beta/chrome-beta_128x128.png'
import chromeCanary from '@browser-logos/chrome-canary/chrome-canary_128x128.png'
import chromeDev from '@browser-logos/chrome-dev/chrome-dev_128x128.png'
import chromium from '@browser-logos/chromium/chromium_128x128.png'
import edge from '@browser-logos/edge/edge_128x128.png'
import edgeBeta from '@browser-logos/edge-beta/edge-beta_128x128.png'
import edgeCanary from '@browser-logos/edge-canary/edge-canary_128x128.png'
import edgeDev from '@browser-logos/edge-dev/edge-dev_128x128.png'
import firefox from '@browser-logos/firefox/firefox_128x128.png'
import firefoxDevEdition from '@browser-logos/firefox-developer-edition/firefox-developer-edition_128x128.png'
import firefoxNightly from '@browser-logos/firefox-nightly/firefox-nightly_128x128.png'
import iridium from '@browser-logos/iridium/iridium_128x128.png'
import maxthon from '@browser-logos/maxthon/maxthon_128x128.png'
import opera from '@browser-logos/opera/opera_128x128.png'
import operaBeta from '@browser-logos/opera-beta/opera-beta_128x128.png'
import operaDeveloper from '@browser-logos/opera-developer/opera-developer_128x128.png'
import operaGX from '@browser-logos/opera-gx/opera-gx_128x128.png'
import operaNeon from '@browser-logos/opera-neon/opera-neon_128x128.png'
import qutebrowser from '@browser-logos/qutebrowser/qutebrowser_128x128.png'
import safari from '@browser-logos/safari/safari_128x128.png'
import safariTechnologyPreview from '@browser-logos/safari-technology-preview/safari-technology-preview_128x128.png'
import tor from '@browser-logos/tor/tor_128x128.png'
import vivaldi from '@browser-logos/vivaldi/vivaldi_128x128.png'
import vivaldiSnapshot from '@browser-logos/vivaldi-snapshot/vivaldi-snapshot_128x128.png'
import yandex from '@browser-logos/yandex/yandex_128x128.png'

import dissenter from './logos/dissenter.png'
import finicky from './logos/finicky.png'
import min from './logos/min.png'
import naverWhale from './logos/NAVER_whale.png'
import pocket from './logos/pocket.png'
import polypane from './logos/polypane.png'
import spotify from './logos/spotify.png'
import waterfox from './logos/waterfox.png'
import librewolf from './logos/librewolf.png'

export const logos: { [key: string]: string } = {
  'com.brave.Browser': brave,
  'com.brave.Browser.beta': braveBeta,
  'com.brave.Browser.dev': braveDev,
  'com.brave.Browser.nightly': braveNightly,
  'org.chromium.Chromium': chromium,
  'org.mozilla.firefox': firefox,
  'org.mozilla.firefoxdeveloperedition': firefoxDevEdition,
  'org.mozilla.nightly': firefoxNightly,
  'com.google.Chrome': chrome,
  'com.google.Chrome.beta': chromeBeta,
  'com.google.Chrome.canary': chromeCanary,
  'com.google.Chrome.dev': chromeDev,
  'de.iridiumbrowser': iridium,
  'com.maxthon.mac.Maxthon': maxthon,
  'com.microsoft.edgemac': edge,
  'com.microsoft.edgemac.Beta': edgeBeta,
  'com.microsoft.edgemac.Canary': edgeCanary,
  'com.microsoft.edgemac.Dev': edgeDev,
  'com.electron.min': min,
  'com.operasoftware.Opera': opera,
  'com.operasoftware.OperaGX': operaGX,
  'com.operasoftware.OperaNext': operaBeta,
  'com.operasoftware.OperaDeveloper': operaDeveloper,
  'com.opera.Neon': operaNeon,
  'com.readitlater.PocketMac': pocket,
  'com.firstversionist.polypane': polypane,
  'org.qt-project.Qt.QtWebEngineCore': qutebrowser,
  'com.apple.Safari': safari,
  'com.apple.SafariTechnologyPreview': safariTechnologyPreview,
  'org.torproject.torbrowser': tor,
  'com.vivaldi.Vivaldi': vivaldi,
  'com.vivaldi.Vivaldi.snapshot': vivaldiSnapshot,
  'net.waterfox.waterfox': waterfox,
  'ru.yandex.desktop.yandex-browser': yandex,
  'com.naver.Whale': naverWhale,
  'com.gab.Dissenter': dissenter,
  'net.kassett.finicky': finicky,
  'com.spotify.client': spotify,
  'io.gitlab.librewolf-community.librewolf': librewolf,
}
