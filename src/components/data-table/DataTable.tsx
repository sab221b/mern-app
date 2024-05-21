import { Button, Typography } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef, GridRenderCellParams, GridRowParams, GridRowsProp } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface DataTableProps {
    rows: GridRowsProp;
    columns: GridColDef[];
    title: string;
    navigationKey?: string;
}

export default function DataTable({ rows, columns, title, navigationKey }: DataTableProps) {
    const navigate = useNavigate();

    return (
        <div style={{ height: 400, width: '100%' }}>
            <Typography color={"white"} className='text-capitalize pt-3 mb-3 mx-3' variant="h4" component="div">
                {title}
            </Typography>
            <DataGrid
                className='bg-white'
                rows={rows}
                columns={[...columns,
                {
                    field: 'actions',
                    headerName: 'Actions',
                    type: 'actions',
                    width: 80,
                    getActions: (params: GridRowParams) => [
                        <GridActionsCellItem
                            icon={<EditIcon />}
                            label="Edit"
                            onClick={() => {
                                navigate(`/${navigationKey}/${params.id}`);
                            }}
                        />,
                        <GridActionsCellItem
                            icon={<DeleteIcon />}
                            label="Delete"
                            onClick={() => { }}
                        />,
                    ],
                },
                ]}
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