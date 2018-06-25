// @flow
import capitalizeString from '../internalHelpers/_capitalizeString'

const positionMap = ['Top', 'Right', 'Bottom', 'Left']

function generateProperty(property: string, position: string) {
  if (!property) return position.toLowerCase()
  const splitProperty = property.split('-')
  if (splitProperty.length > 1) {
    splitProperty.splice(1, 0, position)
    return splitProperty.reduce((acc, val) => `${acc}${capitalizeString(val)}`)
  }
  const joinedProperty = property.replace(/([a-z])([A-Z])/g, `$1${position}$2`)
  return property === joinedProperty ? `${property}${position}` : joinedProperty
}

function generateStyles(
  property: string,
  valuesWithDefaults: Array<?string | ?number>,
) {
  const styles = {}
  for (let i = 0; i < valuesWithDefaults.length; i += 1) {
    if (valuesWithDefaults[i] || valuesWithDefaults[i] === 0) {
      styles[generateProperty(property, positionMap[i])] = valuesWithDefaults[i]
    }
  }
  return styles
}

/**
 * Enables shorthand for directional based properties. Accepts a property and up to four values that map to 'top', 'right', 'bottom', and 'left', respectively.
 * You can pass a null property to get only the directional values.
 * You can pass a null value for a direction to skip it.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...directionalProperty('padding', 0, '24px', '36px', '48px')
 *   ...directionalProperty('padding', 0, '24px', '36px', undefined)
 *   ...directionalProperty(undefined, 0, '24px', '36px', '48px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${directionalProperty('padding', 0, '24px', '36px', '48px')}
 *   ${directionalProperty('padding', 0, '24px', '36px', undefined)}
 *   ${directionalProperty(undefined, 0, '24px', '36px', '48px')}
 * `
 *
 * // CSS as JS Output
 *
 * div {
 *   'paddingTop': 0,
 *   'paddingRight': '24px',
 *   'paddingBottom': '36px',
 *   'paddingLeft': '48px'
 * }
 *
 * div {
 *   'paddingTop': 0,
 *   'paddingRight': '24px',
 *   'paddingBottom': '36px',
 * }
 *
 * div {
 *   'top': 0,
 *   'right': '24px',
 *   'bottom': '36px',
 *   'left': '48px'
 * }
 */

function directionalProperty(
  property: string,
  ...values: Array<?string | ?number>
): Object {
  //  prettier-ignore
  const [firstValue, secondValue = firstValue, thirdValue = firstValue, fourthValue = secondValue] = values
  const valuesWithDefaults = [firstValue, secondValue, thirdValue, fourthValue]
  return generateStyles(property, valuesWithDefaults)
}

export default directionalProperty
