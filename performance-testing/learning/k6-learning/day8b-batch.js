import http from 'k6/http';
import { check } from 'k6';

export const options = { vus: 1, duration: '20s' };

export default function () {
  const responses = http.batch([
    ['GET', 'https://quickpizza.grafana.com/'],
    ['GET', 'https://quickpizza.grafana.com/api/quotes'],
    ['GET', 'https://quickpizza.grafana.com/api/names'],
  ]);


  check(responses[0], {
  'homepage 200': (r) => r.status === 200,
});

  check(responses[1], {
  'quotes 200': (r) => r.status === 200,
});

  check(responses[2], {
  'names 200': (r) => r.status === 200,
});
}
