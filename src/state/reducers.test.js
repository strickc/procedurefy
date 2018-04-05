/* global test, describe, beforeEach, expect */
import { createStore } from 'redux';
import todoApp from './reducers';
import { VisibilityFilters, addItem, moveItem } from './actions';

describe('Store reducers tests', () => {
  let store;
  const list = () => store.getState().procedure.list;
  beforeEach(() => {
    store = createStore(todoApp);
  }, 1000);
  test('Initial generation of store', () => {
    const state = store.getState();
    expect(state.visibilityFilter).toEqual(VisibilityFilters.OVERVIEW);
    expect(state.procedure.list['0'].subList.length).toEqual(0);
  });
  test('adding items', () => {
    store.dispatch(addItem('Item 1'));
    store.dispatch(addItem('Item 2'));
    expect(list()['1']).toMatchObject({
      id: 1, content: 'Item 1', level: 1, subList: [],
    });
  });
  test('adding subitems', () => {
    store.dispatch(addItem('Item 1'));
    store.dispatch(addItem('SubItem 1', 1));
    expect(list()['1']).toMatchObject({
      id: 1, content: 'Item 1', level: 1, subList: [2],
    });
    expect(list()['2']).toMatchObject({
      id: 2, content: 'SubItem 1', level: 2, subList: [],
    });
  });
  test('moving items', () => {
    store.dispatch(addItem('Item 1'));
    store.dispatch(addItem('Item 2'));
    expect(list()['0'].subList).toEqual([1, 2]);
    const source = { droppableId: 0, index: 0 };
    const dest = { droppableId: 0, index: 1 };
    store.dispatch(moveItem(source, dest));
    expect(list()['0'].subList).toEqual([2, 1]);
  });
  test('moving items between lists', () => {
    store.dispatch(addItem('Item 1')); // 1
    store.dispatch(addItem('Item 2')); // 2
    store.dispatch(addItem('SubItem 1', 1));
    store.dispatch(addItem('SubItem 2', 2));
    expect(list()['0'].subList).toEqual([1, 2]);
    const source = { droppableId: 1, index: 0 };
    const dest = { droppableId: 2, index: 1 };
    store.dispatch(moveItem(source, dest));
    expect(list()['1'].subList).toEqual([]);
    expect(list()['2'].subList).toEqual([4, 3]);
  });
});
