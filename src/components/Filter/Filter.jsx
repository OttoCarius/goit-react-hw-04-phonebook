import PropTypes from 'prop-types';
import { StyledInput } from './Filter.styled';

const Filter = ({ filter, onChange }) => {
  return (
    <StyledInput
      type="text"
      name="filter"
      value={filter}
      onChange={onChange}
      placeholder="Find contact by name"
    />
  );
};

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default Filter;
