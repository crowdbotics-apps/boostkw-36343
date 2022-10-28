/**
 * @format
 */

import { AppRegistry, Text } from 'react-native'
import App from './src/App'
import { name as appName } from './app.json'

Text.defaultProps = {
  ...Text.defaultProps,
  maxFontSizeMultiplier: 1,
}

AppRegistry.registerComponent(appName, () => App)
