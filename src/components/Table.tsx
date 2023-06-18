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

import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useState } from 'react'

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        fontWeight: 'bold',
        fontSize: '1rem',
        borderWidth: 1,
        borderColor: 'white',
        borderStyle: 'solid',
    },
    [`&.${tableCellClasses.body}`]: {
        backgroundColor: '#F2F1F2',
        fontWeight: 'bold',
        fontSize: '0.9rem',
        borderWidth: 1,
        borderColor: 'white',
        borderStyle: 'solid',
    },
}))

export const FormTable = (props: {
    id: string
    tableHeaders: any
    tableKeys: any
    tableData: any
}) => {
    return (
        <TableContainer component={Paper}>
            <Table aria-label={props.id}>
                <TableHead>
                    <TableRow>
                        {props.tableHeaders.map((row: string, key: any) => (
                            <StyledTableCell align='center' key={key}>
                                {row}
                            </StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {props.tableData.map((obj: any, key: any) => (
                        <TableRow key={key}>
                            {props.tableKeys.map((row: string, key: any) => (
                                <StyledTableCell align='center' key={key}>
                                    {obj[row]}
                                </StyledTableCell>
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
        borderStyle: 'solid',
    },
}))

export const FormDataGrid = (props: {
    columns: GridColDef[]
    rows: any
    processDataChange: any
}) => {
    return (
        <StyledDataGrid
            processRowUpdate={props.processDataChange}
            rows={props.rows}
            columns={props.columns}
            hideFooter={true}
            disableRowSelectionOnClick
            // scrollbarSize={0}
            showCellVerticalBorder={true}
            showColumnVerticalBorder={true}
        />
    )
}

export const FormGraph = (props: {
    data: any
    xLabel: any
    yLabel: any
    lineData: any
}) => {
    const [graphProps, setGraphProps] = useState(
        props.lineData.reduce(
            (line: any, { key }: any) => {
                line[key] = false
                return line
            },
            { hover: null },
        ),
    )

    const handleLegendMouseEnter = (e: any) => {
        if (!graphProps[e.dataKey]) {
            setGraphProps({ ...graphProps, hover: e.dataKey })
        }
    }

    const handleLegendMouseLeave = (e: any) => {
        setGraphProps({ ...graphProps, hover: null })
    }

    const selectLine = (e: any) => {
        console.log(e.dataKey)

        setGraphProps({
            ...graphProps,
            [e.dataKey]: !graphProps[e.dataKey],
            hover: null,
        })
    }

    return (
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
                <CartesianGrid strokeDasharray='4 4' />
                <XAxis dataKey={props.xLabel} />
                <YAxis dataKey={props.yLabel} />
                <Tooltip />
                <Legend
                    align='right'
                    iconType='square'
                    onClick={selectLine}
                    onMouseOver={handleLegendMouseEnter}
                    onMouseOut={handleLegendMouseLeave}
                />
                {props.lineData.map((obj: any, key: any) => (
                    <Line
                        key={key}
                        type='monotone'
                        dataKey={obj.key}
                        stroke={obj.stroke}
                        activeDot={{ r: 8 }}
                        id={props.xLabel}
                        hide={graphProps[obj.key] === true}
                        strokeWidth={Number(
                            graphProps.hover === obj.key || !graphProps.hover
                                ? 1.5
                                : 0.8,
                        )}
                    />
                ))}
            </LineChart>
        </ResponsiveContainer>
    )
}
