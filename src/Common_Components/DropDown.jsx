import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function DropDown({ label, options, handleSelect }) {

    const handleChange = (event: SelectChangeEvent) => {
        handleSelect(event.target.value)
    };

    return (
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">{label}</InputLabel>
            <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                // value={option}
                onChange={handleChange}
                label={label}
            >
                {options.map((option, index) => {
                    return <MenuItem key={index} value={option}>{label === "Cities" ? option.city : option.store_address}</MenuItem>
                })}
            </Select>
        </FormControl>
    );
}