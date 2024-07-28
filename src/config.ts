import config from './../worps.json'

export default function loadConf() {
  return {
    service: config.service,
  }
}
