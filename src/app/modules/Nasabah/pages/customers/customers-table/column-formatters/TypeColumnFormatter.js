// contact me @ https://linktr.ee/rifqiahmad.f

import React from 'react';
import { CustomerTypeCssClasses, CustomerTypeTitles } from '../../CustomersUIHelpers';

export function TypeColumnFormatter(cellContent, row) {
  return (
    <>
      <span className={`label label-dot label-${CustomerTypeCssClasses[row.type]} mr-2`}></span>
      &nbsp;
      <span className={`font-bold font-${CustomerTypeCssClasses[row.type]}`}>
        {CustomerTypeTitles[row.type]}
      </span>
    </>
  );
}
