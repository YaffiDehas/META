import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import TimelineIcon from '@mui/icons-material/Timeline';
import { DataGrid } from '@mui/x-data-grid';
import CitiesDropDownComponent from './CitiesDropDown';
import AddessesDropDown from './AddressesDropDown';
import SearchText from './SearchText';
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
    const rows = branches.length && branches.map((branch, index) => {
        return {
            id: index.toString(),
            store_id: branch.store_id.toString(),
            store_title: branch.store_title,
            store_address: branch.store_address,
            store_phone: branch.store_phone,
            city: branch.city,
            zip_code: branch.zip_code,
            emp_interview: branch.emp_interview,
            emp_contact: branch.emp_contact
        }
    });
    const [selectedRegion, setSelectedRegion] = useState("1");
    const [selectedZipCode, setSelectedZipCode] = useState("");
    const [citiesList, setCitiesList] = useState("");
    const [adressesList, setAdressesList] = useState("");
    const [branchesList, setBranchesList] = useState("");

    useEffect(() => {
        const citiesOptions = Array.from(new Set(branches.map(item => item.city))).map(city => {
            return branches.find(item => item.city === city);
        });
        setCitiesList(citiesOptions);
        setBranchesList(branches);
        generateMappedRows();
        const regionAdresses = branches.filter((branch) => branch.store_region === selectedRegion);
        setAdressesList(regionAdresses);
        console.log(regionAdresses);
    }, [])


    const handleSelectRegion = (selectedBranch) => {
        setSelectedRegion(selectedBranch.store_region);
        const regionAdresses = branches.filter((branch) => branch.store_region === selectedBranch.store_region);
        const addressesOptions = Array.from(new Set(regionAdresses.map(item => item.zip_code))).map(zip_code => {
            return regionAdresses.find(item => item.zip_code === zip_code);
        });
        setAdressesList(addressesOptions);
        const mappedRegion = branches && branches.filter((branch) => branch.store_region === selectedBranch.store_region);
        const rows = mappedRegion && mappedRegion.map((branch, index) => {
            return {
                id: branch.store_id.toString(),
                ...branch
            }
        });
        setBranchesList(rows);
    }

    const handleSelectAdress = (selectedBranch) => {
        setSelectedZipCode(selectedBranch.zip_code);
        const branchesList = branches.filter((branch) => branch.zip_code === selectedBranch.zip_code);
        setBranchesList(branchesList);
        const mappedZipCode = branches && branches.filter((branch) => branch.zip_code === selectedBranch.zip_code);
        const rows = mappedZipCode && mappedZipCode.map((branch, index) => {
            return {
                id: branch.store_id.toString(),
                ...branch
            }
        });
        setBranchesList(rows);
    }


    // generate new id field caused MUI table is required unique id field for each row 
    const generateMappedRows = () => {
        const rows = branches && branches.map((branch, index) => {
            return {
                id: branch.store_id.toString(),
                ...branch
            }
        });
        setBranchesList(rows);
    }

    const handleSearchText = (searchText) => {
        // search only the stores include the text
        const mappedSearch = branches && branches.filter((branch) => branch.zip_code.includes(searchText) || branch.store_title.includes(searchText) || branch.store_address.includes(searchText));
        // search only on the stores include the text and in the same area as selected
        if (selectedZipCode || selectedRegion) {
            const mappedData = mappedSearch && mappedSearch.filter((branch) => branch.zip_code === selectedZipCode || branch.store_region === selectedRegion);
            const rows = mappedData && mappedData.map((branch, index) => {
                return {
                    id: index.toString(),
                    ...branch
                }
            });
            setBranchesList(rows);
        } else {
            const rows = mappedSearch && mappedSearch.map((branch, index) => {
                return {
                    id: index.toString(),
                    ...branch
                }
            });
            setBranchesList(rows);
        }
    }


    return (
        <Grid container spacing={{ xs: 2, md: 4 }}>
            <Grid container spacing={{ xs: 2, md: 4 }}>
                {citiesList &&
                    <Grid >
                        <CitiesDropDownComponent label="Cities" options={citiesList} handleSelectionRegion={handleSelectRegion} />
                    </Grid>}
                {adressesList &&
                    <Grid >
                        <AddessesDropDown label="Adresses" options={adressesList} handleSelectAdress={handleSelectAdress} />
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