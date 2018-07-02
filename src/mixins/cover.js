// @flow

/**
 * CSS to fully cover an area that can be optionally provided an offset to determine the padding around the coverage area.
 *
 * @example
 * // Styles as object usage
 * const styles = {
 *   ...cover()
 * }
 *
 * // styled-components usage
 * const div = styled.div`
 *   ${cover()}
 * `
 *
 * // CSS as JS Output
 *
 * div: {
 *   'position': 'absolute',
 *   'top': '0',
 *   'right: '0',
 *   'bottom': '0',
 *   'left: '0'
 * }
 */
function cover(offset?: number | string = 0): Object {
  return {
    position: 'absolute',
    top: offset,
    right: offset,
    bottom: offset,
    left: offset,
  }
}

export default cover
