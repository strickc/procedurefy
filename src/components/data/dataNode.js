import React from 'react';
import HotTable from 'react-handsontable';
import { Button } from 'semantic-ui-react';

const defaultData = [
  { name: 'Name', units: '', value: 'Procedurefy' },
  { name: 'Rig', units: '', value: 'Driller 2' },
  { name: 'Spud Date', units: '', value: '2018-07-05' },
];

const DataNode = () => (
  <div>
    <HotTable
      data={defaultData}
      contextMenu
      colHeaders={['Variable Name', 'Units', 'Value']}
    />
    <Button style={{ margin: '6px 0 0 0' }}>+ Add Row</Button>
  </div>
);

export default DataNode;
