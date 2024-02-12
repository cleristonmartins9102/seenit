
/**
 * Function for set styles
 * @param element
 * @param style
 */
export const setCss = (element: any, style): void => {
  for (const property in style) { element.style[property] = style[property] }
}
