import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  scenarios: {
    steady_load: {
      executor: 'constant-arrival-rate',
      rate: 5,
      timeUnit: '1s',
      duration: '30s',
      preAllocatedVUs: 10,
      maxVUs: 50,
    },
  },
};

export default function () {
  if (__ITER % 10 === 0) {
    http.get('https://quickpizza.grafana.com/api/delay/8');
  } else {
    http.get('https://quickpizza.grafana.com/');
  }
  sleep(1);
}
