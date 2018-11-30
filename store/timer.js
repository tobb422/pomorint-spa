import * as types from './mutation-types/timer'
import { AudioPlay } from '~/plugins/audio'

export const state = () => ({
  min: 0,
  sec: 5,
  timerOn: false,
  timerObj: null
})

export const getters = {
  timer: state => {
    const time2str = time => {
      const str = time.toString()
      if (str.length < 2) {
        return '0' + str
      }
      return str
    }
    return time2str(state.min) + ':' + time2str(state.sec)
  },
  timePer: state => {
    const total = 25 * 60
    const remain = total - (state.min * 60 + state.sec)
    return Math.floor((remain / total) * 100)
  }
}

export const actions = {
  count({ commit }) {
    commit(types.COUNT)
  },
  start({ commit }) {
    commit(types.START)
  },
  reset({ commit }) {
    commit(types.RESET)
  },
  complete() {
    AudioPlay()
    this.dispatch('timer/reset')
  }
}

export const mutations = {
  [types.COUNT](state) {
    if (state.sec <= 0 && state.min >= 1) {
      --state.min
      state.sec = 59
    } else if (state.sec <= 0 && state.min <= 0) {
      this.dispatch('timer/complete')
    } else {
      --state.sec
    }
  },
  [types.START](state) {
    state.timerObj = setInterval(_ => this.dispatch('timer/count'), 1000)
    state.timerOn = true
  },
  [types.RESET](state) {
    clearInterval(state.timerObj)
    state.timerOn = false
    state.min = 25
    state.sec = 0
  }
}
