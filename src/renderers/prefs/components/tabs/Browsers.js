import { css } from 'emotion'
import React from 'react'

import Checkbox from '../Checkbox'
import Th from '../Th'
import Td from '../Td'

class Browsers extends React.Component {
  render() {
    const { browsers, onBrowserToggle } = this.props

    return (
      <table
        className={css`
          width: 100%;
          border-collapse: collapse;
        `}
      >
        <thead>
          <tr>
            <Th>Browser</Th>
            <Th>Enabled</Th>
          </tr>
        </thead>
        <tbody>
          {browsers ? (
            browsers.map(browser => (
              <tr key={browser.name}>
                <Td>{browser.alias || browser.name}</Td>
                <Td>
                  <Checkbox
                    checked={browser.enabled}
                    onChange={e => {
                      onBrowserToggle(browser.name, e.target.checked)
                    }}
                  />
                </Td>
              </tr>
            ))
          ) : (
            <tr>
              <Td>Loading...</Td>
              <Td />
            </tr>
          )}
        </tbody>
      </table>
    )
  }
}

export default Browsers