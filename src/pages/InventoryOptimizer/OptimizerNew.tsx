import React, { useState, useRef, MutableRefObject, useEffect } from 'react'
import {
    Container,
    Typography,
    Button,
    Grid,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    Link,
    Backdrop, 
    CircularProgress, Snackbar, Alert, Input, Box
} from '@mui/material'
import TextField from '@mui/material/TextField';

import { createTheme, ThemeProvider } from '@mui/material/styles'
import { uploadInventory, updateHoldingCost } from '../../redux/actions/inventoryOptimizer'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';

import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'
import downloadableTemplates from './Templates.'
import { useNavigate } from 'react-router-dom';
// import { uploadInventoryApi } from './api'
import { FormElement, FormRadioButton,FormDownloadTemplateButton, FormUploadButton, FormLabel, FormBackdropElement, FormRadioElement, FormTextElement } from './components/formFields';

const theme = createTheme();

const OptimizerContainer = () => {


    // const navigate = useNavigate()
    const dispatch = useAppDispatch()

    // @ts-ignore
    const state = useAppSelector(state => state.inventoryOptimizerReducer)

    type ButtonProps = {
        handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    };

    interface FormPayload {
        demandId: undefined | number;
        vendorId: undefined  | number;
        purchaseId:  undefined | number;
        volumnId:  undefined  | number;
        annualHoldingCost:  undefined  | number;
        fillRate:  undefined | number;
        cycleServiceLevel: undefined | number;

    }

    // const [annualHoldingCost, setAnnualHoldingCost] = useState('');
    const [formPayload, setFormPayload] = useState<FormPayload>({demandId: undefined, vendorId: undefined, purchaseId: undefined, volumnId: undefined, annualHoldingCost: undefined, fillRate: undefined, cycleServiceLevel: undefined});

    const [snackbarState, setSnackbarState] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const [leadTimeEnabled, setLeadTimeEnabled] = useState(true)
    const [volumneDiscountEnabled, setVolumeDiscountEnabled] = useState(true)
    const [serviceLevel, setServiceLevel] = useState('fillRate')

    const [forcastFile, setForcastFile] = useState<File>();
    const [forecastFileName, setForecastFileName] = useState<string>('')

    const [vendorFile, setVendorFile] = useState<File>();
    const [vendorFileName, setVendorFileName] = useState<string>('')

    const [orderFile, setOrderFile] = useState<File>();
    const [orderFileName, setOrderFileName] = useState<string>('')

    const [volumeDiscountFile, setVolumeDiscountFile] = useState<File>();
    const [volumeDiscountFileName, setVolumeDiscountFileName] = useState<string>('')


    // const handleServiceLevelChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
    //     // console.log(event.target.value)
    //     event.target.value == 'fillRate'
    //         ? setServiceLevel('fillRate')
    //         : setServiceLevel('cycleServiceLevel')
    // }


    // // General function to export Form Text Field
    // const FormTextField = (params: { disabled: boolean | undefined } ) => {
    //     return (
    //         <TextField
    //             size="small"
    //             variant="outlined"
    //             disabled={params?.disabled}
    //         ></TextField>
            
    //     )
    // }

    // // General function to export Form template download Btn
    // const FormDownloadTemplateButton = (params: { id: string | undefined; filePath: string; fileName: string }) => {
    //     return (
         
    //             <Button
    //                 variant="outlined"
    //                 color="secondary"
    //                 size="small"    
    //                 id={params.id}
    //                 href={params.filePath}
    //                 // download={params.fileName}
    //                 target="_blank" 
    //                 // rel="noopener noreferrer"
    //             >
    //                 Download Template
    //             </Button>
    //     )
    // }

    // // General function to export Form Radio Field
    // const FormRadioButton = (params: { id: string ; identifier: boolean ; options: { [x: string]: string }; onChange: ((event: React.ChangeEvent<HTMLInputElement>, value: string) => void) }) => {
    //     return (
    //         <FormControl >
    //             <RadioGroup
    //                 row
    //                 id={params.id}
    //                 value={ 
    //                     params.identifier
    //                         ? Object.keys(params.options)[0]
    //                         : Object.keys(params.options)[1]
    //                 }
    //                 onChange={params.onChange}
    //             >
    //                 {Object.keys(params.options).map((value, index) => (
    //                     <FormControlLabel
    //                         key={index}
    //                         value={value}
    //                         control={<Radio />}
    //                         label={params.options[value]}
    //                     />
    //                 ))}
    //             </RadioGroup>
    //         </FormControl>
    //     )
    // }

    const FormBackdrop = () => {
        return (
            <FormBackdropElement
                loader={state.isLoading}
            />
        )
    }

    const WeeklyForcastContainer = () => {

        const weeklyForcastFile = useRef() as MutableRefObject<HTMLInputElement>;

        const handleChange = (event: any) => {
            event.preventDefault();
            const fileObj = event.target.files && event.target.files[0];
            if (fileObj) {

               const context = {
                    file: fileObj,
                    file_type: 'demand_forecast'
                }
                // @ts-ignore
                dispatch(uploadInventory(context, 'demand_forecast', fileObj.name))
            }
        }

        const ForecastUploadBtn = () => {
            return (
                <FormUploadButton
                    id='weekly-forcast-uploader'
                    fileRef={weeklyForcastFile}
                    loader={state.isLoading}
                    onChange={handleChange}
                    disabled={false}
                />
            )
        }
        const ForecastDownloadBtn = () => {
            return (
                <FormDownloadTemplateButton
                    id='weekly-forcast-downloader'
                    filePath={downloadableTemplates.DemandForcast}
                    fileName="Demand Forecast.csv"
                />
            )
        }

        return (
            <FormElement
                label = 'Upload weekly demand forecast'
                uploadBtnElement={ForecastUploadBtn}
                backdropElement={FormBackdrop}
                downloadBtnElement={ForecastDownloadBtn}
                fileName={state.demand_forecast_file_name}
            />
        )
    }
    

    const VendorCostTimeContainer = () => {

        const vendorForecastFile = useRef() as MutableRefObject<HTMLInputElement>;

        const handleChange = (event: any) => {
            event.preventDefault();
            const fileObj = event.target.files && event.target.files[0];
            if (fileObj) {

               const context = {
                    file: fileObj,
                    file_type: 'vendor'
                }
                // @ts-ignore
                dispatch(uploadInventory(context, 'vendor', fileObj.name))
            }
        }

        const VendorUploadBtn = () => {
            return (
                <FormUploadButton
                    id='vendor-cost-time-uploader'
                    fileRef={vendorForecastFile}
                    loader={state.isLoading}
                    onChange={handleChange}
                    disabled={false}
                />
            )
        }
        const VendorDownloadBtn = () => {
            return (
                <FormDownloadTemplateButton
                    id='vendor-cost-time-template-downloader'
                    filePath={downloadableTemplates.VendorData}
                    fileName="Vendor Data.csv"
                />
            )
        }
        return (
            <FormElement
                label = 'Upload vendor, costs & lead time details'
                uploadBtnElement={VendorUploadBtn}
                backdropElement={FormBackdrop}
                downloadBtnElement={VendorDownloadBtn}
                fileName={state.vendor_file_name}
            />
        )
    }

    const EstimateLeadTimeContainer = () => {

        const handleLeadTimeChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
        event.target.value == 'yes'
            ? setLeadTimeEnabled(true)
            : setLeadTimeEnabled(false)
        }

        return (
            <FormRadioElement
                label='Estimate lead time from purchase order data?'
                subLabel='(If yes, lead time details in previous file will be overridden)'
                options={{ yes: 'Yes', no: 'No' }}
                identifier={leadTimeEnabled}
                id="estimate-lead-time-selector"
                onChange={handleLeadTimeChange}
            />
        )
    }

    const PurchaseOrderContainer = () => {

        const purchaseOrderFile = useRef() as MutableRefObject<HTMLInputElement>;

        const handleChange = (event: any) => {
            event.preventDefault();
            const fileObj = event.target.files && event.target.files[0];
            if (fileObj) {

               const context = {
                    file: fileObj,
                    file_type: 'purchase_order'
                }
                // @ts-ignore
                dispatch(uploadInventory(context, 'purchase_order', fileObj.name))
            }
        }

        const PurchaseOrderUploadBtn = () => {
            return (
                <FormUploadButton
                    id='purchase-order-data-uploader'
                    fileRef={purchaseOrderFile}
                    loader={state.isLoading}
                    onChange={handleChange}
                    disabled={leadTimeEnabled ? false : true}
                />
            )
        }
        const PurchaseDownloadBtn = () => {
            return (
                <FormDownloadTemplateButton
                    id="purchase-order-data-template-downloader"
                    filePath={downloadableTemplates.PurchaseOrder}
                    fileName="Purchase Order Data.csv"
                />
            )
        }
        return (
            <FormElement
                label = 'Upload purchase order data'
                uploadBtnElement={PurchaseOrderUploadBtn}
                backdropElement={FormBackdrop}
                downloadBtnElement={PurchaseDownloadBtn}
                fileName={state.purchase_order_file_name}
            />
        )
    }

    const VolumeDiscountContainer = () => {

        const handleVolumDiscountChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
            event.target.value == 'yes'
            ? setVolumeDiscountEnabled(true)
            : setVolumeDiscountEnabled(false)
        }

        return (
            <FormRadioElement
                label='Use volume discount?'
                subLabel=''
                options={{ yes: 'Yes', no: 'No' }}
                identifier={volumneDiscountEnabled}
                id="volume-discount-selector"
                onChange={handleVolumDiscountChange}
            />
        )
    }

    const VolumeDiscountDetailsContainer = () => {

        const volumeDiscountFile = useRef() as MutableRefObject<HTMLInputElement>;

        const handleChange = (event: any) => {
            event.preventDefault();
            const fileObj = event.target.files && event.target.files[0];
            if (fileObj) {

               const context = {
                    file: fileObj,
                    file_type: 'volume_discount'
                }
                // @ts-ignore
                dispatch(uploadInventory(context, 'volume_discount', fileObj.name))
            }
        }

        const VolumeDiscountUploadBtn = () => {
            return (
                <FormUploadButton
                    id='volume-discount-data-uploader'
                    fileRef={volumeDiscountFile}
                    loader={state.isLoading}
                    onChange={handleChange}
                    disabled={volumneDiscountEnabled ? false : true}
                />
            )
        }
        const VolumeDiscountDownloadBtn = () => {
            return (
                <FormDownloadTemplateButton
                    id="volume-discount-template-downloader"
                    filePath={downloadableTemplates.VolumeDiscount}
                    fileName="Volume Discount Data.csv"
                />
            )
        }
        return (
            <FormElement
                label = 'Upload volume discount details"'
                uploadBtnElement={VolumeDiscountUploadBtn}
                backdropElement={FormBackdrop}
                downloadBtnElement={VolumeDiscountDownloadBtn}
                fileName={state.purchase_order_file_name}
            />
        )
    }

    const [holdingCostValue, setholdingCostValue] = useState(undefined);

  
    const AnnualHoldingCostContainer = () => {

        const handleChange = (e:any) => {
            setholdingCostValue(e.target.value)
            // @ts-ignore
            dispatch(updateHoldingCost(e.target.value))
        }

        return (
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <Grid item lg={6} md={6} sm={12} >
                    <FormLabel label='Specify annual holding cost per unit' />
                </Grid>
    
                <Grid item container lg={6} md={6} sm={12} direction="column">
                    <Grid item lg={6} md={6} sm={12}>
                    <TextField
                        size='small'
                        variant='outlined'
                        id='annual-holding-cost'
                        onChange={(e) => handleChange(e)}
                        value={holdingCostValue}
                       
                    />
                    </Grid>
                </Grid>
            </Grid>
          
        )
    }
    
    
    // const ServiceLevelContainer = () => {
    //     return (
    //         <Grid
    //             container
    //             direction="row"
    //             justifyContent="center"
    //             alignItems="center"
           
    //         >
    //             <Grid item lg={6} md={6} sm={12}>
    //                 <FormLabel label="Specify service level %" />
    //             </Grid>
               
    //             <Grid item container lg={6} md={6} sm={12} direction="column">

    //             <Grid
    //                 container
    //                 direction="row"
    //                 justifyContent="center"
    //                 alignItems="center"
    //             >   
    //                 <Grid container direction="row" item>
    //                 <RadioGroup
    //                     row
    //                     id="service-level-selector"
    //                     value={serviceLevel}
    //                     onChange={handleServiceLevelChange}
    //                 >
    //                     <Grid item lg={6} md={6} sm={12}>
    //                         <FormControlLabel
    //                             key={0}
    //                             value='fillRate'
    //                             control={<Radio />}
    //                             label='Fill Rate'
    //                         />
    //                         <TextField
    //                             id="fill-rate"
    //                             size="small"
    //                             variant="outlined"
    //                             disabled={serviceLevel !== 'fillRate'}
    //                             value={formPayload.fillRate}
    //                             onChange={(e) => 
    //                                 {setFormPayload({...formPayload, fillRate: parseInt(e.target.value)})}
    //                             }
    //                         ></TextField>
    //                     </Grid>
    //                     <Grid item lg={6} md={6} sm={12}>
    //                         <FormControlLabel
    //                             key={0}
    //                             value='cycleServiceLevel'
    //                             control={<Radio />}
    //                             label='Cycle Service Level'
    //                         />
    //                         <TextField
    //                             id="cycle-service-level"
    //                             size="small"
    //                             variant="outlined"
    //                             disabled={serviceLevel !== 'cycleServiceLevel'}
    //                             value={formPayload.cycleServiceLevel}
    //                             onChange={(e) => 
    //                                 {setFormPayload({...formPayload, cycleServiceLevel: parseInt(e.target.value)})}
    //                             }
    //                         ></TextField>
    //                         </Grid>
    //                 </RadioGroup>
    //                 </Grid>
    //             </Grid>
    //             </Grid>
    //         </Grid>
    //     )
    // }

    // const SubmitFormButton = () => {

    //     const [open, setOpen] = React.useState(false);
    //     const handleClose = () => {
    //       setOpen(false);
    //     };
    //     const handleOpen = () => {
    //       setOpen(true);
    //     };

    //     const handleSubmit = () => {
    //         console.log(formPayload);
    //     }

    //     return (
    //         <Grid
    //             container
    //             direction="row"
    //             justifyContent="center"
    //             alignItems="center"
    //         >
    //             <Grid item>
    //                 <Button variant="contained" color="secondary" onClick={handleSubmit}>
    //                     GENERATE ORDER POLICY
    //                 </Button>
    //                 <Backdrop
    //                     sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    //                     open={open}
    //                     onClick={handleClose}
    //                 >
    //                     <CircularProgress color="inherit" />
    //                 </Backdrop>
    //             </Grid>
    //         </Grid>
    //     )
    // }

    // @ts-ignore
    const handleSubmit = event => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        const context = {
            annual_holding_cost: data.get('annual_holding_cost')
        }
        // @ts-ignore
        dispatch(setAnnualHoldingCost(context))
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component='main' sx={{ flexGrow: 1 }} fixed >
{/* 
                <Box 
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }} 
                    onChange={(e) => {e.preventDefault; console.log(e)}}
                > */}
                    {/* <TextField
                        size="small"
                        variant="outlined"
                        id="annual_holding_cost"
                        name="annual_holding_cost"
                        autoFocus
                    /> */}

                    {/* <Button
                        data-type="SignIn"
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        SignIn
                    </Button> */}


                    <Grid container direction="column" spacing={1}>

                    <Grid item>
                        <WeeklyForcastContainer />
                    </Grid>

                    <Grid item>
                        <VendorCostTimeContainer />
                    </Grid>

                    <Grid item>
                        <EstimateLeadTimeContainer />
                    </Grid>

                    <Grid item>
                        <PurchaseOrderContainer />
                    </Grid>

                    <Grid item>
                        <VolumeDiscountContainer />
                    </Grid>
                  
                    <Grid item>
                        <VolumeDiscountDetailsContainer />
                    </Grid>
                    
                    <Grid item>
                        <AnnualHoldingCostContainer />
                    </Grid>

                    {/* <Grid item>
                        <ServiceLevelContainer />
                    </Grid> */}

                    {/* <Grid item>
                        <SubmitFormButton />
                    </Grid> */}
                    <Button onClick={(event) => {console.log(state)}}>click</Button>

                </Grid>
                    
                {/* </Box> */}

                {/* <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={snackbarState}
                    autoHideDuration={2000}
                    onClose={() => setSnackbarState(false)}
                >
                    <Alert severity="error">{snackbarMessage}</Alert>
                </Snackbar> */}


               
            </Container>
        </ThemeProvider>
    )
}

export default OptimizerContainer;
