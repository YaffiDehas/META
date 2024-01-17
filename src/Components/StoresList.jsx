import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { DataGrid } from '@mui/x-data-grid';
import DropDown from '../Common_Components/DropDown';
import SearchText from './SearchText';
import {generateMappedRows} from '../utils';

const columns = [
    { field: 'store_id', headerName: 'ID', width: 90 },
    {
        field: 'store_title',
        headerName: 'שם החנות',
        width: 150,
        editable: true,
    },
    {
        field: 'store_address',
        headerName: 'כתובת',
        width: 150,
        editable: true,
    },
    {
        field: 'store_phone',
        headerName: 'טלפון',
        width: 150,
        editable: true,
    },
    {
        field: 'city',
        headerName: 'עיר',
        width: 150,
        editable: true,
    },
    {
        field: 'zip_code',
        headerName: 'מיקוד',
        width: 150,
        editable: true,
    },
    {
        field: 'emp_interview',
        headerName: 'דרושים',
        width: 250,
        editable: true,
    },
    {
        field: 'emp_contact',
        headerName: 'כתובת הראיונות',
        width: 150,
        editable: true,
    },
];

export default function BranchesList() {
    const branches = useSelector((state) => state.stores.branches);
    const [selectedRegion, setSelectedRegion] = useState("1");
    const [selectedZipCode, setSelectedZipCode] = useState("");
    const [searchText, setSearchText] = useState("");
    const [citiesList, setCitiesList] = useState("");
    const [adressesList, setAdressesList] = useState("");
    const [branchesList, setBranchesList] = useState("");

    useEffect(() => {
        // Use Set to avoid duplicate cities.
        const citiesOptions = Array.from(new Set(branches.map(item => item.city))).map(city => {
            return branches.find(item => item.city === city);
        });
        setCitiesList(citiesOptions);
        setBranchesList(branches);
        const regionAdresses = branches.filter((branch) => branch.store_region === selectedRegion);
        setAdressesList(regionAdresses);
        setBranchesList(generateMappedRows(branches));
    }, [])


    const handleSelectRegion = (selectedBranch) => {
        setSelectedRegion(selectedBranch.store_region);
        const regionAdresses = branches.filter((branch) => branch.store_region === selectedBranch.store_region);
        // Use Set to avoid duplicate addresses.
        const addressesOptions = Array.from(new Set(regionAdresses.map(item => item.zip_code))).map(zip_code => {
            return regionAdresses.find(item => item.zip_code === zip_code);
        });
        setAdressesList(addressesOptions);
        const mappedBranchesByRegion = branches && branches.filter((branch) => branch.store_region === selectedBranch.store_region);
        setBranchesList(generateMappedRows(mappedBranchesByRegion));
    }

    const handleSelectAdress = (selectedBranch) => {
        setSelectedZipCode(selectedBranch.zip_code);
        const mappedBranchesByZipCode = branches && branches.filter((branch) => branch.zip_code === selectedBranch.zip_code);
        setBranchesList(generateMappedRows(mappedBranchesByZipCode));
    }
    const handleSearchText = (searchText) => {
        setSearchText(searchText);
        // search only the stores include the text
        const mappedSearch = branches && branches.filter((branch) => branch.zip_code.includes(searchText) || branch.store_title.includes(searchText) || branch.store_address.includes(searchText));
        // search only on the stores include the text and in the same area as selected
        if (selectedZipCode && selectedRegion) {
            const mappedData = mappedSearch && mappedSearch.filter((branch) => branch.zip_code === selectedZipCode && branch.store_region === selectedRegion);
            setBranchesList(generateMappedRows(mappedData));
        } else if (selectedZipCode || selectedRegion) {
            const mappedData = mappedSearch && mappedSearch.filter((branch) => branch.zip_code === selectedZipCode || branch.store_region === selectedRegion);
            setBranchesList(generateMappedRows(mappedData));
        } else {
            setBranchesList(generateMappedRows(mappedSearch));
        }
    }



    return (
        <Grid container spacing={{ xs: 2, md: 4 }}>
            <Grid container spacing={{ xs: 2, md: 4 }}>
                {citiesList &&
                    <Grid >
                        <DropDown label="Cities" options={citiesList} handleSelect={handleSelectRegion} />
                    </Grid>}
                {adressesList &&
                    <Grid >
                        <DropDown label="Adresses" options={adressesList} handleSelect={handleSelectAdress} />
                    </Grid>}
                <Grid>
                    <SearchText handleSearch={handleSearchText} />
                </Grid>
            </Grid>
            <Grid item>
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={branchesList}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                        }}
                        pageSizeOptions={[5]}

                    />
                </Box>
            </Grid>
        </Grid>
    );
}