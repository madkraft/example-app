export const sheetsConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  clientId: process.env.REACT_APP_CLIENT_ID,
  discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
  range: 'Sheet1',
  scope: 'https://www.googleapis.com/auth/spreadsheets',
  script: 'https://apis.google.com/js/api.js',
  spreadsheetId: '1_CgPF5ax_x1NrODpOx9-vtGSIPPH03tTtfCMTTscX1w',
};
