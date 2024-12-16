export const VOICE_RECORDING_STATUS = {
  RECORDING: "RECORDING",
  PROCESSING: "PROCESSING",
  FINISHED: "FINISHED",
};

export const VOICE_RECORDING_STATUS_LABEL = {
  RECORDING: "Recording ...",
  PROCESSING: "Processing ...",
  FINISHED: null,
};

export const ERROR_CODE_RESPONSES = {
  ECONNABORTED: "Application is currently unavailable, please try again later!",
  ERR_NETWORK: "Network error, please check your connection and try again.",
};

export const CHUNKING_DONE_MESSAGE = "...thinking done...";

export const THINKING_MESSAGE = "Thinking...";

export const DKG_EXPLORER_URL =
  import.meta.env.VITE_DKG_ENVIRONMENT === "PRODUCTION"
    ? "https://dkg.origintrail.io"
    : "https://dkg-testnet.origintrail.io";

export const MAX_KAS_TO_SHOW = 3;

export function getErrorMessage(errorCode) {
  switch (errorCode) {
    case "ECONNABORTED":
      return ERROR_CODE_RESPONSES.ECONNABORTED;
    case "ERR_NETWORK":
      return ERROR_CODE_RESPONSES.ERR_NETWORK;
    default:
      return ERROR_CODE_RESPONSES.ECONNABORTED;
  }
}

export const KA_BANK_DATASETS_COLUMNS = [
  {
    name: "name",
    prop: "name",
    sortable: false,
    label: "File name",
    useSlot: true,
  },
  {
    name: "time",
    prop: "time",
    sortable: false,
    label: "Time created",
    useSlot: true,
  },
  {
    name: "status",
    prop: "status",
    sortable: false,
    label: "Status",
    useSlot: true,
  },
  {
    name: "num_files",
    prop: "num_files",
    sortable: false,
    label: "Staged files",
    useSlot: true,
  },
];

export const KA_BANK_DATASETS_TEST_DATA = [
  {
    name: "Dataset 1",
    time: "2024-08-15",
    status: "Dataset processed",
    num_files: 0,
  },
  {
    name: "Dataset 1",
    time: "2024-08-15",
    status: "Dataset processed",
    num_files: 0,
  },
  {
    name: "Dataset 1",
    time: "2024-08-15",
    status: "Dataset processed",
    num_files: 0,
  },
];

export const KA_BANK_STAGED_FILES_COLUMNS = [
  {
    name: "assetId",
    prop: "id",
    sortable: false,
    label: "ID",
    className: "asset-id-col trim-col",
    useSlot: true,
    minWidth: 175,
  },
];

export const THREE_RECOMMENDED_QUESTIONS = [
  "Who invented the printing press and where did it happen?",
  "How did the invention of the printing press impact society?",
  "Can you tell me more about one of the key figures related to the printing press, like William Caxton or Martin Luther?",
];

export const FIVE_RECOMMENDED_QUESTIONS = THREE_RECOMMENDED_QUESTIONS;

export const EDGE_NODE_API_ENDPOINT = "http://localhost:3002";
