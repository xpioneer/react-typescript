
class DonePlugin {
  apply(compiler) {
    compiler.hooks.done.tap('DonePlugin', (stats) => {
      console.log('compilation completed...')
      // console.log(stats)
    })
  }
}

module.exports = DonePlugin