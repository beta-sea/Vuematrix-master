const styles = {
  'a-rate': '.a-rate{display: inline-block; vertical-align: text-top;}',
  'a-upload': '.a-upload__tip{line-height: 1.2;}'
}

function addCss (cssList, el) {
  const css = styles[el.__config__.tag]
  css && cssList.indexOf(css) === -1 && cssList.push(css)
  if (el.__config__.children) {
    el.__config__.children.forEach(el2 => addCss(cssList, el2))
  }
}

export function makeUpCss (conf) {
  const cssList = []
  conf.fields.forEach(el => addCss(cssList, el))
  return cssList.join('\n')
}
