
import {ChangeEventHandler, MutableRefObject} from 'react'

import { Button, FormControl, RadioGroup, FormControlLabel, Radio, Typography, Grid, Backdrop, CircularProgress, TextField } from '@mui/material'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'


export const FormBackdropElement = (props: {loader: boolean}) =>{
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={props.loader}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}


// General function to export Form label
export const FormLabel = (props: {label: string}) => {
    return (
        <Typography variant="subtitle1" fontWeight="bold">
            {props.label}
        </Typography>
    )
}

// General function to export Form Sub label
const FormSubLabel = (props: { subLabel: string }) => {
    return (
        <Typography variant="caption" fontStyle="italic">
            {props.subLabel}
        </Typography>
    )
}

// General function to export Form template upload Btn
export const FormUploadButton = (props: {
    id: string, 
    fileRef: any
    loader: boolean,
    onChange: any,
    disabled: boolean
}
) => {
    return (
        <Button
            variant="outlined"
            color="secondary"
            size="small"
            startIcon={<AddBoxOutlinedIcon />}
            id={props.id}
            onClick={() => !props.loader && props.fileRef.current.click()}
            disabled={props.disabled}
        >
            Upload File
            <input hidden ref={props.fileRef} accept=".csv" type="file" onChange={props.onChange}></input>
        </Button>
    )
}


// General function to export Form template download Btn
export const FormDownloadTemplateButton = (props:{
    id: string, 
    filePath: string, 
    fileName: string } ) => 
    {
        return (
                <Button
                    variant="outlined"
                    color="secondary"
                    size="small"    
                    id={props.id}
                    href={props.filePath}
                    target="_blank" 
                    // download={params.fileName}
                    // rel="noopener noreferrer"
                >
                    Download Template
                </Button>
        )
}


  // General function to export Form Radio Field
export const FormRadioButton = (props:{
    id: string,
    identifier: boolean,
    options: { [x: string]: string },
    onChange: ((event: React.ChangeEvent<HTMLInputElement>, value: string) => void)}) => {
        return (
            <FormControl >
                <RadioGroup
                    row
                    id={props.id}
                    value={ 
                        props.identifier
                            ? Object.keys(props.options)[0]
                            : Object.keys(props.options)[1]
                    }
                    onChange={props.onChange}
                >
                    {Object.keys(props.options).map((value, index) => (
                        <FormControlLabel
                            key={index}
                            value={value}
                            control={<Radio />}
                            label={props.options[value]}
                        />
                    ))}
                </RadioGroup>
            </FormControl>
        )
}

export const FormTextField = (props: {
    id: string,
    // label: string,
}) => {
    return (
        <TextField
            id={props.id}
            // label={props.label}
            // value={}
            name={props.id}
            size="small"
            variant="outlined"
        />
    )
}



export const FormElement = (props: {
    label: string,
    uploadBtnElement: any,
    backdropElement: any,
    downloadBtnElement: any
    fileName: string
}) => {
    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            <Grid item lg={6} md={6} sm={12} >
                <FormLabel label={props.label}/>
            </Grid>
            <Grid item container lg={6} md={6} sm={12} direction="column">
                <Grid item container direction="row">
                    <Grid item lg={6} md={6} sm={6}>
                        <props.uploadBtnElement/>
                        <props.backdropElement/>
                    </Grid> 
                    <Grid item lg={6} md={6} sm={6}>
                        <props.downloadBtnElement/>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid item>
                        <Typography>{props.fileName}</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}


export const FormRadioElement = (props: {
    id: string,
    label: string, 
    subLabel: string,
    identifier: boolean,
    options: { [x: string]: string },
    onChange: ((event: React.ChangeEvent<HTMLInputElement>, value: string) => void)
}) => {
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
                        <FormLabel label={props.label}/>
                    </Grid>
                    <Grid item>
                        <FormSubLabel subLabel={props.subLabel} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item container lg={6} md={6} sm={12} direction="column">
                <FormRadioButton id={props.id} identifier={props.identifier} options={props.options} onChange={props.onChange}/>
            </Grid>
        </Grid>
    )
}

export const FormTextElement = (props: {
    id: string,
    label: string,
}) => {
    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
        >
            <Grid item lg={6} md={6} sm={12} >
                <FormLabel label={props.label} />
            </Grid>

            <Grid item container lg={6} md={6} sm={12} direction="column">
                <Grid item lg={6} md={6} sm={12}>
                    <FormTextField
                        id={props.id}
                    />
                </Grid>
            </Grid>

        </Grid>
    )
}
  