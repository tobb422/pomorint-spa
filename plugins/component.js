import Vue from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ja'

dayjs.locale('ja')
dayjs.extend(relativeTime)

Vue.prototype.$dayjs = dayjs
