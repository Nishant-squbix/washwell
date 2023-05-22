import axios from 'axios';
export const api = `https://shorts-uddv.onrender.com/api/v1/`;
export const apicaller = (uri, data = null, method, Token) => {
  console.log('data from apicaller', data);
  console.log('uri', `${api}/${uri}`);
  return new Promise((resolve, reject) => {
    var config = {
      method: method,
      url: `${api}/${uri}`,
      maxBodyLength: Infinity,
      headers: {
        Authorization: `Bearer ${Token}`,
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(response => {
        console.log('api caller respons', JSON.stringify(response.data));
        resolve(response);
      })
      .catch(error => {
        console.log('api caller error', error);
        reject(error);
      });
  });
};
