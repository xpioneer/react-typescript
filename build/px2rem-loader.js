const loaderUtils = require('loader-utils')

const pxReg = /\b(\d+(\.\d+)?)PX\b/g

module.exports = function(content) {

  const options = loaderUtils.getOptions(this)

  const config = Object.assign({}, {
    remRoot: 40,
    fixed: 4
  }, options)

  if(pxReg.test(content)) {
    return content.replace(pxReg, ($0, $1) => {
      let val = $1 / config.remRoot;
      val = parseFloat(val.toFixed(config.fixed));
      return val === 0 ? val : val + 'rem';
    })
  }

  return content
}