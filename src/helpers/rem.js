// @flow

import pixelsto from '../internalHelpers/_pxto'

/**
 * Convert a given pixel value to rems. The default base value is 16px, but can be modified to a provided base.
 * @function
 * @param {string|number} pxval
 * @param {string|number} [base='16px']
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   'height': rem('16px')
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   height: ${rem('16px')}
 * `
 *
 * // CSS in JS Output
 *
 * element {
 *   'height': '1rem'
 * }
 */

const rem: (
  value: string | number,
  base?: string | number,
) => string = pixelsto('rem')
export default rem
