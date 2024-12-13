<template>
  <div class="dashboard-charts">
    <div class="chart">
      <div class="chart-header">
        <h3>Number of Knowledge Assets on the DKG</h3>
        <div class="value-container">
          <span class="icon-knowledge-asset"></span>
          <span style="color: #8b85f4" class="value">4 503 319</span>
        </div>
      </div>
      <canvas ref="knowledgeChart"></canvas>
    </div>
  </div>

  <div class="dashboard-charts">
    <div class="chart">
      <div class="chart-header">
        <h3>Total Network Revenue (in TRAC)</h3>
        <div class="value-container">
          <span class="icon-trac-token"></span>
          <span style="color: #1adedc" class="value">4 503 319</span>
        </div>
      </div>
      <canvas ref="revenueChart"></canvas>
    </div>
  </div>
</template>

<script>
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
);

export default {
  name: "DashboardCharts",
  mounted() {
    this.$nextTick(() => {
      if (this.$refs.knowledgeChart && this.$refs.revenueChart) {
        this.renderKnowledgeChart();
        this.renderRevenueChart();
      }
    });
  },
  methods: {
    renderKnowledgeChart() {
      const ctx = this.$refs.knowledgeChart.getContext("2d");
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, "rgba(106, 27, 154, 0.5)");
      gradient.addColorStop(1, "rgba(106, 27, 154, 0)");

      new Chart(ctx, {
        type: "line",
        data: {
          labels: [
            "31st Jan",
            "1st Feb",
            "2nd Feb",
            "3rd Feb",
            "4th Feb",
            "5th Feb",
            "6th Feb",
            "7th Feb",
            "8th Feb",
            "9th Feb",
            "10th Feb",
            "11th Feb",
            "12th Feb",
            "13th Feb",
            "14th Feb",
          ],
          datasets: [
            {
              label: "Knowledge Assets",
              data: [
                200, 200, 200, 300, 300, 300, 400, 400, 500, 600, 700, 800, 900,
                1000, 1200,
              ],
              borderColor: "#6a1b9a",
              backgroundColor: gradient,
              borderWidth: 2,
              fill: true,
              pointRadius: 0,
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: "#ffffff",
              },
              grid: {
                color: "rgba(255, 255, 255, 0.1)",
              },
            },
            x: {
              ticks: {
                color: "#ffffff",
              },
              grid: {
                display: false,
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
    },
    renderRevenueChart() {
      const ctx = this.$refs.revenueChart.getContext("2d");
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, "rgba(3, 218, 197, 0.5)");
      gradient.addColorStop(1, "rgba(3, 218, 197, 0)");

      new Chart(ctx, {
        type: "line",
        data: {
          labels: [
            "31st Jan",
            "1st Feb",
            "2nd Feb",
            "3rd Feb",
            "4th Feb",
            "5th Feb",
            "6th Feb",
            "7th Feb",
            "8th Feb",
            "9th Feb",
            "10th Feb",
            "11th Feb",
            "12th Feb",
            "13th Feb",
            "14th Feb",
          ],
          datasets: [
            {
              label: "Revenue",
              data: [
                100, 150, 200, 300, 400, 500, 700, 1000, 1500, 2000, 2500, 3000,
                3500, 4000, 4500,
              ],
              borderColor: "#03dac5",
              backgroundColor: gradient,
              borderWidth: 2,
              fill: true,
              pointRadius: 0,
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: "#ffffff",
              },
              grid: {
                color: "rgba(255, 255, 255, 0.1)",
              },
            },
            x: {
              ticks: {
                color: "#ffffff",
              },
              grid: {
                display: false,
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
    },
  },
};
</script>

<style scoped>
.dashboard-charts {
  width: 95%;
  background: radial-gradient(
    70% 100% at 20% 107.05%,
    #03061c 0%,
    #1b1b34 80% 
  );

  padding: 20px;
  border-radius: 10px;
  border: 1.5px solid #8b85f4;
}

.dashboard-charts:not(:first-child) {
  margin-top: 30px;
}

.chart-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: #ffffff;
  margin-bottom: 10px;
}

.chart-header h3 {
  font-size: 1.2em;
}

.value-container {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 1.5em;
  font-weight: bold;
}

.icon-knowledge-asset {
  margin-top: 4px;
  display: inline-block;
  width: 24px;
  height: 20px;
  background-image: url("/images/icons/knowledge-asset.svg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.icon-trac-token {
  margin-top: 4px;
  display: inline-block;
  width: 20px;
  height: 20px;
  background-image: url("/images/icons/trac-token-icon.svg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
