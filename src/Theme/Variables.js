/**
 * This file contains the application's variables.
 *
 * Define color, sizes, etc. here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

/**
 * Colors
 */
export const Colors = {
  // Example colors:
  transparent: 'rgba(0,0,0,0)',
  inputBackground: '#000952',
  white: '#FFFFFF',
  text: '#FFFFFF',
  textOffWhite: 'rgba(255, 255, 255, 0.75)',
  primary: '#00043c',
  success: '#000952',
  error: '#FF4D4D',
  background: '#000952',
  buttonBackground: '#1038EB',
}

export const NavigationColors = {
  primary: Colors.primary,
  background: Colors.background,
  buttonBackground: Colors.buttonBackground
}

/**
 * FontSize
 */
export const FontSize = {
  small: 16,
  regular: 20,
  large: 40,
}

/**
 * Metrics Sizes
 */
const tiny = 5 // 10
const small = tiny * 2 // 10
const regular = tiny * 3 // 15
const medium = tiny * 4
const large = regular * 2 // 30
export const MetricsSizes = {
  tiny,
  small,
  regular,
  medium,
  large,
}

export default {
  Colors,
  NavigationColors,
  FontSize,
  MetricsSizes,
}
