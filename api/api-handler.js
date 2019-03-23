import Logger from '~/plugins/logger'

export const successHandler = (result, success) => {
  Logger.log(result)
  return success(result)
}

export const errorHandler = (e, error) => {
  Logger.error(e)
  return error(e)
}
