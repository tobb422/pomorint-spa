import * as types from './mutation-types/timer'
import { AudioPlay } from '~/plugins/audio'

const DefaultMin = 0
const DefaultSec = 3

export const state = () => ({
  min: DefaultMin,
  sec: DefaultSec,
  timerOn: false,
  timerObj: null
})

export const getters = {
  timer: state => {
    const time2str = time => {
      const str = time.toString()
      return str.length < 2 ? '0' + str : str
    }
    return time2str(state.min) + ':' + time2str(state.sec)
  },
  timePer: state => {
    const total = DefaultMin * 60 + DefaultSec
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
    this.dispatch('pomodoro/completeTask')
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
    state.min = DefaultMin
    state.sec = DefaultSec
  }
}
