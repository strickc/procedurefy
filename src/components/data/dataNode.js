import React from 'react';
import HotTable from 'react-handsontable';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { dataSet } from '../../state/data/dataTypes';

const mapToArray = data => _.map(data, (val, key) => ({ key, ...val }));

const DataNodeView = props => (
  <div>
    <HotTable
      data={mapToArray(props.nodeData)}
      contextMenu
      colHeaders={['Display Name', 'Units', 'Value']}
      columns={[{ data: 'name' }, { data: 'units' }, { data: 'value' }]}
    />
    <Button style={{ margin: '6px 0 0 0' }}>+ Add Row</Button>
  </div>
);
DataNodeView.propTypes = {
  nodeData: PropTypes.shape(dataSet).isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  nodeData: state.data[ownProps.category],
});
// const mapDispatchToProps = dispatch => ({
// onListChanged: (event, data) => {
//   dispatch(setVisibilityFilter(data.value));
// },
// });
const DataNode = connect(mapStateToProps, null)(DataNodeView);

export default DataNode;
