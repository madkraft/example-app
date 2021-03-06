// import { IArticle } from './../models/Article';
// import { airtableConfig } from './../config';

// const BASE_URL = `https://api.airtable.com/v0/${airtableConfig.base}/Articles`;
export type SortDirection = 'desc' | 'asc';

// const METHOD = {
//   DELETE: 'DELETE',
//   PATCH: 'PATCH',
//   POST: 'POST',
// };

// const createConfig = (method?: string, fields?: Partial<IArticle>) => {
//   if (method) {
//     return {
//       body: JSON.stringify({ fields }),
//       headers: new Headers({
//         Authorization: `Bearer ${airtableConfig.apiKey}`,
//         'Content-Type': 'application/json',
//       }),
//       method,
//     };
//   }

//   return {
//     headers: new Headers({ Authorization: `Bearer ${airtableConfig.apiKey}` }),
//   };
// };

// export const addNewSubmition = ({ title, url, tags }: Partial<IArticle>) => {
//   const fields: Partial<IArticle> = { tags, title, url };

//   return fetch(BASE_URL, createConfig(METHOD.POST, fields));
// };

// export const updateFavouriteStatus = (id: string, starred: boolean) => {
//   const fields: Partial<IArticle> = { starred };
//   const url = `${BASE_URL}/${id}`;

//   return fetch(url, createConfig(METHOD.PATCH, fields));
// };

// export const deleteRecord = (id: string) => {
//   const url = `${BASE_URL}/${id}`;

//   return fetch(url, createConfig(METHOD.DELETE));
// };
