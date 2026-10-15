import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 1,
  duration: '30s',
  summaryTrendStats: ['min', 'med', 'avg', 'p(90)', 'p(95)', 'p(99)', 'max'],
};

export default function () {
  http.get('https://quickpizza.grafana.com/');
  sleep(1);

  http.get('https://quickpizza.grafana.com/api/quotes');
  sleep(1);

  http.get('https://quickpizza.grafana.com/api/names');
  sleep(1);
}
