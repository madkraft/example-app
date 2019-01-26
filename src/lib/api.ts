import { IArticle } from './../models/Article';
import { airtableConfig } from './../config';

const BASE_URL = `https://api.airtable.com/v0/${airtableConfig.base}/Articles`;

const METHOD = {
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
export const fetchRecords = () => {
  return fetch(BASE_URL, createConfig())
    .then(resp => resp.json())
    .then(({ records }) => {
      return records;
    });
};

export const addNewSubmition = ({ title, url, tags }: IArticle) => {
  const fields: Partial<IArticle> = { tags, title, url };

  return fetch(BASE_URL, createConfig(METHOD.POST, fields));
};

export const updateFavouriteStatus = (id: string, starred: boolean) => {
  const fields: Partial<IArticle> = { starred };
  const url = `${BASE_URL}/${id}`;

  return fetch(url, createConfig(METHOD.PATCH, fields));
};
