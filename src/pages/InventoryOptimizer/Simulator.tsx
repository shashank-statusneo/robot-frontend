// import React, { useState } from 'react'
// import {
//     Grid,
//     Container,
//     Typography
// } from '@mui/material';
// import { createTheme, ThemeProvider } from '@mui/material/styles'
// import { useAppSelector } from '../../hooks/redux-hooks';

// import { FormCardField, FormTable, FormGraph, FormSimulation } from './components/formFields';
// import { lineData, policyTableHeaders } from './constants';

// const theme = createTheme();

// const SimulatorContainer = () => {

//     // @ts-ignore
//     const algorithmResultState = useAppSelector(state => state.algorithmDataReducer)

//     const cardLabelMapping: any = {
//         total_purchase_value: 'Total Purchase Value',
//         total_purchase_qty: 'Total Purchase Qty',
//         reorder_point: 'Reorder Point',
//         reorder_qty: 'Reorder Qty',
//         safety_stock: 'Safety Stock'
//     }

//     const CardContainer = () => {

//         const cardsData: any = []
//         const apiResult = algorithmResultState.result

//         Object.keys(apiResult).forEach((key, index)=> {
//             cardsData.push({
//                 value: apiResult[key],
//                 label: cardLabelMapping[key]
//             })
//         }) 
//         return (
//             <FormCardField items={cardsData} />
//         )
//     }

//     const ProjectionContainer = () => {
//         return (
//             <FormGraph
//                 label=''
//                 xLabel='date'
//                 yLabel='inventory_level'
//                 data={algorithmResultState.simulation_output}
//                 lineData={lineData}
//             />
//         )
//     }

//     const PolicyContainer = () => {

//         const apiPolicyDetail = algorithmResultState.policy_detail

//         let totalOrderQty = 0;
//         let totalCost = 0;

//         apiPolicyDetail.map((obj: any, key: any) => {
//             totalOrderQty = totalOrderQty + obj.reorder_qty
//             totalCost = totalCost + obj.cost
//         })

//         const onDownloadClick = (event: any) => {
//             console.log(event)
//         }

//         return (
//             <FormTable 
//                 tableName=''
//                 tableHeaders={policyTableHeaders}
//                 tableData={apiPolicyDetail}
//                 totalOrderQty={totalOrderQty}
//                 totalCost={totalCost}
//                 downloadBtnId='policy-table-download-btn'
//                 onClickFunc={onDownloadClick}
//             />
//         )
//     }

//     const SimulationForm = () => {
//         return (
//             <FormSimulation 
//                 btnId='run_simulation'
//                 label='SIMULATION'
//             />
//         )
//     }

//     return (
//         <ThemeProvider theme={theme}>
//             <Container component='main' sx={{ flexGrow: 1 }} fixed >
//                 <Grid container direction='column' spacing={2} style={{marginBottom: '20px'}}>
//                     <Grid item >
//                         <Typography variant="h5" component="h5" align="center">
//                             BASIC SCENARIO RESULT
//                         </Typography>
//                     </Grid>
//                     <Grid item >
//                         <CardContainer />
//                     </Grid>
//                     <Grid container item direction='row' >
//                     <Grid item lg={6} md={6} sm={12}>
//                             <ProjectionContainer/>
//                         </Grid>
//                         <Grid item lg={6} md={6} sm={12}>
//                             <PolicyContainer/>
//                         </Grid>
//                     </Grid>
//                 </Grid>
//                 <Grid container direction='column' spacing={2} style={{marginBottom: '20px'}}>
//                     <Grid item >
//                         <Typography variant="h5" component="h5" align="center">
//                             SIMULATION
//                         </Typography>
//                     </Grid>
//                     <Grid item >
//                        <SimulationForm/>
//                     </Grid>
//                 </Grid>
//                 <Grid container direction='column' spacing={2} style={{marginBottom: '20px'}}>
//                     <Grid item >
//                         <Typography variant="h5" component="h5" align="center">
//                             SIMULATION RESULTS
//                         </Typography>
//                     </Grid>
//                     <Grid item >
//                         <CardContainer />
//                     </Grid>
//                     <Grid container item direction='row' >
//                     <Grid item lg={6} md={6} sm={12}>
//                             <ProjectionContainer/>
//                         </Grid>
//                         <Grid item lg={6} md={6} sm={12}>
//                             <PolicyContainer/>
//                         </Grid>
//                     </Grid>
//                 </Grid>
//             </Container>
//         </ThemeProvider>
//     )
// }

// export default SimulatorContainer
