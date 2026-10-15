import http from 'k6/http';
import { sleep } from 'k6';

const THINK = __ENV.THINK ? parseFloat(__ENV.THINK) : 1;

export const options = {
  scenarios: {
    fixed_rate: {
      executor: 'constant-arrival-rate',
      rate: 5,
      timeUnit: '1s',
      duration: '30s',
      preAllocatedVUs: 5,
      maxVUs: 100,
    },
  },
};

export default function () {
  http.get('https://quickpizza.grafana.com/');
  sleep(THINK);
}
