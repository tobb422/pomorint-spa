/* eslint no-console: 0, no-undef: 0 */
const isProduction = () => process.env.APP_ENV === 'production'
const isStaging = () => process.env.APP_ENV === 'staging'

export default class Logger {
  static log() {
    if (isProduction() || isStaging()) return
    console.log.apply(console, arguments)
  }
  static error() {
    if (isProduction() || isStaging()) return
    console.error.apply(console, arguments)
  }
}
