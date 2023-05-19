import React, { useState, useRef, useEffect, MutableRefObject } from 'react'
import {
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

const OptimizerContainer = () => {

    type ButtonProps = {
        handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    };


    const [leadTimeEnabled, setLeadTimeEnabled] = useState(true)
    const [volumneDiscountEnabled, setVolumeDiscountEnabled] = useState(true)
    const [serviceLevel, setServiceLevel] = useState('fillRate')

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
            <FormControl>
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
                spacing={2}
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

    

    // const handleWeeklyForcastDownloadBtn = (event:  React.MouseEvent<HTMLAnchorElement, MouseEvent> | React.MouseEvent<HTMLSpanElement, MouseEvent>, fileName: string, filePath: string  ) => {
    //     event.preventDefault()
    //     console.log(fileName)
    //     console.log(filePath)
    //     console.log(event)
    // }

    // // Vendor Cost and Lead Time btn handlers
    // const handleVendorCostTimeUploadBtn = (event:  React.ChangeEvent<HTMLInputElement>) => {
    //     console.log(event)
    // }
    const handleVendorCostTimeDownloadBtn = (event:  React.MouseEvent<HTMLButtonElement>) => {
        console.log(event)
    }

    // // Purchase order btn handlers
    // const handlePurchaseOrderUploadBtn = (event:  React.ChangeEvent<HTMLInputElement>) => {
    //     console.log(event)
    // }
    const handlePurchaseOrderDownloadBtn = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

        console.log(event)

    }

    // // Volume Discount btn handlers
    // const handleVolumeDiscountUploadBtn = (event:  React.ChangeEvent<HTMLInputElement>) => {
    //     console.log(event)
    // }

    const handleVolumeDiscountDownloadBtn = (event:  React.MouseEvent<HTMLButtonElement>) => {
        console.log(event)
    }
   

    const WeeklyForcastContainer = () => {

        const weeklyForcastFile = useRef() as MutableRefObject<HTMLInputElement>;
        const [uploadFile, setUploadFile] = useState<File>()
        const [fileName, setFileName] = useState<string>('Test-file.csv')
        const [fileNameVisible, setFileNamefileNameVisible] = useState<boolean>(false)

        const handleUploadClick  = () => {
            weeklyForcastFile.current.click()
        }

        const handleFileChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
            const fileObj = event.target.files && event.target.files[0];
            if (!fileObj) {
            return;
            }

            console.log(fileObj)
            setUploadFile(fileObj)
            setFileName(fileObj.name)
            setFileNamefileNameVisible(true)
        }

        return (
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <Grid item xs={6}>
                    <FormLabel label="Upload weekly demand forecast" />
                </Grid>
                <Grid spacing={1} justifyContent='center' container direction='row' item xs={2} bgcolor='red'>
                    <Grid item>
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
                    <Grid item>
                    <Typography>{fileName}</Typography>
                    </Grid>
                </Grid>
                <Grid item xs={2}>
                    <FormDownloadTemplateButton
                        id="weekly-forcast-template-downloader"
                        filePath={downloadableTemplates.DemandForcast}
                        fileName="Demand Forecast.csv"
                    />
                </Grid>
            </Grid>
        )
    }

    const VendorCostTimeContainer = () => {
        return (
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <Grid item xs={6}>
                    <FormLabel label="Upload vendor, costs & lead time details" />
                </Grid>
                {/* <Grid item xs={2}>
                    <FormUploadButton
                        id="vendor-cost-time-uploader"
                        disabled={false}
                        onClick={handleVendorCostTimeUploadBtn}
                    />
                </Grid> */}
                <Grid item xs={2}>
                    <FormDownloadTemplateButton
                        id="vendor-cost-time-template-downloader"
                        filePath={downloadableTemplates.VendorData}
                        fileName="Vendor Data.csv"
                    />
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
                <Grid item xs={6}>
                    <Grid container direction="column">
                        <Grid item>
                            <FormLabel label="Estimate lead time from purchase order data?" />
                        </Grid>
                        <Grid item>
                            <FormSubLabel subLabel="(If yes, lead time details in previous file will be overridden)" />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={4}>
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
        return (
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <Grid item xs={6} container justifyContent="center">
                    <Grid item xs={6}>
                        <FormLabel label="Upload purchase order data" />
                    </Grid>
                </Grid>
                <Grid
                    item
                    xs={4}
                    container
                    justifyContent="center"
                    direction="row"
                >
                    {/* <Grid item xs={6}>
                        <FormUploadButton
                            id="purchase-order-data-uploader"
                            // onClick={handlePurchaseOrderUploadBtn}
                            disabled={leadTimeEnabled ? false : true}
                        />
                    </Grid> */}
                    <Grid item xs={6}>
                        <FormDownloadTemplateButton
                            id="purchase-order-data-template-downloader"
                            filePath={downloadableTemplates.PurchaseOrder}
                            fileName="Purchase Order Data.csv"
                        />
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
                <Grid item xs={6}>
                    <FormLabel label="Use volume discount?" />
                </Grid>

                <Grid item xs={4}>
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
        return (
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >
                <Grid item xs={6} container justifyContent="center">
                    <Grid item xs={6}>
                        <FormLabel label="Upload volume discount details" />
                    </Grid>
                </Grid>
                <Grid
                    item
                    xs={4}
                    container
                    justifyContent="center"
                    direction="row"
                >
                    {/* <Grid item xs={6}>
                        <FormUploadButton
                            id="volume-discount-data-uploader"
                            // onClick={handleVolumeDiscountUploadBtn}
                            disabled={volumneDiscountEnabled ? false : true}
                        />
                    </Grid> */}
                    <Grid item xs={6}>
                        <FormDownloadTemplateButton
                            id="volume-discount-template-downloader"
                            filePath={downloadableTemplates.VolumeDiscount}
                            fileName="Volume Discount Data.csv"
                        />
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
                <Grid item xs={6}>
                    <FormLabel label="Specify annual holding cost per unit" />
                </Grid>
                <Grid item xs={4}>
                    <Grid item xs={6}>
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
                <Grid item xs={6}>
                    <Grid container direction="column">
                        <Grid item>
                            <FormLabel label="Specify service level %" />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={4}>
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
                        GENERATE ORDER POLICy
                    </Button>
                </Grid>
            </Grid>
        )
    }

    return (
        <Grid container direction="column" justifyContent="center" spacing={2}>
            <Grid item>
                <WeeklyForcastContainer />
            </Grid>
            <Grid item>
                <VendorCostTimeContainer />
            </Grid>
            <Grid item>
                <Grid container direction="column">
                    <Grid container item>
                        <EstimateLeadTimeContainer />
                    </Grid>
                    <Grid container item>
                        <PurchaseOrderContainer />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container direction="column">
                    <Grid container item>
                        <VolumeDiscountContainer />
                    </Grid>
                    <Grid container item>
                        <VolumeDiscountDetailsContainer />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <AnnualHoldingCostContainer />
            </Grid>
            <Grid item>
                <ServiceLevelContainer />
            </Grid>
            <Grid item>
                <SubmitFormButton />
            </Grid>
        </Grid>
    )
}

export default OptimizerContainer
