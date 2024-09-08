
class DonePlugin {
  apply(compiler) {
    let startTime;
    compiler.hooks.compile.tap('DonePlugin', () => {
      startTime = Date.now();
      console.log('compilation started...', new Date(startTime).toISOString());
    });

    compiler.hooks.done.tap('DonePlugin', (stats) => {
      const duration = Date.now() - startTime
      console.log('compilation completed...', new Date().toISOString());
      console.log(`compilation took ${duration} ms.`);
    })
  }
}

module.exports = DonePlugin