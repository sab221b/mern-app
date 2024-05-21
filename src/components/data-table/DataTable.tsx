import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';

interface DataTableProps {
    rows: GridRowsProp;
    columns: GridColDef[];
}

export default function DataTable({ rows, columns }: DataTableProps) {
    return (
        <div style={{ height: 400, width: '100%' }}>
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