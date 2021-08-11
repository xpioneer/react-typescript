
class DonePlugin {
  apply(compiler) {
    compiler.hooks.done.tap('DonePlugin', (stats) => {
      console.log('编译完成....')
      // console.log(stats)
    })
  }
}

module.exports = DonePlugin