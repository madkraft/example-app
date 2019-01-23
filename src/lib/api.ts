import { airtableConfig } from './../config';

const BASE_URL = `https://api.airtable.com/v0/${airtableConfig.base}/Articles`;

export const fetchRecords = () => {
  const config = {
    headers: new Headers({ Authorization: `Bearer ${airtableConfig.apiKey}` }),
  };

  return fetch(BASE_URL, config)
    .then(resp => resp.json())
    .then(({ records }) => {
      return records;
    });
};

export const addNewSubmition = () => {
  const data = {
    fields: {
      tags: ['video'],
      title: 'Test',
      url: 'test url',
    },
  };

  const config = {
    body: JSON.stringify(data),
    headers: new Headers({
      Authorization: `Bearer ${airtableConfig.apiKey}`,
      'Content-Type': 'application/json',
    }),
    method: 'POST',
  };

  return fetch(BASE_URL, config);
};
