// 👉🏻 https://linktr.ee/rifqiahmad.f

import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

const tools = {
  decode: str =>
    str.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec)).replace(/&amp;/g, '&'),

  rmThousandSeparator: str => str.toString().replace(/\./g, ''),

  thousandSeparator: str => str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'),

  decodeEntities: encodedString => {
    if (canUseDOM) {
      const textArea = document.createElement('textarea');

      textArea.innerHTML = encodedString;

      return textArea.value;
    } else {
      return '';
    }
  }
};

export default tools;
