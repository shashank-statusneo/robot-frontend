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

export const demandForecastTableColumns: GridColDef[] = [
    {
        field: 'date',
        headerName: 'Date',
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        headerClassName: 'header',
    },
    {
        field: 'category_1',
        headerName: 'Category 1',
        type: 'number',
        flex: 1,
        editable: true,
        headerAlign: 'center',
        align: 'center',
        headerClassName: 'header',
    },
    {
        field: 'category_2',
        headerName: 'Category 2',
        type: 'number',
        flex: 1,
        editable: true,
        headerAlign: 'center',
        align: 'center',
        headerClassName: 'header',
    },
    {
        field: 'category_3',
        headerName: 'Category 3',
        type: 'number',
        flex: 1,
        editable: true,
        headerAlign: 'center',
        align: 'center',
        headerClassName: 'header',
    },
    {
        field: 'category_4',
        headerName: 'Category 4',
        type: 'number',
        flex: 1,
        editable: true,
        headerAlign: 'center',
        align: 'center',
        headerClassName: 'header',
    },
    {
        field: 'category_5',
        headerName: 'Category 5',
        type: 'number',
        flex: 1,
        editable: true,
        headerAlign: 'center',
        align: 'center',
        headerClassName: 'header',
    },
]


export const demandTableData = [
    {
        id: 1,
        date: '2023-06-01',
        category_1: 1000,
        category_2: 800,
        category_3: 700,
        category_4: 800,
        category_5: 250,
    },
    {
        id: 2,
        date: '2023-06-02',
        category_1: 1200,
        category_2: 900,
        category_3: 800,
        category_4: 900,
        category_5: 400,
    },
    {   
        id: 3,
        date: '2023-06-03',
        category_1: 1300,
        category_2: 1000,
        category_3: 900,
        category_4: 500,
        category_5: 450,
    },
    {
        id: 4,
        date: '2023-06-04',
        category_1: 1400,
        category_2: 1100,
        category_3: 900,
        category_4: 500,
        category_5: 475,
    },
   
]

export const updateData = [
    {
        date: '2023-05-24',
        categories: [
            {
                id: 1,
                category_name: 'category 1',
                demand: 269,
            },
            {
                id: 2,
                category_name: 'category 2',
                demand: 150,
            },
            {
                id: 3,
                category_name: 'category 3',
                demand: 563,
            },
            {
                id: 4,
                category_name: 'category 4',
                demand: 53,
            },
            {
                id: 5,
                category_name: 'category 5',
                demand: 63,
            },
        ],
    },
    {
        date: '2023-05-25',
        categories: [
            {
                id: 6,
                category_name: 'category 1',
                demand: 269,
            },
            {
                id: 7,
                category_name: 'category 2',
                demand: 123,
            },
            {
                id: 8,
                category_name: 'category 3',
                demand: 600,
            },
            {
                id: 9,
                category_name: 'category 4',
                demand: 127,
            },
            {
                id: 10,
                category_name: 'category 5',
                demand: 709,
            },
        ],
    },
]