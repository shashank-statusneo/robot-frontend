import { 
    Button
} from '@mui/material'


// General function to export Form Primary Button
export const PrimaryButton = (props: {
    id: string, 
    label: string
    onClick: any,
    disabled: boolean
}
) => {
    return (
        <Button
            variant="contained"
            color="primary"
            size="medium"
            id={props.id}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.label}
        </Button>
    )
}

// General function to export Form upload Btn
export const FormUploadButton = (props: {
    id: string, 
    label: string
    fileRef: any
    loader: boolean,
    onChange: any,
    disabled: boolean
}
) => {
    return (
        <Button
            variant="outlined"
            color="primary"
            size="medium"
            id={props.id}
            onClick={() => !props.loader && props.fileRef.current.click()}
            disabled={props.disabled}
            sx={{fontWeight: 'bold'}}
        >
            {props.label}
            <input hidden ref={props.fileRef} accept=".csv" type="file" onChange={props.onChange}></input>
        </Button>
    )
}