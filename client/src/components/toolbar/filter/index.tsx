import { useState } from 'react';
import {
  GridFilterInputValueProps,
  GridFilterItem,
  GridFilterOperator,
} from '@mui/x-data-grid';
import { Box, FormControl, InputLabel, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

function StatusInputValue(props: GridFilterInputValueProps) {
  const { item, applyValue } = props;
  const [status, setStatus] = useState<string>("");

  const handleChange = (e: SelectChangeEvent) => {
    const newValue = e.target.value;
    setStatus(newValue)
    applyValue({ ...item, value: newValue });
  };

  return (
    <Box
      sx={{
        display: 'inline-flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 48,
        pl: '20px',
      }}
    >
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="select-standard-label">Value</InputLabel>
        <Select
          labelId="select-standard-label"
          id="select-standard"
          value={status}
          onChange={handleChange}
          label="Value"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"Completed"}>Completed</MenuItem>
          <MenuItem value={"Incomplete"}>Incomplete</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export const statusOnlyOperators: GridFilterOperator[] = [
  {
    label: 'equals',
    value: 'equals',
    getApplyFilterFn: (filterItem: GridFilterItem) => {
      if (!filterItem.field || !filterItem.value || !filterItem.operator) {
        return null;
      }

      return (params): boolean => {
        return params.value == filterItem.value;
      };
    },
    InputComponent: StatusInputValue,
    InputComponentProps: { type: 'boolean' },
  },
];