import { IArticle } from './../models/Article';
import { airtableConfig } from './../config';

const BASE_URL = `https://api.airtable.com/v0/${airtableConfig.base}/Articles`;
export type SortDirection = 'desc' | 'asc';
export type SortFields = 'createdTime' | 'starred';

const METHOD = {
  DELETE: 'DELETE',
  PATCH: 'PATCH',
  POST: 'POST',
};

const createConfig = (method?: string, fields?: Partial<IArticle>) => {
  if (method) {
    return {
      body: JSON.stringify({ fields }),
      headers: new Headers({
        Authorization: `Bearer ${airtableConfig.apiKey}`,
        'Content-Type': 'application/json',
      }),
      method,
    };
  }

  return {
    headers: new Headers({ Authorization: `Bearer ${airtableConfig.apiKey}` }),
  };
};

// type
export const fetchRecords = (sortField: SortFields = 'createdTime') => {
  const field = sortBy(sortField);
  const direction = sortDirection('desc');
  const sort = `${field}&${direction}`;

  return fetch(`${BASE_URL}?${sort}`, createConfig())
    .then(resp => resp.json())
    .then(({ records }) => {
      return records;
    });
};

const sortBy = (field: string) => {
  return `${encodeURIComponent('sort[0][field]')}=${field}`;
};

const sortDirection = (direction: SortDirection) => {
  return `${encodeURIComponent('sort[0][direction]')}=${direction}`;
};

export const addNewSubmition = ({ title, url, tags }: Partial<IArticle>) => {
  const fields: Partial<IArticle> = { tags, title, url };

  return fetch(BASE_URL, createConfig(METHOD.POST, fields));
};

export const updateFavouriteStatus = (id: string, starred: boolean) => {
  const fields: Partial<IArticle> = { starred };
  const url = `${BASE_URL}/${id}`;

  return fetch(url, createConfig(METHOD.PATCH, fields));
};

export const deleteRecord = (id: string) => {
  const url = `${BASE_URL}/${id}`;

  return fetch(url, createConfig(METHOD.DELETE));
};
