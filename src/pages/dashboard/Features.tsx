import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { useEffect } from 'react';
import Axios from '../../helpers/interceptor';
import { Card, CardActionArea, CardContent, CardMedia, Fab, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { actions as featureActions } from "../../store/reducers/featureSlice";
import { useDispatch, useSelector } from 'react-redux';

export default function Features() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const features: any[] = useSelector((state: any) => state?.app?.feature?.featureData) || [];

    useEffect(() => {
        if (!features.length) {
            getFeatures()
        }
    }, [features]);

    const getFeatures = async () => {
        try {
            const resp = await Axios.get('/features');
            dispatch(featureActions.setFeatures(resp.data))
            console.log('features---list', resp.data);
        } catch (error) {
            console.error("error fetching user from session", error);
        }
    };

    const onCardClick = (params: string) => {
        navigate(`${params}/list`)
    }

    return (
        <Box padding={{ xs: 2, md: 3, lg: 5, xl: 5 }} sx={{ flexGrow: 1 }}>
            <Typography className='text-capitalize mb-3' variant="h4" component="div">
                Features
            </Typography>
            <Grid container spacing={{ xs: 2, md: 3, lg: 5, xl: 5 }} columns={{ xs: 4, sm: 8, md: 12, lg: 12, xl: 12 }}>
                {features.map((item: any, index: number) => (
                    <Grid xs={2} sm={4} md={4} lg={3} xl={4} key={index}>
                        <Card sx={{ maxWidth: 345 }}>
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
    );
}