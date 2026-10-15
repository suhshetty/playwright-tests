import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 1,
  duration: '60s',
  summaryTrendStats: ['min', 'med', 'avg', 'p(90)', 'p(95)', 'p(99)', 'max'],
};

export default function () {
  if (__ITER % 10 === 0) {
    http.get('https://quickpizza.grafana.com/api/delay/8');
  } else {
    http.get('https://quickpizza.grafana.com/');
  }
  sleep(1);
}


