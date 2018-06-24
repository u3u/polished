// @flow

import parseToHsl from './parseToHsl'
import toColorString from './toColorString'
import curry from '../internalHelpers/_curry'

/**
 * Adjusts the hue of the provided color by rotating the color wheel by the provided degree.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: adjustHue(180, '#448'),
 *   background: adjustHue('180', 'rgba(101,100,205,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${adjustHue(180, '#448')};
 *   background: ${adjustHue('180', 'rgba(101,100,205,0.7)')};
 * `
 *
 * // CSS in JS Output
 * element {
 *   background: "#888844";
 *   background: "rgba(136,136,68,0.7)";
 * }
 */
function adjustHue(degree: number | string, color: string): string {
  const hslColor = parseToHsl(color)
  return toColorString({
    ...hslColor,
    hue: (hslColor.hue + parseFloat(degree)) % 360,
  })
}

const curriedAdjustHue = curry(adjustHue)
export default curriedAdjustHue
