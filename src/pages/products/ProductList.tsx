import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import Axios from '../../helpers/interceptor';
import { toast } from 'react-toastify';
import "./product.scss"
import { useNavigate } from 'react-router-dom';

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const onCardClick = (params: string) => {
        navigate(`/product/${params}`)
    }

    const getProducts = useCallback(async () => {
        try {
            const response = await Axios.get('/products');
            if (response.data) {
                setProducts(response.data);
            }
        } catch (error: any) {
            toast.error(error.response.message || error.response.data.message);
        }
    }, []);

    useEffect(() => {
        getProducts();
    }, [getProducts])

    return (
        <Box>
            <Box padding={"1rem"} sx={{ flexGrow: 1 }}>
                <Typography color={"white"} className='text-capitalize mb-3' variant="h4" component="div">
                    Product List
                </Typography>
                <Grid container spacing={{ xs: 2, md: 3, lg: 3, xl: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 12, xl: 12 }}>
                    {products.map((item: any, index: number) => (
                        <Grid xs={5} sm={4} md={4} lg={4} xl={4} key={index}>
                            <Card className='bg-light' >
                                <CardActionArea onClick={() => onCardClick(item._id)} >
                                    <CardContent>
                                        <Box className={"d-flex"}>
                                            <Box>
                                                <img className='product-image' src={item.images[0]} alt="" />
                                            </Box>
                                            <Box width={'100%'} marginLeft={2}>
                                                <Typography className='text-capitalize mb-0' gutterBottom variant="h5" component="div">
                                                    {item?.name}
                                                </Typography>
                                                <div className={"row mx-0"}>
                                                    <div className='col-7'>
                                                        <Typography variant="body2" color="text.secondary">
                                                            Brand: {item?.brand}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            Size: {item?.attributes?.size}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            Weight: {item?.attributes?.weight}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            Available Quantity: {item?.stock_quantity}
                                                        </Typography>
                                                    </div>
                                                    <div className='col-5 row align-items-center'>
                                                        <div>
                                                            <Typography variant="h4" color="CaptionText">
                                                                Price
                                                            </Typography>
                                                            <Typography variant="h4" color="#000">
                                                                &#8377;{item?.price}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Box>
                                        </Box>
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