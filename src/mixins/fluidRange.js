// @flow
import between from './between'

/**
 * Increment a provided number of steps up or down a provided scale (defaults to 'perfectFourth') from a provided base (defaults to 1em).
 * This establishes a consistent measurement and spacial relationship between elements.
 *
 * Also exports 'ratioNames' to use as a standalone module.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *    // Increment two steps up the default scale
 *   'fontSize': modularScale(2)
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *    // Increment two steps up the default scale
 *   fontSize: ${modularScale(2)}
 * `
 *
 * // CSS in JS Output
 * element {
 *   'fontSize': '1.77689em'
 * }
 */
function fluidRange(
  cssProp: Array<Object> | Object,
  minScreen: string,
  maxScreen: string,
): Object {
  if (
    (!Array.isArray(cssProp) && typeof cssProp !== 'object')
    || cssProp === null
  ) {
    throw new Error(
      'expects either an array of objects or a single object with the properties prop, fromSize, and toSize.',
    )
  }

  if (Array.isArray(cssProp)) {
    const mediaQueries = {}
    const fallbacks = {}
    for (const obj of cssProp) {
      if (!obj.prop || !obj.fromSize || !obj.toSize) {
        throw new Error(
          'expects the objects in the first argument array to have the properties `prop`, `fromSize`, and `toSize`.',
        )
      }

      fallbacks[obj.prop] = obj.fromSize
      mediaQueries[`@media (min-width: ${minScreen})`] = {
        ...mediaQueries[`@media (min-width: ${minScreen})`],
        [obj.prop]: between(obj.fromSize, obj.toSize, minScreen, maxScreen),
      }
      mediaQueries[`@media (min-width: ${maxScreen})`] = {
        ...mediaQueries[`@media (min-width: ${maxScreen})`],
        [obj.prop]: obj.toSize,
      }
    }

    return {
      ...fallbacks,
      ...mediaQueries,
    }
  } else {
    if (!cssProp.prop || !cssProp.fromSize || !cssProp.toSize) {
      throw new Error(
        'expects the first argument object to have the properties `prop`, `fromSize`, and `toSize`.',
      )
    }

    return {
      [cssProp.prop]: cssProp.fromSize,
      [`@media (min-width: ${minScreen})`]: {
        [cssProp.prop]: between(
          cssProp.fromSize,
          cssProp.toSize,
          minScreen,
          maxScreen,
        ),
      },
      [`@media (min-width: ${maxScreen})`]: {
        [cssProp.prop]: cssProp.toSize,
      },
    }
  }
}

export default fluidRange
