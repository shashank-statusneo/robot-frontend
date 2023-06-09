import { GridColDef } from '@mui/x-data-grid';

export const benchmarkProductivityTableColumns: GridColDef[] = [
    {
        field: 'category_name',
        headerName: 'Category',
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        headerClassName: 'header',
    },
    {
        field: 'productivity_experienced_employee',
        headerName: 'Productivity - Experienced Employee',
        type: 'number',
        flex: 1,
        editable: true,
        headerAlign: 'center',
        align: 'center',
        headerClassName: 'header',
    },
    {
        field: 'productivity_new_employee',
        headerName: 'Productivity - New Employee',
        type: 'number',
        flex: 1,
        editable: true,
        headerAlign: 'center',
        align: 'center',
        headerClassName: 'header',
    },
]

export const demandForecastTableColumns: GridColDef[] = [{
    field: 'date',
    headerName: 'Date',
    flex: 1,
    headerAlign: 'center',
    align: 'center',
    headerClassName: 'header',
    minWidth: 200
}]
