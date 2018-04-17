import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { setVisibilityFilter, VisibilityFilters } from '../../state/actions';
import SubListContainer from '../subList';
import ItemMenu from '../itemMenu';

const levels = [
  { text: 'Sections', value: VisibilityFilters.SECTIONS },
  { text: 'Steps', value: VisibilityFilters.STEPS },
  { text: 'Detail', value: VisibilityFilters.DETAIL },
];

const MainListView = props => (
  <div>
    <Segment>
      <Dropdown
        placeholder="Show level"
        selection
        options={levels}
        value={props.visibilityFilter}
        onChange={props.onListChanged}
      />
      <SubListContainer forId="0" parentNum="" />
    </Segment>
    <ItemMenu />
  </div>
);

MainListView.propTypes = {
  onListChanged: PropTypes.func.isRequired,
  visibilityFilter: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  visibilityFilter: state.visibilityFilter,
});
const mapDispatchToProps = dispatch => ({
  onListChanged: (event, data) => {
    dispatch(setVisibilityFilter(data.value));
  },
});
const MainList = connect(mapStateToProps, mapDispatchToProps)(MainListView);

export default MainList;
