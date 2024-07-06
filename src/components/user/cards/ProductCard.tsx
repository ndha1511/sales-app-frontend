import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ProductUserResponse } from "../../../dtos/responses/product-user-response";
import { convertPrice } from "../../../utils/convert-price";

type Props = {
    product: ProductUserResponse
}

const ProductCard = ({product} : Props) => {
    const isMobile: boolean = useMediaQuery('(max-width:600px)');
    const navigate = useNavigate();
    return (
        <Card sx={{ width: '100%', position: 'relative', cursor: 'pointer',
            transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
            '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
            }
         }} onClick={() => navigate('/products/' + product.product.id)}>
            {product.discount && <Box sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                backgroundColor: 'red',
                p: 1,
                borderRadius: '0px 0px 0px 5px'
            }}>
                <Typography sx={{
                    color: '#fff',
                    fontSize: isMobile? '8px' : '18px'
                }}>Giảm giá {product.discount * 100}%</Typography>
            </Box>}
            <CardMedia
                component="img"
                height={isMobile ? "160" : "250"}
                width={'100%'}
                image={product?.product.thumbnail ?? ''}
                alt={product?.product.productName ?? ''}
            />
            <CardContent sx={{mb: 0, pb: 0}}>
                <Typography gutterBottom sx={{
                    fontSize: isMobile? '12px' : '18px'
                }}>
                    {product?.product.productName ?? ''}
                </Typography>
                <Box sx={{
                    display: 'flex',
                    gap: '20px',
                    alignItems: 'center'
                }}>
                    <Typography color={product.discount ? "text.secondary" : ""} sx={{
                        textDecoration: product.discount ? 'line-through' : 'none',
                        fontSize: isMobile ? '8px' : '16px'
                    }}>
                        {convertPrice(product.product.price)}
                    </Typography>
                    {product.discountedPrice && <Typography sx={{
                        fontSize: isMobile? '8px' : '16px'
                    }}>
                        {convertPrice(product.product.price - product.discountedPrice)}
                    </Typography>}
                </Box>
            </CardContent>
            <CardActions sx={{
                mt: 0,
                pt: 0
            }}>
                <Button size="small" color="primary" sx={{
                    fontSize: isMobile? '8px' : '16px'
                }}>
                    Thêm vào giỏ hàng
                </Button>
            </CardActions>
        </Card>
    )
}

export default ProductCard;