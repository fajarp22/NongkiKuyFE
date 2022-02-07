//  

import { HOSTNAME, APIHOSTNAME } from './constants';
import URL from './url';
import safeRequest from './safeRequest';
import formatGetUrl from './url';
import { sessionService } from 'redux-react-session';

class myAPI {
  get = (api, queries = {}, additionalOptions = {}) => {
    return sessionService.loadSession().then(res => {
      const url = `${APIHOSTNAME}${api}`;
      const endpoint = formatGetUrl(URL.parse(url), queries);
      const opts = {
        method: 'GET',
        ...additionalOptions,
        headers: {
          Accept: '*/*',
          Authorization: `Bearer ${res.access_token || ''}`,
          'Content-Type': 'application/json',
          Origin: HOSTNAME,
          ...additionalOptions.headers
        }
      };
      return safeRequest(endpoint, opts);
    });
  };

  post = (api, content, additionalOptions = {}) => {
    return sessionService.loadSession().then(res => {
      const url = `${APIHOSTNAME}${api}`;
      const endpoint = URL.parse(url).format();
      const opts = {
        method: 'POST',
        ...additionalOptions,
        headers: {
          Accept: '*/*',
          Authorization: `Bearer ${res.access_token || ''}`,
          'Content-Type': 'application/json',
          Origin: HOSTNAME,
          ...additionalOptions.headers
        },
        body: JSON.stringify(content)
      };

      return safeRequest(endpoint, opts);
    });
  };

  postResText = (api, content, additionalOptions = {}) => {
    return sessionService.loadSession().then(res => {
      const url = `${APIHOSTNAME}${api}`;
      const endpoint = URL.parse(url).format();
      const opts = {
        method: 'POST',
        ...additionalOptions,
        headers: {
          Accept: '*/*',
          Authorization: `Bearer ${res.access_token || ''}`,
          'Content-Type': 'application/json',
          Origin: HOSTNAME,
          ...additionalOptions.headers
        },
        body: JSON.stringify(content)
      };

      return fetch(`${endpoint}`, opts)
        .then(res => {
          return res.text();
        })
        .catch(err => {
          return {
            error: err
          };
        });
    });
  };

  postForm = (api, content) => {
    return sessionService.loadSession().then(res => {
      const url = `${APIHOSTNAME}${api}`;
      const endpoint = URL.parse(url).format();
      const opts = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${res.access_token || ''}`,
          Origin: HOSTNAME
        },
        body: content
      };

      return safeRequest(endpoint, opts);
    });
  };

  put = (api, content, additionalOptions = {}) => {
    return sessionService.loadSession().then(res => {
      const url = `${APIHOSTNAME}${api}`;
      const endpoint = URL.parse(url).format();
      const opts = {
        method: 'PUT',
        ...additionalOptions,
        headers: {
          Accept: '*/*',
          Authorization: `Bearer ${res.access_token || ''}`,
          'Content-Type': 'application/json',
          Origin: HOSTNAME,
          ...additionalOptions.headers
        },
        body: JSON.stringify(content)
      };

      return safeRequest(endpoint, opts);
    });
  };

  delete = (api, queries = {}, additionalOptions = {}) => {
    return sessionService.loadSession().then(res => {
      const url = `${APIHOSTNAME}${api}`;
      const endpoint = formatGetUrl(URL.parse(url), queries);
      const opts = {
        method: 'DELETE',
        ...additionalOptions,
        headers: {
          Accept: '*/*',
          Authorization: `Bearer ${res.access_token || ''}`,
          'Content-Type': 'application/json',
          Origin: HOSTNAME,
          ...additionalOptions.headers
        }
      };

      return safeRequest(endpoint, opts);
    });
  };
}

export default myAPI;
