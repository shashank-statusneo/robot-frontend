import { 
    Paper,
    TableContainer, 
    Table, 
    TableRow,
    TableCell, 
    TableHead, 
    TableBody, 
    tableCellClasses, 
    styled, 
} from '@mui/material'

import {
    DataGrid, 
    GridColDef, 
} from '@mui/x-data-grid'



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,    
      fontWeight: 'bold',
      fontSize: '1rem',
      borderWidth: 1, 
      borderColor: 'white',
      borderStyle: 'solid'
    },
    [`&.${tableCellClasses.body}`]: {
      backgroundColor: '#F2F1F2',
      fontWeight: 'bold',
      fontSize: '0.9rem',
      borderWidth: 1, 
      borderColor: 'white',
      borderStyle: 'solid'
    },
  }));

export const FormTable = (props: {
    id: string
    tableName: string
    tableHeaders: any,
    tableKeys: any,
    tableData: any
}) => {
    return (
        <TableContainer component={Paper}>
            <Table aria-label={props.id}>
                <TableHead>
                    <TableRow>
                        {props.tableHeaders.map((row: string, key: any) => (
                            <StyledTableCell align='center' key={key} >{row}</StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {props.tableData.map((obj: any, key: any) => (
                            <TableRow
                                key={key}
                            >
                                {props.tableKeys.map((row: string, key: any) => (
                                    <StyledTableCell align='center' key={key}>{obj[row]}</StyledTableCell>
                                ))}
                            </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    '& .header': {
        backgroundColor: '#4471C2',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '1rem',
        borderWidth: 1, 
        borderColor: 'white',
        borderStyle: 'solid'
    }
  }));


export const FormDataGrid = (props: {
    columns: GridColDef[],
    rows: any,  
    processDataChange: any,  
}) => {

    return (
        <StyledDataGrid

            processRowUpdate={props.processDataChange}
            rows={props.rows}
            columns={props.columns}
            initialState={{
            pagination: {
                paginationModel: {
                pageSize: 5,
                },
            },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
      />
    )
} 