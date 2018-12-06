<script>
import { Line } from 'vue-chartjs'

export default {
  name: 'LineCharts',
  extends: Line,
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
          backgroundColor: '#87CEFA',
          data: this.data
        }
      ]
    })
  }
}
</script>
