import { Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';

interface DataTableProps {
    rows: GridRowsProp;
    columns: GridColDef[];
    title: string;
}

export default function DataTable({ rows, columns, title }: DataTableProps) {
    return (
        <div style={{ height: 400, width: '100%' }}>
            <Typography color={"white"} className='text-capitalize pt-3 mb-3 mx-3' variant="h4" component="div">
                {title}
            </Typography>
            <DataGrid
                className='bg-white'
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </div>
    );
}