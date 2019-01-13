import { SubmitForm, Article } from "../models";
import { sheetsConfig } from "../config";

const handleClientLoad = (updateSignInStatus: (isSignedIn: boolean) => void) => {
  window.gapi.load('client:auth2', () => {
    window.gapi.client.init({
      apiKey: sheetsConfig.apiKey,
      clientId: sheetsConfig.clientId,
      scope: 'https://www.googleapis.com/auth/spreadsheets',
      discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(() => {
      window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
      updateSignInStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
    });
  });
}

export const addGapiScript = (updateSignInStatus: (isSignedIn: boolean) => void) => {
  const s = document.createElement('script');
  s.src = "https://apis.google.com/js/api.js";
  s.onload = () => {
    handleClientLoad(updateSignInStatus)
  };
  s.async = true;
  s.defer = true;
  document.body.appendChild(s);
}

export const addNewSubmition = (submitForm: SubmitForm, onSubmitSuccess: () => void) => {
  const id = new Date().getTime().toString();
  const {title, url} = submitForm;
  const params = {
    spreadsheetId: '1_CgPF5ax_x1NrODpOx9-vtGSIPPH03tTtfCMTTscX1w',
    range: 'Sheet1',
    valueInputOption: 'RAW'
  };

  const valueRangeBody = {
    values: [
      [id, title, url]
    ]
  };

  const request = window.gapi.client.sheets.spreadsheets.values.append(params, valueRangeBody);

  request.then((response: any) => {
    onSubmitSuccess();
  }, (reason: any) => {
    console.error('error: ' + reason.result.error.message);
  });
}
