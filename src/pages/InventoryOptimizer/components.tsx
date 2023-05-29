
// General Custom function to export Form Radio Field
// const CustomFormRadioButton = (params: { id: string ; identifier: string; onChange: ((event: React.ChangeEvent<HTMLInputElement>, value: string) => void) ; options: { [x: string]: string } }) => {
            
//     return (
//         <Grid
//             container
//             direction="row"
//             justifyContent="center"
//             alignItems="center"
//         >
//             <RadioGroup
//                 row
//                 id={params.id}
//                 value={params.identifier}
//                 onChange={params.onChange}
//             >
//                 {Object.keys(params.options).map((value, index) => (
//                     <Grid xs={6} item key={index}>
//                         <>
//                             <FormControlLabel
//                                 key={index}
//                                 value={value}
//                                 control={<Radio />}
//                                 label={params.options[value]}
//                             />
//                             <TextField
//                                 id="service-level-percentage"
//                                 size="small"
//                                 variant="outlined"
//                                 disabled={serviceLevel !== value}
//                                 // TODO:
//                                 value={ serviceLevel === 'fillRate' ? formPayload.fillRate : formPayload.cycleServiceLevel }
//                                 onChange={(e) => {
//                                     serviceLevel === 'fillRate'
//                                     ? setFormPayload({...formPayload, fillRate: parseInt(e.target.value)})
//                                     : setFormPayload({...formPayload, cycleServiceLevel: parseInt(e.target.value)})
//                                 }
//                                 }
//                             ></TextField>
//                         </>
//                     </Grid>
//                 ))}
//             </RadioGroup>
//         </Grid>
//     )
// }




// General function to export Form Upload Btn
// 
// const FormUploadButton = (params: { id: string ; disabled: boolean | undefined; handleClick: ButtonProps} ) => {
// const FormUploadButton = ( params: { id: string ; disabled: boolean | undefined}, {handleClick}: ButtonProps) => {      
//     return (
//         <Button
//             variant="outlined"
//             color="secondary"
//             size="small"
//             startIcon={<AddBoxOutlinedIcon />}
//             id={params.id}
//             // onClick={params.handleClick}
//             disabled={params.disabled}
//         >
//             Upload File
//             <input hidden accept=".csv" type="file"></input>
//         </Button>
//     )
// }
