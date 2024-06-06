import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { serviceAccount } from '@/config';

const analytics = new BetaAnalyticsDataClient({
  credentials: {
    client_email: serviceAccount.clientEmail,
    private_key: serviceAccount.privateKey,
  },
  projectId: serviceAccount.projectId
});

export default analytics;
