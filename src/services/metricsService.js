import axios from "axios";

const endpoint = import.meta.env.VITE_METRICS_HUB_ENDPOINT;

export async function getNumberOfKnowledgeAssets(
  historic = false,
  options = {},
) {
  const response = await axios.get(
    `${endpoint}/kpi/total-number-of-kas/${historic ? "historic" : "value"}`,
    {
      params: {
        timeInterval: options.interval,
      },
    },
  );

  return response.data;
}

export async function getTotalTracStaked(historic = false, options = {}) {
  const response = await axios.get(
    `${endpoint}/kpi/total-trac-staked/${historic ? "historic" : "value"}`,
    {
      params: {
        timeInterval: options.interval,
      },
    },
  );

  return response.data;
}

export async function getTotalNetworkRevenue(historic = false, options = {}) {
  const response = await axios.get(
    `${endpoint}/kpi/total-network-revenue/${historic ? "historic" : "value"}`,
    {
      params: {
        timeInterval: options.interval,
      },
    },
  );

  return response.data;
}
