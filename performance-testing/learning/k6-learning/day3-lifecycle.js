import http from 'k6/http';
import { sleep } from 'k6';

console.log('>>> INIT');

export const options = {
  vus: 2,
  duration: '10s',
};

export function setup() {
  console.log('>>> SETUP');
  return { token: 'fake-token-123' };
}

export default function (data) {
  console.log(`>>> VU ${__VU} iteration ${__ITER} token=${data.token}`);
  http.get('https://quickpizza.grafana.com/');
  sleep(1);
}

export function teardown(data) {
  console.log(`>>> TEARDOWN (token was ${data.token})`);
}
