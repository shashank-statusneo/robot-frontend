import React, { useState, useRef, MutableRefObject } from 'react'
import {
    Container,
    Typography,
    Button,
    Grid,
    Radio,
    RadioGroup,
    FormControlLabel,
    TextField,
    FormControl,
    Link,
} from '@mui/material'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'
import downloadableTemplates from './Templates.'
import { uploadDemandForecastData } from './api'

const OptimizerContainer = () => {

    type ButtonProps = {
        handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    };


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

    const handleLeadTimeChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
        event.target.value == 'yes'
            ? setLeadTimeEnabled(true)
            : setLeadTimeEnabled(false)
    }

    const handleVolumDiscountChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
        event.target.value == 'yes'
            ? setVolumeDiscountEnabled(true)
            : setVolumeDiscountEnabled(false)
    }

    const handleServiceLevelChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value)
        event.target.value == 'fillRate'
            ? setServiceLevel('fillRate')
            : setServiceLevel('cycleServiceLevel')
    }

    // General function to export Form label
    const FormLabel = (params: { label: string }) => {
        return (
            <Typography variant="subtitle1" fontWeight="bold">
                {params.label}
            </Typography>
        )
    }

    // General function to export Form Sub label
    const FormSubLabel = (params: { subLabel: string }) => {
        return (
            <Typography variant="caption" fontStyle="italic">
                {params.subLabel}
            </Typography>
        )
    }

    // General function to export Form Text Field
    const FormTextField = (params: { disabled: boolean | undefined } ) => {
        return (
            <TextField
                size="small"
                variant="outlined"
                disabled={params?.disabled}
            ></TextField>
        )
    }

    // General function to export Form Upload Btn
    // 
    // const FormUploadButton = (params: { id: string ; disabled: boolean | undefined; handleClick: ButtonProps} ) => {
    const FormUploadButton = ( params: { id: string ; disabled: boolean | undefined}, {handleClick}: ButtonProps) => {      
        return (
            <Button
                variant="outlined"
                color="secondary"
                size="small"
                startIcon={<AddBoxOutlinedIcon />}
                id={params.id}
                // onClick={params.handleClick}
                disabled={params.disabled}
            >
                Upload File
                <input hidden accept=".csv" type="file"></input>
            </Button>
        )
    }

    // General function to export Form template download Btn
    const FormDownloadTemplateButton = (params: { id: string | undefined; filePath: string; fileName: string }) => {
        return (
         
                <Button
                    variant="outlined"
                    color="secondary"
                    size="small"    
                    id={params.id}
                    href={params.filePath}
                    // download={params.fileName}
                    target="_blank" 
                    // rel="noopener noreferrer"
                >
                    Download Template
                </Button>
        )
    }

    // General function to export Form Radio Field
    const FormRadioButton = (params: { id: string ; identifier: boolean ; options: { [x: string]: string }; onChange: ((event: React.ChangeEvent<HTMLInputElement>, value: string) => void) }) => {
        return (
            <FormControl >
                <RadioGroup
                    row
                    id={params.id}
                    value={ 
                        params.identifier
                            ? Object.keys(params.options)[0]
                            : Object.keys(params.options)[1]
                    }
                    onChange={params.onChange}
                >
                    {Object.keys(params.options).map((value, index) => (
                        <FormControlLabel
                            key={index}
                            value={value}
                            control={<Radio />}
                            label={params.options[value]}
                        />
                    ))}
                </RadioGroup>
            </FormControl>
        )
    }

    // General Custom function to export Form Radio Field
    const CustomFormRadioButton = (params: { id: string ; identifier: string; onChange: ((event: React.ChangeEvent<HTMLInputElement>, value: string) => void) ; options: { [x: string]: string } }) => {
        return (
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <RadioGroup
                    row
                    id={params.id}
                    value={params.identifier}
                    onChange={params.onChange}
                >
                    {Object.keys(params.options).map((value, index) => (
                        <Grid xs={6} item key={index}>
                            <>
                                <FormControlLabel
                                    key={index}
                                    value={value}
                                    control={<Radio />}
                                    label={params.options[value]}
                                />
                                <FormTextField
                                    disabled={serviceLevel !== value}
                                />
                            </>
                        </Grid>
                    ))}
                </RadioGroup>
            </Grid>
        )
    }

    const WeeklyForcastContainer = () => {

        const weeklyForcastFile = useRef() as MutableRefObject<HTMLInputElement>;

        const handleUploadClick  = () => {
            weeklyForcastFile.current.click()
        }

        const handleFileChange = async (event:  React.ChangeEvent<HTMLInputElement>) => {
            const fileObj = event.target.files && event.target.files[0];
            if (!fileObj) {
            return;
            }

            else {
                // call upload api

                const uploadPayload = {
                    'file': fileObj
                }

                const uploadResponse = await uploadDemandForecastData('post', uploadPayload);

                console.log(uploadResponse)

                setForcastFile(fileObj)
                setForecastFileName(fileObj.name)
            }


          
        }

        return (
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
           
            >
                <Grid item lg={6} md={6} sm={12} >
                    <FormLabel label="Upload weekly demand forecast" />
                </Grid>
                <Grid item container lg={6} md={6} sm={12} direction="column">
                    <Grid item container direction="row">
                        <Grid item lg={6} md={6} sm={6}>
                            <Button
                                variant="outlined"
                                color="secondary"
                                size="small"
                                startIcon={<AddBoxOutlinedIcon />}
                                id="weekly-forcast-uploader"
                                onClick={handleUploadClick}
                            >
                                Upload File
                                <input hidden ref={weeklyForcastFile} accept=".csv" type="file" onChange={handleFileChange}></input>
                            </Button>
                        </Grid> 
                        <Grid item lg={6} md={6} sm={6}>
                            <FormDownloadTemplateButton
                                id="weekly-forcast-template-downloader"
                                filePath={downloadableTemplates.DemandForcast}
                                fileName="Demand Forecast.csv"
                            />
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid item>
                            <Typography>{forecastFileName}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }

    const VendorCostTimeContainer = () => {

        const vendorForecastFile = useRef() as MutableRefObject<HTMLInputElement>;
        const handleUploadClick  = () => {
            vendorForecastFile.current.click()
        }

        const handleFileChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
            const fileObj = event.target.files && event.target.files[0];
            if (!fileObj) {
            return;
            }       
            setVendorFileName(fileObj.name)
            setVendorFile(fileObj)
        }

        return (
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <Grid item lg={6} md={6} sm={12} >
                    <FormLabel label="Upload vendor, costs & lead time details" />
                </Grid>

                <Grid item container lg={6} md={6} sm={12} direction="column">
                    <Grid item container direction="row">
                        <Grid item lg={6} md={6} sm={6}>
                            <Button
                                variant="outlined"
                                color="secondary"
                                size="small"
                                startIcon={<AddBoxOutlinedIcon />}
                                id="vendor-cost-time-uploader"
                                onClick={handleUploadClick}
                            >
                                Upload File
                                <input hidden ref={vendorForecastFile} accept=".csv" type="file" onChange={handleFileChange}></input>
                            </Button>
                        </Grid> 
                        <Grid item lg={6} md={6} sm={6}>
                            <FormDownloadTemplateButton
                                id="vendor-cost-time-template-downloader"
                                filePath={downloadableTemplates.VendorData}
                                fileName="Vendor Data.csv"
                            />
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid item>
                            <Typography>{vendorFileName}</Typography>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
        )
    }

    const EstimateLeadTimeContainer = () => {
        return (
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                 <Grid item lg={6} md={6} sm={12}>
                    <Grid container direction="column">
                            <Grid item>
                                <FormLabel label="Estimate lead time from purchase order data?" />
                            </Grid>
                            <Grid item>
                                <FormSubLabel subLabel="(If yes, lead time details in previous file will be overridden)" />
                            </Grid>
                        </Grid>
                </Grid>
                <Grid item container lg={6} md={6} sm={12} direction="column">
                    <FormRadioButton
                        options={{ yes: 'Yes', no: 'No' }}
                        identifier={leadTimeEnabled}
                        id="estimate-lead-time-selector"
                        onChange={handleLeadTimeChange}
                    />
                </Grid>
            </Grid>
        )
    }

    const PurchaseOrderContainer = () => {

        const purchaseOrderFile = useRef() as MutableRefObject<HTMLInputElement>;
        const handleUploadClick  = () => {
            purchaseOrderFile.current.click()
        }

        const handleFileChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
            const fileObj = event.target.files && event.target.files[0];
            if (!fileObj) {
            return;
            }
            setOrderFileName(fileObj.name)
            setOrderFile(fileObj)
        }

        return (
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <Grid item lg={6} md={6} sm={12} >
                    <FormLabel label="Upload purchase order data" />
                </Grid>

                <Grid item container lg={6} md={6} sm={12} direction="column">

                    <Grid item container direction="row">

                        <Grid item lg={6} md={6} sm={6}>
                            <Button
                                variant="outlined"
                                color="secondary"
                                size="small"
                                startIcon={<AddBoxOutlinedIcon />}
                                id="purchase-order-data-uploader"
                                onClick={handleUploadClick}
                                disabled={leadTimeEnabled ? false : true}
                            >
                                Upload File
                                <input hidden ref={purchaseOrderFile} accept=".csv" type="file" onChange={handleFileChange}></input>
                            </Button>
                        </Grid> 

                        <Grid item lg={6} md={6} sm={6}>
                            <FormDownloadTemplateButton
                                id="purchase-order-data-template-downloader"
                                filePath={downloadableTemplates.PurchaseOrder}
                                fileName="Purchase Order Data.csv"
                            />
                        </Grid>

                    </Grid>

                    <Grid item>
                        <Grid item>
                            <Typography>{orderFileName}</Typography>
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
        )
    }

    const VolumeDiscountContainer = () => {

        return (
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <Grid item lg={6} md={6} sm={12}>
                    <FormLabel label="Use volume discount?" />
                </Grid>

                <Grid item container lg={6} md={6} sm={12} direction="column">
                    <FormRadioButton
                        options={{ yes: 'Yes', no: 'No' }}
                        identifier={volumneDiscountEnabled}
                        id="volume-discount-selector"
                        onChange={handleVolumDiscountChange}
                    />
                </Grid>
            </Grid>
        )
    }

    const VolumeDiscountDetailsContainer = () => {

        const volumeDiscountFile = useRef() as MutableRefObject<HTMLInputElement>;
        const handleUploadClick  = () => {
            volumeDiscountFile.current.click()
        }

        const handleFileChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
            const fileObj = event.target.files && event.target.files[0];
            if (!fileObj) {
            return;
            }
            setVolumeDiscountFileName(fileObj.name)
            setVolumeDiscountFile(fileObj)
        }

        return (
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <Grid item lg={6} md={6} sm={12} >
                    <FormLabel label="Upload volume discount details" />
                </Grid>

                <Grid item container lg={6} md={6} sm={12} direction="column">

                    <Grid item container direction="row">

                        <Grid item lg={6} md={6} sm={6}>
                            <Button
                                variant="outlined"
                                color="secondary"
                                size="small"
                                startIcon={<AddBoxOutlinedIcon />}
                                onClick={handleUploadClick}
                                id="volume-discount-data-uploader"
                                disabled={volumneDiscountEnabled ? false : true}
                            >
                                Upload File
                                <input hidden ref={volumeDiscountFile} accept=".csv" type="file" onChange={handleFileChange}></input>
                            </Button>
                        </Grid> 

                        <Grid item lg={6} md={6} sm={6}>
                            <FormDownloadTemplateButton
                                id="volume-discount-template-downloader"
                                filePath={downloadableTemplates.VolumeDiscount}
                                fileName="Volume Discount Data.csv"
                            />
                        </Grid>

                    </Grid>

                    <Grid item>
                        <Grid item>
                            <Typography>{volumeDiscountFileName}</Typography>
                        </Grid>
                    </Grid>

                </Grid>
            </Grid>
        )
    }

    const AnnualHoldingCostContainer = () => {
        return (
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <Grid item lg={6} md={6} sm={12} >
                    <FormLabel label="Specify annual holding cost per unit" />
                </Grid>
            
                <Grid item container lg={6} md={6} sm={12} direction="column">
                    <Grid item lg={6} md={6} sm={12}>
                        <FormTextField disabled={false} />
                    </Grid>
                </Grid>
            </Grid>
        )
    }

    const ServiceLevelContainer = () => {
        return (
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
           
            >

                <Grid item lg={6} md={6} sm={12}>
                    <FormLabel label="Specify service level %" />
                </Grid>
               
                <Grid item container lg={6} md={6} sm={12} direction="column">
                    <CustomFormRadioButton
                        options={{
                            fillRate: 'Fill Rate',
                            cycleServiceLevel: 'Cycle Service Level',
                        }}
                        identifier={serviceLevel}
                        id="service-level-selector"
                        onChange={handleServiceLevelChange}
                    />
                </Grid>
            </Grid>
        )
    }

    const SubmitFormButton = () => {
        return (
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <Grid item>
                    <Button variant="contained" color="secondary">
                        GENERATE ORDER POLICY
                    </Button>
                </Grid>
            </Grid>
        )
    }

    return (
        <Container sx={{ flexGrow: 1 }} fixed >
            <Grid container direction="column" spacing={1}>

                {/* Upload forecast */}
                <Grid item>
                    <WeeklyForcastContainer />
                </Grid>

                {/* Vendor Cost and Lead Time */}
                <Grid item>
                    <VendorCostTimeContainer />
                </Grid>

                {/* Estimated Lead Time */}
                <Grid item>
                    <EstimateLeadTimeContainer />
                </Grid>

                {/* Purchase Order */}
                <Grid item>
                    <PurchaseOrderContainer />
                </Grid>

                {/* Apply volume discount */}
                <Grid item>
                    <VolumeDiscountContainer />
                </Grid>

                {/* Volume Discount */}
                <Grid item>
                    <VolumeDiscountDetailsContainer />
                </Grid>
                
                {/* Annual holding cost per unit */}
                <Grid item>
                    <AnnualHoldingCostContainer />
                </Grid>

                {/* Service Level */}
                <Grid item>
                    <ServiceLevelContainer />
                </Grid>

                {/* Generate Order Policy */}
                <Grid item>
                    <SubmitFormButton />
                </Grid>

            </Grid>
        </Container>
    )
}

export default OptimizerContainer;
