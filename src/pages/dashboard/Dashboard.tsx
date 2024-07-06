import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';

export default function Dashboard() {

    const userData = useSelector((state: any) => state.app.user.userData);
    const userRole = userData?.role;

    return (
        <Box padding={"2rem"} sx={{ flexGrow: 1 }}>
            <Typography color={userRole?.key === 'agent' ? 'black' : 'white'} className='text-capitalize mb-3' variant="h4" component="div">
                Dashboard under contruction
            </Typography>
        </Box>
    );
}