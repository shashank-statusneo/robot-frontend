import { 
    Button, 
    FormControl, 
    RadioGroup, 
    FormControlLabel, 
    Radio, 
    Typography, 
    Grid, 
    Backdrop, 
    CircularProgress, 
    TextField, 
    Paper,
    TableContainer, 
    Table, 
    TableRow,
    TableCell, 
    TableHead, 
    TableBody
} from '@mui/material'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'



import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


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
    value: any,
    onChange: any
}) => {
    return (
        <TextField
            id={props.id}
            value={props.value}
            onChange={props.onChange}
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
    value: any,
    onChange: any
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
                        value={props.value}
                        onChange={props.onChange}
                    />
                </Grid>
            </Grid>

        </Grid>
    )
}


export const FormMultiTextElement = (props: {
    id: string, 
    label: string
    value: any,
    onChange: any
    options: any

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

                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >   
                    <Grid container direction="row" item>
                        <RadioGroup
                            row
                            id={props.id}
                            value={props.value}
                            onChange={props.onChange}
                        >
                            {props.options.map((obj: any, key: any) => (
                                <FormCustomRadioField 
                                    key={key}
                                    index={key}
                                    value={obj.value}
                                    label={obj.label}
                                    id={obj.id}
                                    disabled={props.value !==obj.value}
                                    textValue={obj.textValue}
                                    onChange={obj.onChange}
                                    />
                                ))}
                        </RadioGroup>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}


const FormCustomRadioField = (props: {
    index: number,
    value: string, 
    label: string, 
    id: string, 
    disabled: boolean,
    textValue: string,
    onChange: any
}) => {
    return (
        <Grid item lg={6} md={6} sm={12}>
            <FormControlLabel
                key={props.index}
                value={props.value}
                control={<Radio />}
                label={props.label}
            />
            <TextField
                id={props.id}
                size="small"
                variant="outlined"
                disabled={props.disabled}
                value={props.textValue}
                onChange={props.onChange}
            />
        </Grid>
    )
}


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



export const FormCardField = (props: {items: CardItems}) => {
    return (
        <Grid 
            container 
            direction="row"  
            justifyContent="center"
            alignItems="center"
            spacing={1}
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

type TableHeaders = string[]

type TableData = {
    vendor: string | undefined,
    cost: number | undefined, 
    order_level: number | undefined, 
    reorder_qty: number | undefined
}[]

export const FormTable = (props: {
    tableName: string
    tableHeaders: TableHeaders,
    tableData: TableData
    totalOrderQty: number, 
    totalCost: number,
    downloadBtnId: string,
    onClickFunc: any
}) => {
    return (
        <Grid
            container
            direction="column"
            spacing={1}
            justifyContent="center"
            alignItems="center"
        >
            <Grid item>
                <Typography variant="h6">
                    {props.tableName}
                </Typography>
            </Grid>
            <Grid item>
                <TableContainer component={Paper}>
                    <Table aria-label="policy-details-table">
                        <TableHead>
                            <TableRow>
                                {props.tableHeaders.map((row: string, key: any) => (
                                    <TableCell key={key}>{row}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {props.tableData.map((obj: any, key: any) => (
                                    <TableRow
                                        key={key}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell>{obj.vendor}</TableCell>
                                        <TableCell>{obj.order_level}</TableCell>
                                        <TableCell>{obj.reorder_qty}</TableCell>
                                        <TableCell>{obj.cost}</TableCell>
                                    </TableRow>
                            ))}
                            <TableRow>
                                <TableCell colSpan={2} align='center'>Total</TableCell>
                                <TableCell>{props.totalOrderQty}</TableCell>
                                <TableCell>{props.totalCost}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item>
                <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    id={props.downloadBtnId}
                    onClick={props.onClickFunc}
                >
                    DOWNLOAD TABLE AS EXCEL FILE
                </Button>
            </Grid>
        </Grid>
    )
}

type LineData = {
    dataKey: string 
    stroke: string 
}[]

export const FormGraph = (props: {
    label: string
    xLabel: string
    yLabel: string
    data: any
    lineData: LineData
}) => {
    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
            <Grid item>
                <Typography variant="h6">
                    {props.label}
                </Typography>
            </Grid>

            <Grid item>
                <Paper
                    sx={{
                        width: 450,
                        height: 400,
                    }}
                >
                    <ResponsiveContainer width='100%' height='100%'>
                        <LineChart
                            width={450}
                            height={400}
                            data={props.data}
                            margin={{
                                top: 10,
                                right: 50,
                                left: 10,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray='3 3' />
                            <XAxis dataKey={props.xLabel} />
                            <YAxis dataKey={props.yLabel} />
                            <Tooltip />
                            {/* <Legend/> */}
                            {props.lineData.map((obj:any, key: any) => (
                                 <Line key={key} type='monotone' dataKey={obj.dataKey} stroke={obj.stroke} activeDot={{ r: 8 }} />
                            ))}
                        </LineChart>
                    </ResponsiveContainer>
                </Paper>
            </Grid>
        </Grid>
    )
}


export const FormSimulation = (props: {
    btnId: string
    label: string,
}) => {
    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={3}
        
        >   
            {/* <Grid item>
                <Typography variant="h6">
                    {props.label}
                </Typography>
            </Grid> */}

            <Grid 
                container  
                justifyContent="center"
                alignItems="center" 
            item>
                <Grid container item justifyContent="center" alignItems="center" >
                    <Grid item lg={6} md={6} sm={12}>
                        <FormTextElement 
                            label='Reorder Point'
                            id='reorder_point'
                            value=''
                            onChange={() => console.log('clicked')}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12}>
                        <FormTextElement 
                            label='Reorder Qty'
                            id='reorder_qty'
                            value=''
                            onChange={() => console.log('clicked')}
                        />
                    </Grid>
                </Grid>
                <Grid container item  justifyContent="center"
                alignItems="center" >
                    <Grid item lg={6} md={6} sm={12}>
                        <FormTextElement
                            label='Average lead Time' 
                            id='average_lead_time'
                            value=''
                            onChange={() => console.log('clicked')}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} >
                        <FormTextElement
                            label='SD of lead time' 
                            id='sd_lead_time'
                            value=''
                            onChange={() => console.log('clicked')}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    id={props.btnId}
                    onClick={() => console.log('btn clicked')}
                >
                    RUN SIMULATION
                </Button>
            </Grid>
        </Grid>
    )
}