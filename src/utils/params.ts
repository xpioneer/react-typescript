
class Params {
  constructor () {}

  public format (data: any) {
    const arr = [];
    for (const i in data) {
      if (data[i] !== undefined && data[i] !== '' && data[i] !== null) {
        const s = encodeURIComponent(i) + '=' + encodeURIComponent(data[i]);
        arr.push(s);
      }
    }
    arr.push('_=' + Date.now());
    return arr.join('&');
  }

  public fmtGet (data: any) {
    const arr: any = [];
    let n: number = 0;
    if (data !== null && typeof data === 'object') {
      for (const i in data) {
        if (data[i] !== undefined && data[i] !== '' && data[i] !== null) {
          const s = encodeURIComponent(i) + '=' + encodeURIComponent(data[i]);
          arr.push(s);
        }
      }
    }
    arr.push('_=' + Date.now());
    return arr.join('&');
  }
}

export const serialize = new Params