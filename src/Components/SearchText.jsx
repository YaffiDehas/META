import * as React from 'react';
import TextField from '@mui/material/TextField';

export default function SearchText({ handleSearch }) {

    const handleChange = (event: SelectChangeEvent) => {
        handleSearch(event.target.value)
    };
    return (
            <TextField id="standard-basic" label="Search" variant="standard" onChange={handleChange} />
    );
}