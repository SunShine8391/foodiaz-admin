import { BigQuery } from "@google-cloud/bigquery";

let config = {
  project_id: "",
  client_email: "",
  private_key: ""
}

try {
  config = JSON.parse(atob(process.env.BIGQUERY_ACCOUNT || ""));
} catch {}

export { config as bigQueryServiceAccount };

const bigquery = new BigQuery({
  projectId: config.project_id,
  credentials: {
    client_email: config.client_email,
    private_key: config.private_key,
  },
});

export default bigquery;
