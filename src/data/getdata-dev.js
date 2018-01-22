import axios from 'axios';

const baseUrl = '/api/v1';

export const seller = () => axios.get(
  `${baseUrl}/seller`
).then(
  (response) => response.data
);

export const goods = () => axios.get(
  `${baseUrl}/goods`
).then(
  (response) => response.data
);

export const ratings = () => axios.get(
  `${baseUrl}/ratings`
).then(
  (response) => response.data
);
