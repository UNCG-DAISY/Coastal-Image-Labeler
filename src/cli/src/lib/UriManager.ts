import Configstore from 'configstore'
const pkg = require('../../package.json')

class UriManager {
  conf: any
  constructor() {
    this.conf = new Configstore(pkg.name)
  }

  setKey(key: string) {
    this.conf.set('mongoUriKey', key)
    return key
  }

  getKey() {
    const key = this.conf.get('mongoUriKey')

    if (!key) {
      throw new Error('No mongoURI Found ')
    }

    return key
  }

  deleteKey() {
    const key = this.conf.get('mongoUriKey')

    if (!key) {
      throw new Error('No mongoURI Found ')
    }

    this.conf.delete('mongoUriKey')
    return
  }
}

export default UriManager
