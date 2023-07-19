import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export const FilterSelectComponent = ({
  label,
  value,
  handleFilter,
  filterList,
  renderValue,
  sx,
}) => {
  return (
    <Select
      labelId={`${label}-filter-select-label`}
      id={`${label}-filter-select`}
      value={value}
      onChange={handleFilter}
      sx={sx}
      displayEmpty
      renderValue={renderValue}
    >
      <MenuItem disabled>{label} 필터</MenuItem>
      {Object.values(filterList).map((item) => (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      ))}
    </Select>
  );
};