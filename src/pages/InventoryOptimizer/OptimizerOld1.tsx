// import React, { useState, useRef, MutableRefObject } from 'react'
// import { Container, Button, Grid } from '@mui/material'

// import { createTheme, ThemeProvider } from '@mui/material/styles'
// import {
//     uploadInventory,
//     updateAnnualHoldingCost,
//     updateFillRate,
//     updateCycleServiceLevel,
// } from '../../redux/actions/inventoryOptimizer'
// import { algorithmApi } from '../../redux/actions/algorithm'
// import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'

// import downloadableTemplates from './Templates.'
// import {
//     FormElement,
//     FormDownloadTemplateButton,
//     FormUploadButton,
//     FormBackdropElement,
//     FormRadioElement,
//     FormTextElement,
//     FormMultiTextElement,
// } from './components/formFields'

// import { FormLabel, FormTextField } from '../../components/FormElements'

// const theme = createTheme()

// const Optimizer = () => {
//     const dispatch = useAppDispatch()

    
//     const inventoryOptimizerState = useAppSelector(
//         // @ts-ignore
//         (state) => state.optimizer,
//     )

//     const [leadTimeEnabled, setLeadTimeEnabled] = useState(true)
//     const [volumneDiscountEnabled, setVolumeDiscountEnabled] = useState(true)

//     const [annualHoldingCostValue, setAnnualHoldingCostValue] =
//         useState(undefined)
//     const [serviceLevel, setServiceLevel] = useState('fillRate')

//     const [fillRate, setFillRate] = useState(undefined)
//     const [cycleServiceLevel, setCycleServiceLevel] = useState(undefined)

//     const FormBackdrop = () => {
//         return (
//             <FormBackdropElement loader={inventoryOptimizerState.isLoading} />
//         )
//     }

//     const WeeklyForcastContainer = () => {
//         const weeklyForcastFile = useRef() as MutableRefObject<HTMLInputElement>

//         const handleChange = (event: any) => {
//             event.preventDefault()
//             const fileObj = event.target.files && event.target.files[0]
//             if (fileObj) {
//                 const context = {
//                     file: fileObj,
//                     file_type: 'demand_forecast',
//                 }

//                 dispatch(
//                     // @ts-ignore
//                     uploadInventory(context, 'demand_forecast', fileObj.name),
//                 )
//             }
//         }

//         const ForecastUploadBtn = () => {
//             return (
//                 <FormUploadButton
//                     id='weekly-forcast-uploader'
//                     fileRef={weeklyForcastFile}
//                     loader={inventoryOptimizerState.isLoading}
//                     onChange={handleChange}
//                     disabled={false}
//                 />
//             )
//         }
//         const ForecastDownloadBtn = () => {
//             return (
//                 <FormDownloadTemplateButton
//                     id='weekly-forcast-downloader'
//                     filePath={downloadableTemplates.DemandForcast}
//                     fileName='Demand Forecast.csv'
//                 />
//             )
//         }

//         return (
//             <FormElement
//                 label='Upload weekly demand forecast'
//                 uploadBtnElement={ForecastUploadBtn}
//                 backdropElement={FormBackdrop}
//                 downloadBtnElement={ForecastDownloadBtn}
//                 fileName={inventoryOptimizerState.demand_forecast_file_name}
//             />
//         )
//     }

//     const VendorCostTimeContainer = () => {
//         const vendorForecastFile =
//             useRef() as MutableRefObject<HTMLInputElement>

//         const handleChange = (event: any) => {
//             event.preventDefault()
//             const fileObj = event.target.files && event.target.files[0]
//             if (fileObj) {
//                 const context = {
//                     file: fileObj,
//                     file_type: 'vendor',
//                 }
//                 // @ts-ignore
//                 dispatch(uploadInventory(context, 'vendor', fileObj.name))
//             }
//         }

//         const VendorUploadBtn = () => {
//             return (
//                 <FormUploadButton
//                     id='vendor-cost-time-uploader'
//                     fileRef={vendorForecastFile}
//                     loader={inventoryOptimizerState.isLoading}
//                     onChange={handleChange}
//                     disabled={false}
//                 />
//             )
//         }
//         const VendorDownloadBtn = () => {
//             return (
//                 <FormDownloadTemplateButton
//                     id='vendor-cost-time-template-downloader'
//                     filePath={downloadableTemplates.VendorData}
//                     fileName='Vendor Data.csv'
//                 />
//             )
//         }
//         return (
//             <FormElement
//                 label='Upload vendor, costs & lead time details'
//                 uploadBtnElement={VendorUploadBtn}
//                 backdropElement={FormBackdrop}
//                 downloadBtnElement={VendorDownloadBtn}
//                 fileName={inventoryOptimizerState.vendor_file_name}
//             />
//         )
//     }

//     const EstimateLeadTimeContainer = () => {
//         const handleLeadTimeChange = (
//             event: React.ChangeEvent<HTMLInputElement>,
//         ) => {
//             event.target.value == 'yes'
//                 ? setLeadTimeEnabled(true)
//                 : setLeadTimeEnabled(false)
//         }

//         return (
//             <FormRadioElement
//                 label='Estimate lead time from purchase order data?'
//                 subLabel='(If yes, lead time details in previous file will be overridden)'
//                 options={{ yes: 'Yes', no: 'No' }}
//                 identifier={leadTimeEnabled}
//                 id='estimate-lead-time-selector'
//                 onChange={handleLeadTimeChange}
//             />
//         )
//     }

//     const PurchaseOrderContainer = () => {
//         const purchaseOrderFile = useRef() as MutableRefObject<HTMLInputElement>

//         const handleChange = (event: any) => {
//             event.preventDefault()
//             const fileObj = event.target.files && event.target.files[0]
//             if (fileObj) {
//                 const context = {
//                     file: fileObj,
//                     file_type: 'purchase_order',
//                 }
//                 dispatch(
//                     // @ts-ignore
//                     uploadInventory(context, 'purchase_order', fileObj.name),
//                 )
//             }
//         }

//         const PurchaseOrderUploadBtn = () => {
//             return (
//                 <FormUploadButton
//                     id='purchase-order-data-uploader'
//                     fileRef={purchaseOrderFile}
//                     loader={inventoryOptimizerState.isLoading}
//                     onChange={handleChange}
//                     disabled={leadTimeEnabled ? false : true}
//                 />
//             )
//         }
//         const PurchaseDownloadBtn = () => {
//             return (
//                 <FormDownloadTemplateButton
//                     id='purchase-order-data-template-downloader'
//                     filePath={downloadableTemplates.PurchaseOrder}
//                     fileName='Purchase Order Data.csv'
//                 />
//             )
//         }
//         return (
//             <FormElement
//                 label='Upload purchase order data'
//                 uploadBtnElement={PurchaseOrderUploadBtn}
//                 backdropElement={FormBackdrop}
//                 downloadBtnElement={PurchaseDownloadBtn}
//                 fileName={inventoryOptimizerState.purchase_order_file_name}
//             />
//         )
//     }

//     const VolumeDiscountContainer = () => {
//         const handleVolumDiscountChange = (
//             event: React.ChangeEvent<HTMLInputElement>,
//         ) => {
//             event.target.value == 'yes'
//                 ? setVolumeDiscountEnabled(true)
//                 : setVolumeDiscountEnabled(false)
//         }

//         return (
//             <FormRadioElement
//                 label='Use volume discount?'
//                 subLabel=''
//                 options={{ yes: 'Yes', no: 'No' }}
//                 identifier={volumneDiscountEnabled}
//                 id='volume-discount-selector'
//                 onChange={handleVolumDiscountChange}
//             />
//         )
//     }

//     const VolumeDiscountDetailsContainer = () => {
//         const volumeDiscountFile =
//             useRef() as MutableRefObject<HTMLInputElement>

//         const handleChange = (event: any) => {
//             event.preventDefault()
//             const fileObj = event.target.files && event.target.files[0]
//             if (fileObj) {
//                 const context = {
//                     file: fileObj,
//                     file_type: 'volume_discount',
//                 }

//                 dispatch(
//                     // @ts-ignore
//                     uploadInventory(context, 'volume_discount', fileObj.name),
//                 )
//             }
//         }

//         const VolumeDiscountUploadBtn = () => {
//             return (
//                 <FormUploadButton
//                     id='volume-discount-data-uploader'
//                     fileRef={volumeDiscountFile}
//                     loader={inventoryOptimizerState.isLoading}
//                     onChange={handleChange}
//                     disabled={volumneDiscountEnabled ? false : true}
//                 />
//             )
//         }
//         const VolumeDiscountDownloadBtn = () => {
//             return (
//                 <FormDownloadTemplateButton
//                     id='volume-discount-template-downloader'
//                     filePath={downloadableTemplates.VolumeDiscount}
//                     fileName='Volume Discount Data.csv'
//                 />
//             )
//         }
//         return (
//             <FormElement
//                 label='Upload volume discount details"'
//                 uploadBtnElement={VolumeDiscountUploadBtn}
//                 backdropElement={FormBackdrop}
//                 downloadBtnElement={VolumeDiscountDownloadBtn}
//                 fileName={inventoryOptimizerState.purchase_order_file_name}
//             />
//         )
//     }

//     const AnnualHoldingCostContainer = () => {
//         const handleChange = (e: any) => {
//             setAnnualHoldingCostValue(e.target.value)
//             // @ts-ignore
//             dispatch(updateAnnualHoldingCost(e.target.value))
//         }

//         return (
//             <FormTextElement
//                 id='annual-holding-cost'
//                 label='Specify annual holding cost per unit'
//                 value={annualHoldingCostValue}
//                 onChange={(e: any) => handleChange(e)}
//             />
//         )
//     }

//     const ServiceLevelContainer = () => {
//         const handleServiceLevelChange = (
//             event: React.ChangeEvent<HTMLInputElement>,
//         ) => {
//             event.target.value == 'fillRate'
//                 ? setServiceLevel('fillRate')
//                 : setServiceLevel('cycleServiceLevel')
//         }

//         const handleFillRateChange = (e: any) => {
//             setFillRate(e.target.value)
//             // @ts-ignore
//             dispatch(updateFillRate(e.target.value))
//         }

//         const handleCycleServiceLevelChange = (e: any) => {
//             setCycleServiceLevel(e.target.value)
//             // @ts-ignore
//             dispatch(updateCycleServiceLevel(e.target.value))
//         }

//         const options = [
//             {
//                 value: 'fillRate',
//                 label: 'Fill Rate',
//                 id: 'fill-rate',
//                 textValue: fillRate,
//                 onChange: handleFillRateChange,
//             },
//             {
//                 value: 'cycleServiceLevel',
//                 label: 'Cycle Service Level',
//                 id: 'cycle-service-level',
//                 textValue: cycleServiceLevel,
//                 onChange: handleCycleServiceLevelChange,
//             },
//         ]

//         return (
//             <FormMultiTextElement
//                 id='service-level-selector'
//                 label='Specify service level %'
//                 value={serviceLevel}
//                 onChange={handleServiceLevelChange}
//                 options={options}
//             />
//         )
//     }

//     const SubmitFormButton = () => {
//         const handleSubmit = () => {
//             console.log(
//                 'Form inventoryOptimizerState:',
//                 inventoryOptimizerState,
//             )
//             // @ts-ignore
//             dispatch(algorithmApi(inventoryOptimizerState))
//         }

//         return (
//             <Grid
//                 container
//                 direction='row'
//                 justifyContent='center'
//                 alignItems='center'
//             >
//                 <Grid item>
//                     <Button
//                         variant='contained'
//                         color='secondary'
//                         onClick={handleSubmit}
//                     >
//                         GENERATE ORDER POLICY
//                     </Button>
//                 </Grid>
//             </Grid>
//         )
//     }

//     return (
//         <ThemeProvider theme={theme}>
//             <Container component='main' sx={{ flexGrow: 1 }} fixed>
//                 <Grid container direction='column' spacing={1}>
//                     <Grid item>
//                         <WeeklyForcastContainer />
//                     </Grid>

//                     <Grid item>
//                         <VendorCostTimeContainer />
//                     </Grid>

//                     <Grid item>
//                         <EstimateLeadTimeContainer />
//                     </Grid>

//                     <Grid item>
//                         <PurchaseOrderContainer />
//                     </Grid>

//                     <Grid item>
//                         <VolumeDiscountContainer />
//                     </Grid>

//                     <Grid item>
//                         <VolumeDiscountDetailsContainer />
//                     </Grid>

//                     <Grid item>
//                         <AnnualHoldingCostContainer />
//                     </Grid>

//                     <Grid item>
//                         <ServiceLevelContainer />
//                     </Grid>

//                     <Grid item>
//                         <SubmitFormButton />
//                     </Grid>
//                 </Grid>
//             </Container>
//         </ThemeProvider>
//     )
// }

// export default Optimizer
