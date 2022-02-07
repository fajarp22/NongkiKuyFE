//  

import React from 'react';
import { CustomerStatusCssClasses, CustomerStatusTitles } from '../../CustomersUIHelpers';

export function StatusColumnFormatter(cellContent, row) {
  const getLabelCssClasses = () => {
    return `label label-lg label-light-${CustomerStatusCssClasses[row.status]} label-inline`;
  };
  return <span className={getLabelCssClasses()}>{CustomerStatusTitles[row.status]}</span>;
}
