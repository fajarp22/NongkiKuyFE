import React, { useMemo } from 'react';
import objectPath from 'object-path';
import { useHtmlClassService } from '../../layout';
import { Card } from 'react-bootstrap';
import { Demo1Dashboard } from './Demo1Dashboard';
import { Demo2Dashboard } from './Demo2Dashboard';
import { Demo3Dashboard } from './Demo3Dashboard';
import { Demo4Dashboard } from './Demo4Dashboard';
import { Demo5Dashboard } from './Demo5Dashboard';
import { Demo6Dashboard } from './Demo6Dashboard';
import { Demo7Dashboard } from './Demo7Dashboard';

export function Dashboard() {
  const uiService = useHtmlClassService();
  const layoutProps = useMemo(() => {
    return {
      demo: objectPath.get(uiService.config, 'demo')
    };
  }, [uiService]);
  return (
    // https://docs.google.com/spreadsheets/d/e/2PACX-1vS8xnGjZHPKpD4vD1KmKwy0nu869LybNjAL-sUJCDiyGXALnk44b_lLER4MnBvLHr5xtLxLnz3KTFRw/pubhtml?widget=true&amp;headers=false

    <>
    {/* <h4>Ini nanti Dashboard</h4> */}
      {/* <iframe
        title="FULL REKAP LH RGJB (new1)"
        style={{ width: '100%', height: '30%' }}
        src="https://docs.google.com/document/d/e/2PACX-1vTJdriV1cyvTSab-VKb_HwjUZHt7I6CQ7sc0gr0mqGA39vCbsfJTUmWSS3vYyfcaoRcYyyRmYHstmKs/pub?embedded=true"></iframe> */}

      {/* <iframe
        title="Dashboard News"
        style={{ width: '100%', height: '100%', border: 'none' }}
        src="https://docs.google.com/document/d/e/2PACX-1vTJdriV1cyvTSab-VKb_HwjUZHt7I6CQ7sc0gr0mqGA39vCbsfJTUmWSS3vYyfcaoRcYyyRmYHstmKs/pub?embedded=true"></iframe> */}
      <iframe
        title="Dashboard News"
        style={{ width: '100%', height: '100%', border: 'none' }}
        src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSKGRm3ekM97HrCiwC7vEF3UqbdfOdUElxBr7_B-_8WmMvru3qMV9Nij_Yk_isZHikbA5P1dEg2Lqb3/pubhtml?widget=true"></iframe>
      {/* {layoutProps.demo === 'demo1' && <Demo1Dashboard />} */}
      {layoutProps.demo === "demo2" && <Demo2Dashboard />}
      {layoutProps.demo === "demo3" && <Demo3Dashboard />}
      {layoutProps.demo === "demo4" && <Demo4Dashboard />}
      {layoutProps.demo === "demo5" && <Demo5Dashboard />}
      {layoutProps.demo === "demo6" && <Demo6Dashboard />}
      {layoutProps.demo === "demo7" && <Demo7Dashboard />}
    </>
  );
}
