import axios from 'axios';
import { getToken } from '../auth';

// const calcHost = (path) => `https://aag.secrettech.io${path}`;

// const config = async (path, method, sign, body) => ({
//   method,
//   body,
//   url: calcHost(path),

//   headers: {
//     'Authorization': sign && `Bearer ${await getToken()}`
//   }
// });

const post = async (path, body, sign = true) => {
  const token = await getToken();
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: `https://aag.secrettech.io${path}`,
      body,
      headers: {
        'Authorization': sign && `Bearer ${token}`
      }
    })
      .then(resolve)
      .catch(reject);
  })
}

// const post = async (path, body, sign = true) => {
//   console.log(config(path, 'post', sign, body));
//   return await axios(config(path, 'post', sign, body));
// };
// const get = (path, sign = true) => axios.get(config(path, 'get', sign));

export default {
  // get,
  post
};