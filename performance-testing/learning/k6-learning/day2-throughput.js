import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: __ENV.MYVUS ? parseInt(__ENV.MYVUS) : 1,
  duration: '30s',
};

export default function () {
  http.get('https://quickpizza.grafana.com/');
  if (__ENV.NOSLEEP !== 'true') {
    sleep(1);
  }
}
