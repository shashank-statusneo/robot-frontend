import React, {useState} from 'react'
import { Typography, Tabs, Tab, Container, Grid } from '@mui/material';
import WarehouseSelect from './WarehouseSelect';
import WarehouseRequirement from './WarehouseRequirement';
import BenchmarkProductivity from './BenchmarkProductivity';
import DemandForecast from './DemandForecast';
import Result from './Result';


const WareHouse = () => {
    return (
        <Container maxWidth="xl">
                <Grid container>
                    <Grid item lg={2} md={2} sm={2} bgcolor='#D0E8FD'>
                        <Typography variant='h6'>WAREHOUSE</Typography>
                    </Grid>
                    <Grid item lg={10} md={10} sm={10} style={{borderStyle: 'solid', borderWidth: '0.2px', padding: '5px'}}>
                        <WarehouseSelect />
                    </Grid>
                </Grid>  
                <Grid container>
                    <Grid item lg={2} md={2} sm={2} bgcolor='#D0E8FD'>
                        <Typography variant='h6'>WAREHOUSE</Typography>
                    </Grid>
                    <Grid item lg={10} md={10} sm={10} style={{borderStyle: 'solid', borderWidth: '0.2px', padding: '5px'}}>
                        <BenchmarkProductivity />
                    </Grid>
                </Grid>  
                <Grid container>
                    <Grid item lg={2} md={2} sm={2} bgcolor='#D0E8FD'>
                        <Typography variant='h6'>WAREHOUSE</Typography>
                    </Grid>
                    <Grid item lg={10} md={10} sm={10} style={{borderStyle: 'solid', borderWidth: '0.2px', padding: '5px'}}>
                        <DemandForecast />
                    </Grid>
                </Grid>  
                <Grid container>
                    <Grid item lg={2} md={2} sm={2} bgcolor='#D0E8FD'>
                        <Typography variant='h6'>WAREHOUSE</Typography>
                    </Grid>
                    <Grid item lg={10} md={10} sm={10} style={{borderStyle: 'solid', borderWidth: '0.2px', padding: '5px'}}>
                        <WarehouseRequirement />
                    </Grid>
                </Grid>  
                <Grid container>
                    <Grid item lg={2} md={2} sm={2} bgcolor='#D0E8FD'>
                        <Typography variant='h6'>WAREHOUSE</Typography>
                    </Grid>
                    <Grid item lg={10} md={10} sm={10} style={{borderStyle: 'solid', borderWidth: '0.2px', padding: '5px'}}>
                        <Result />
                    </Grid>
                </Grid>  
        </Container>
    )
}

export default WareHouse