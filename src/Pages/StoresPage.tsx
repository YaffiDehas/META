import * as React from 'react';
import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getLoadingSelector } from '../redux/branches/selectors';
import { LoadingState } from '../redux/branches/types';
import BranchesList from '../Components/StoresList';
import { getStores } from '../redux/branches/actions'
import './style.css';


export const Home: React.FC = () => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(getLoadingSelector);

    useEffect(() => {
        dispatch(getStores.request());
    }, [])


    return (
        <div>
            <Container className=''>
                <Row className='justify-content-between mt-5'>
                    <Typography variant="h1">Search Stores Web App</Typography>
                </Row>
                {loading === LoadingState.REQUEST &&
                    <div className="d-flex justify-content-center align-items-center vh-100">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                }
                {loading === LoadingState.SUCCESS &&

                    <Row className='justify-content-between mt-5'>
                        <Col>
                            <BranchesList />
                        </Col>
                    </Row>

                }
            </Container>
        </div>
    )
};
