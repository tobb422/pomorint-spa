<script>
import { Bar } from 'vue-chartjs'

export default {
  name: 'BarCharts',
  extends: Bar,
  props: {
    label: {
      type: String,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    labels: {
      type: Array,
      required: true
    }
  },
  mounted() {
    this.renderChart({
      labels: this.labels,
      datasets: [
        {
          label: this.label,
          backgroundColor: '#F66322',
          data: this.data
        }
      ]
    })
  }
}
</script>
