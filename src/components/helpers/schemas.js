import PropTypes from 'prop-types';

export const itemSchema = {
  key: PropTypes.string,
  content: PropTypes.string,
  level: PropTypes.number,
  subList: PropTypes.array,
};

export const listSettingsSchema = {
  showLevel: PropTypes.number,
};

const Schemas = {
  item: itemSchema,
  listSettings: listSettingsSchema,
};
export default Schemas;
