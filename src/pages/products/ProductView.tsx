import Box from '@mui/material/Box';
import { Button, Card, Chip, Fab, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Axios from '../../helpers/interceptor';
import { toast } from 'react-toastify';
import "./product.scss"
import moment from 'moment';
import { useSelector } from 'react-redux';

export default function ProductView() {
    const userData = useSelector((state: any) => state.app.user.userData);
    const [product, setProduct] = useState<any>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [totalAmount, setTotalAmount] = useState<number>(1);
    const { productID } = useParams();

    const getProducts = useCallback(async () => {
        try {
            console.log('productId', productID);
            const response = await Axios.get(`/products/${productID}`);
            if (response.data) {
                setProduct(response.data);
            }
        } catch (error: any) {
            toast.error(error.response.message || error.response.data.message);
        }
    }, [productID]);

    useEffect(() => {
        getProducts();
    }, [getProducts])


    useEffect(() => {
        if (quantity > 0 && product?.price) {
            setTotalAmount(product.price * quantity);
        }
    }, [quantity, product?.price]);

    const addToCart = async () => {
        try {
            const { data: cartData } = await Axios.get(`/cart/user`);
            const cartItem = {
                product: productID,
                quantity,
                unitPrice: product?.price,
                amount: Number(product?.price * quantity),
            };
            const items = cartData?.items || [];
            items.push(cartItem)
            const payload = { user: userData?._id, active: true, items };
            const { data } = await Axios.post(`/cart/${cartData?._id || 'create'}`, payload);
            data && toast.success(data?.message);
        } catch (error: any) {
            toast.error(error.response.message || error.response.data.message);
        }
    }


    return (
        <Box>
            <Box padding={"1rem"} sx={{ flexGrow: 1 }}>
                <Box className='row mx-0'>
                    <Box className='col-12 col-sm-12 col-md-4 text-center my-3'>
                        <Card className='img-card-height'>
                            <img className='product-view' src={product?.images[0]} alt="" />
                        </Card>
                    </Box>
                    <Box className='col-12 col-sm-12 col-md-8 my-3'>
                        <Card className='p-3 img-card-height'>
                            <Typography variant="h4" color="black">
                                {product?.brand} {product?.name}
                            </Typography>
                            <Box>
                                <Chip className='my-2' color="primary" label="4.2 &#9733;" />
                                <Typography className='mx-2' variant="caption" color="grey">
                                    73,617 Ratings & 4,132 Reviews
                                </Typography>
                            </Box>
                            <Typography className='my-1' variant="h3" color="black">
                                &#8377;{product?.price}
                            </Typography>
                            <Typography variant="body2" color="grey">
                                Mfg Date: {moment(product?.mfg_date).format("DD/MM/YYYY")}
                            </Typography>
                            <Typography variant="body2" color="grey">
                                Available Quantity: {product?.stock_quantity}
                            </Typography>
                        </Card>
                    </Box>
                </Box>

                <Box className='row mx-0'>
                    <Box className='col-12 col-sm-12 col-md-9 my-3'>
                        <Card className='p-3 img-card-height'>
                            <Typography variant="h4" color="black">
                                Product Details
                            </Typography>
                            <Box>

                            </Box>
                            <Typography variant="caption" color="grey">
                                {product?.description}
                            </Typography>
                            <Typography variant="body2" color="grey">
                                Brand: {product?.brand}
                            </Typography>
                            <Typography variant="body2" color="grey">
                                Mfg Date: {moment(product?.mfg_date).format("DD/MM/YYYY")}
                            </Typography>
                            <Typography variant="body2" color="grey">
                                Available Quantity: {product?.stock_quantity}
                            </Typography>  <Typography variant="body2" color="grey">
                                Size: {product?.attributes?.size}
                            </Typography>
                            <Typography variant="body2" color="grey">
                                Weight: {product?.attributes?.weight}
                            </Typography>
                        </Card>
                    </Box>
                    <Box className='col-12 col-sm-12 col-md-3 text-center my-3'>
                        <Card className='img-card-height align-content-center'>
                            <div className='d-flex align-items-center justify-content-center'>
                                <Fab size='small' color="success" aria-label="add" onClick={() => setQuantity(quantity + 1)}>
                                    <AddIcon />
                                </Fab>
                                <TextField style={{ width: 100 }} value={quantity} className='mx-3' label="Quantity" variant="outlined" />
                                <Fab size='small' color="error" aria-label="remove" onClick={() => setQuantity(quantity - 1 > 0 ? quantity - 1 : 1)}>
                                    <RemoveIcon />
                                </Fab>
                            </div>
                            <Typography className='mt-2' variant="h3" color="black">
                                Total: &#8377;{totalAmount}
                            </Typography>
                            <Button className='m-3' size='large' type="submit" variant="contained" onClick={addToCart}>
                                Add to Cart
                            </Button>
                            <Button className='m-3' size='large' type="submit" variant="outlined">
                                Checkout
                            </Button>
                        </Card>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}