<template>
    <div class="dashboard-charts">
      <div class="chart">
        <div class="chart-header">
          <h3>Number of Knowledge Assets on the DKG</h3>
          <span class="value">4 503 319</span>
        </div>
        <canvas ref="knowledgeChart"></canvas>
      </div>
      <div class="chart">
        <div class="chart-header">
          <h3>Total Network Revenue (in TRAC)</h3>
          <span class="value">4 503 319</span>
        </div>
        <canvas ref="revenueChart"></canvas>
      </div>
    </div>
  </template>
  
  <script>
  import { Chart } from "chart.js";
  
  export default {
    name: "DashboardCharts",
    mounted() {
      this.$nextTick(() => {
        console.log("DOM fully rendered. Now rendering charts...");
        this.renderKnowledgeChart();
        this.renderRevenueChart();
      });
    },
    methods: {
      renderKnowledgeChart() {
        const ctx = this.$refs.knowledgeChart.getContext("2d");
        console.log("Rendering Knowledge Assets chart...");
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
                data: [200, 200, 200, 300, 300, 300, 400, 400, 500, 600, 700, 800, 900, 1000, 1200],
                borderColor: "#6a1b9a",
                backgroundColor: "rgba(106, 27, 154, 0.2)",
                borderWidth: 2,
                fill: true,
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
                  color: "rgba(255, 255, 255, 0.1)",
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
        console.log("Rendering Revenue chart...");
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
                data: [100, 150, 200, 300, 400, 500, 700, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500],
                borderColor: "#03dac5",
                backgroundColor: "rgba(3, 218, 197, 0.2)",
                borderWidth: 2,
                fill: true,
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
                  color: "rgba(255, 255, 255, 0.1)",
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
    display: flex;
    flex-direction: column;
    gap: 20px;
    background-color: #1b1b34;
    padding: 20px;
    border-radius: 10px;
  }
  
  .chart {
    background-color: #232342;
    padding: 20px;
    border-radius: 10px;
  }
  
  .chart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    color: #ffffff;
  }
  
  .chart-header h3 {
    font-size: 1.2rem;
    font-weight: 500;
  }
  
  .chart-header .value {
    font-size: 1.5rem;
    font-weight: bold;
    color: #4caf50;
  }
  
  canvas {
    width: 100% !important;
    height: 300px !important;
  }
  </style>
  