// 👉🏻 https://linktr.ee/rifqiahmad.f

import qs from 'querystring';
import { isEmpty } from 'lodash';

export default function formatGetURL(url, content) {
  return `${url.format()}${content && !isEmpty(content) ? `?${qs.stringify(content)}` : ''}`;
}
