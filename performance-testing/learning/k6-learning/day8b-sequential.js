import { check } from 'k6';
import http from 'k6/http';

export const options = { vus: 1, duration: '20s' };

export default function () {
 http.batch([
    ['GET', 'https://quickpizza.grafana.com/'],
    ['GET', 'https://quickpizza.grafana.com/api/quotes'],
    ['GET', 'https://quickpizza.grafana.com/api/names'],
 ])
}


