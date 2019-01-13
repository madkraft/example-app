import { SubmitForm, Article } from '../models';
import { sheetsConfig } from '../config';

export const addGapiScript = (
  updateSignInStatus: (isSignedIn: boolean) => void,
) => {
  const s = document.createElement('script');
  s.src = 'https://apis.google.com/js/api.js';
  s.onload = () => {
    handleClientLoad(updateSignInStatus);
  };
  s.async = true;
  s.defer = true;
  document.body.appendChild(s);
};

const handleClientLoad = (
  updateSignInStatus: (isSignedIn: boolean) => void,
) => {
  window.gapi.load('client:auth2', () => {
    window.gapi.client
      .init({
        apiKey: process.env.REACT_APP_API_KEY,
        clientId: process.env.REACT_APP_CLIENT_ID,
        discoveryDocs: [
          'https://sheets.googleapis.com/$discovery/rest?version=v4',
        ],
        scope: 'https://www.googleapis.com/auth/spreadsheets',
      })
      .then(() => {
        window.gapi.auth2
          .getAuthInstance()
          .isSignedIn.listen(updateSignInStatus);
        updateSignInStatus(
          window.gapi.auth2.getAuthInstance().isSignedIn.get(),
        );
      });
  });
};

export function fetchValues(
  onFetchSuccess: (articles: Article[]) => void,
  onFetchError: () => void,
) {
  window.gapi.client.load('sheets', 'v4', () => {
    window.gapi.client.sheets.spreadsheets.values
      .get({
        range: sheetsConfig.range,
        spreadsheetId: sheetsConfig.spreadsheetId,
      })
      .then(
        (response: any) => {
          const [, ...values] = response.result.values;
          const articles: Article[] = values.map((article: string[]) => {
            const [id, title, url, tagsRaw] = article;
            const tags = tagsRaw ? tagsRaw.split(',') : null;

            return { id, title, url, tags };
          });

          onFetchSuccess(articles);
        },
        () => onFetchError(),
      );
  });
}

export const addNewSubmition = (
  submitForm: SubmitForm,
  onSubmitSuccess: () => void,
) => {
  const id = new Date().getTime().toString();
  const { title, url } = submitForm;
  const params = {
    range: sheetsConfig.range,
    spreadsheetId: sheetsConfig.spreadsheetId,
    valueInputOption: 'RAW',
  };

  const valueRangeBody = {
    values: [[id, title, url]],
  };

  const request = window.gapi.client.sheets.spreadsheets.values.append(
    params,
    valueRangeBody,
  );

  request.then(
    () => {
      onSubmitSuccess();
    },
    (reason: any) => {
      console.error(`error: ${reason.result.error.message}`);
    },
  );
};
