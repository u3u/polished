// @flow

import mix from './mix'
import curry from '../internalHelpers/_curry'

/**
 * Tint the provided color by the provided percentage by mixing it with white.
 *
 * `tint` can produce hue shifts, where as `lighten` manipulates the luminance channel and thereforevdoesn't produce hue shifts.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   background: tint(0.25, '#00f')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   background: ${tint(0.25, '#00f')};
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   background: "#bfbfff";
 * }
 */

function tint(percentage: number | string, color: string): string {
  return mix(parseFloat(percentage), color, 'rgb(255, 255, 255)')
}

const curriedTint = curry(tint)
export default curriedTint
