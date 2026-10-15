import http from 'k6/http';

export const options = { vus: 1, duration: '20s' };

export default function () {
  http.get('https://quickpizza.grafana.com/');
  http.get('https://quickpizza.grafana.com/api/quotes');
  http.get('https://quickpizza.grafana.com/api/names');
}
