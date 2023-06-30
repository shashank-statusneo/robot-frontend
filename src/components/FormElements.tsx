import {
    InputLabel,
    MenuItem,
    Select,
    FormControl,
    Typography, 
    TextField,
    Grid, 
    Paper,
    Backdrop,
    CircularProgress,
    Snackbar,
    Alert
} from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'


// General function to export Form Loader
export const FormBackdropElement = (props: {loader: boolean}) =>{
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={props.loader}
        >
            <CircularProgress color="primary" />
        </Backdrop>
    )
}

// General function to export Form SnackBar
export const FormSnackBarElement = (props: {message: boolean, onClose: any}) =>{
    return (
        <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            open={true}
            autoHideDuration={6000}
            onClose={props.onClose}
        >
        <Alert severity="error">{props.message}</Alert>
    </Snackbar>
    )
}

// General function to export Form Textfield
export const FormTextField = (props: {
    id: string,
    value: any,
    inputProps: any,
    onChange: any
    type: any,
}) => {
    return (
        <TextField
            id={props.id}
            type={props.type}
            value={props.value}
            onChange={props.onChange}
            size="medium"
            variant="outlined"
            InputProps={props.inputProps}
        />
    )
}

// General function to export Form label
export const FormLabel = (props: {label: string}) => {
    return (
        <Typography variant="h6" fontWeight="bold">
            {props.label}
        </Typography>
    )
}

// General function to export Top Bar App Label
export const TopBarAppLabel = (props: {
    label: string
    href: string
}) => {
    return (
        <Typography
            variant="h6" 
            noWrap
            component='a'
            href={props.href}
            color='inherit'
            sx={{
                textDecoration: 'none',
                marginX: '20px'
            }}
        >
            {props.label}
        </Typography>
    )
}

// General function to export Top Bar App Label
export const TopBarMenuLabel = (props: {
    label: string
    href: string
}) => {
    return (
        <Typography
            variant="h5" 
            noWrap
            component='a'
            href={props.href}
            color='inherit'
            sx={{
                textDecoration: 'none',
                marginX: '20px'
            }}
        >
            {props.label}
        </Typography>
    )
}

// General function to export Form Dropdown
export const FormDropDown = (props: { 
    id: string
    label: string
    value: any
    data: any,
    onChange: any
}
) => {   
    return (
        <FormControl fullWidth>
            <InputLabel id={props.id}>
                {props.label}
            </InputLabel>
            <Select
                value={props.value?.id ? props.value?.id: ''}
                label={props.label}
                labelId='vendor-select-input-label'
                onChange={props.onChange}
            >
                 {props.data.map((obj: any, key: any) => (
                    <MenuItem value={obj.id} key={key}>
                        {obj.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}


// General function to export Form Date Selector
export const FormDateSelector = (props: {
    label: string,
    value: any,
    onChange: any
}) => {

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label={props.label}
                value={props.value}
                onChange={props.onChange}
            />
        </LocalizationProvider>
    )                    
}

// General function to export Form Card
const FormCard = (params: { value: string | number; label: string}) => {
    return (
        <Paper elevation={2}>
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <Grid item>
                    <Typography variant="h4" fontWeight="bold">
                        {params.value}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body1">{params.label} </Typography>
                </Grid>
            </Grid>
        </Paper>
    )
}


type CardItems = {
    value: number | string | undefined
    label: string
 }[] 

// General function to export Form Card Field
export const FormCardField = (props: {items: CardItems}) => {
    return (
        <Grid 
            container 
            direction="row"  
            justifyContent="space-around"
            alignItems="center"
        >
            {props.items.map((obj: any, key: any) => (
                <Grid item lg={3} md={3} sm={6} key={key}>
                    <FormCard
                        value={obj.value}
                        label={obj.label}
                    />
            </Grid>
            ))}
        </Grid>
    )
}