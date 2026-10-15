import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 1,
  duration: '20s',
  thresholds: {
    'http_req_duration': [
      { threshold: 'p(95)<100', abortOnFail: true, delayAbortEval: '5s' },
    ],
  },

};

export default function () {
  const res = http.get('https://quickpizza.grafana.com/');

  check(res, {
    'status is 200':        (r) => r.status === 200,
    'body contains Pizza':  (r) => r.body.includes('Pizza'),
    'faster than 500ms':    (r) => r.timings.duration < 500,
    'body contains Burger': (r) => r.body.includes('Burger'),
  });

  sleep(1);
}
