// @flow

import parseToHsl from './parseToHsl'
import toColorString from './toColorString'
import guard from '../internalHelpers/_guard'
import curry from '../internalHelpers/_curry'

/**
 * Intensifies the provided color by increasing its saturation by the provided amount (between 0 and 1).
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: saturate(0.2, '#CCCD64'),
 *   background: saturate('0.2', 'rgba(204,205,100,0.7)'),
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${saturate(0.2, '#FFCD64')};
 *   background: ${saturate('0.2', 'rgba(204,205,100,0.7)')};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#e0e250";
 *   background: "rgba(224,226,80,0.7)";
 * }
 */
function saturate(amount: number | string, color: string): string {
  const hslColor = parseToHsl(color)
  return toColorString({
    ...hslColor,
    saturation: guard(0, 1, hslColor.saturation + parseFloat(amount)),
  })
}

const curriedSaturate = curry(saturate)
export default curriedSaturate
