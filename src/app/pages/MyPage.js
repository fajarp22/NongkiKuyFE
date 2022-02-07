import React from 'react';
import { useSubheader } from '../../_metronic/layout';

export const MyPage = () => {
  const suhbeader = useSubheader();
  suhbeader.setTitle('My Custom title');

  return <h1>My Page</h1>;
};
