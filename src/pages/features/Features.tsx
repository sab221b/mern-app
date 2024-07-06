import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import Axios from '../../helpers/interceptor';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getData } from '../../helpers/storage';


export default function Features() {

    const [features, setFeatures] = useState([])
    const navigate = useNavigate();

    const onCardClick = (params: string) => {
        navigate(`${params}/list`)
    }

    let roleId = useSelector((state: any) => {
        const roleId = state.app.user.roleId;
        return roleId || getData().roleId;
    });

    const getRoleFeatures = useCallback(async () => {
        try {
            const response = await Axios.get(`/roles/${roleId}`);
            if (response.data) {
                setFeatures(response.data.features);
            }
        } catch (error: any) {
            toast.error(error.response.message || error.response.data.message);
        }
    }, [roleId]);

    useEffect(() => {
        getRoleFeatures();
    }, [getRoleFeatures]);

    return (
        <Box>
            <Box padding={"1rem"} sx={{ flexGrow: 1 }}>
                <Typography color={"white"} className='text-capitalize mb-3' variant="h4" component="div">
                    Features
                </Typography>
                <Grid container spacing={{ xs: 2, md: 3, lg: 5, xl: 5 }} columns={{ xs: 4, sm: 8, md: 12, lg: 12, xl: 12 }}>
                    {features.map((item: any, index: number) => (
                        <Grid xs={2} sm={4} md={4} lg={3} xl={4} key={index}>
                            <Card className='bg-light' sx={{ maxWidth: 345 }}>
                                <CardActionArea onClick={() => onCardClick(item.key)} >
                                    <CardContent>
                                        <Typography className='text-capitalize' gutterBottom variant="h5" component="div">
                                            {item?.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {item?.description}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}