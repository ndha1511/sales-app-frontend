import { Box, Button, Container, Rating, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ProductResponse } from "../../../dtos/responses/product-response";
import { useParams } from "react-router-dom";
import { ResponseSuccess } from "../../../dtos/responses/response.success";
import { getProductById } from "../../../services/product.service";
import { ProductImageModel } from "../../../models/product-image.model";
import { ProductModel } from "../../../models/product.model";
import { ProductDetailModel } from "../../../models/product-detail.model";
import Carousel from "react-material-ui-carousel";
import { convertPrice } from "../../../utils/convert-price";
import { ColorModel } from "../../../models/color.model";
import { SizeModel } from "../../../models/size.model";
import DoneIcon from '@mui/icons-material/Done';
import { addToCartLocalStorage } from "../../../utils/cart-handle";
import { useDispatch } from "react-redux";
import { updateCartState } from "../../../redux/reducers/cart-reducer";
import QuantityProduct from "../../../components/user/quantity-product/QuantityProduct";

type SizeColorProps = {
    text: string;
    changeActive: (index: number) => void;
    index: number;
    activeIndex: number;
}

const SizeColorBox = ({ text, changeActive, index, activeIndex }: SizeColorProps) => {
    return (
        <Box sx={{
            p: 1,
            background: '#fff',
            textAlign: 'center',
            color: 'black',
            borderRadius: '10px',
            position: 'relative',
            cursor: 'pointer',
            '&:hover': {
                background: '#f0f0f0',
            }
        }}
            onClick={() => changeActive(index)}
        >
            <Typography>{text}</Typography>
            {index === activeIndex && <Box sx={{
                position: 'absolute',
                top: 0,
                right: 0
            }}>
                <DoneIcon />
            </Box>}
        </Box>
    )
}

const ProductDetail = () => {

    const { id } = useParams();

    const [product, setProduct] = useState<ProductModel>();
    const dispatch = useDispatch();

    const [productImages, setProductImages] = useState<ProductImageModel[]>([]);
    const [productDetails, setProductDetails] = useState<ProductDetailModel[]>([]);
    const [colors, setColors] = useState<ColorModel[]>([]);
    const [sizes, setSizes] = useState<SizeModel[]>([]);
    const [activeSize, setActiveSize] = useState<number>(0);
    const [activeColor, setActiveColor] = useState<number>(0);
    const [quantityInStock, setQuantityInStock] = useState<number>(0);
    const [buyQuantity, setBuyQuantity] = useState<number>(1);

    const changeActiveSize = (index: number) => {
        setActiveSize(index);
    }

    const changeActiveColor = (index: number) => {
        setActiveColor(index);
    }


    useEffect(() => {
        (async () => {
            try {
                const response: ResponseSuccess<ProductResponse> = await getProductById(Number(id));
                setProduct(response.data.product);
                setProductImages(response.data.productImages ?? []);
                setProductDetails(response.data.productDetails ?? []);
                let uniqueColors: ColorModel[] = [];
                response.data
                    .productDetails?.forEach((productDetail: ProductDetailModel) => {
                        const filter: ColorModel[] = uniqueColors.filter(
                            (color: ColorModel) => color.id === productDetail.color.id
                        );
                        if (filter.length <= 0) {
                            uniqueColors.push(productDetail.color)
                        }
                    });
                setColors(uniqueColors);
                let uniqueSizes: SizeModel[] = [];
                response.data
                    .productDetails?.forEach((productDetail: ProductDetailModel) => {
                        const filter: SizeModel[] = uniqueSizes.filter(
                            (size: SizeModel) => size.id === productDetail.size.id
                        );
                        if (filter.length <= 0) {
                            uniqueSizes.push(productDetail.size)
                        }
                    });
                setSizes(uniqueSizes);
            } catch (e) {
                console.log(e);
            }
        })();
    }, []);

    useEffect(() => {
        const productDetailFilter = getProductDetailByColorIdAndSizeId();
        setQuantityInStock(productDetailFilter?.quantity ?? 0);
        setBuyQuantity(1);
    }, [activeColor, activeSize, productDetails]);


    const getProductDetailByColorIdAndSizeId = () => {
        const productDetailFilter = productDetails.filter((productDetail: ProductDetailModel) => {
            return productDetail.color.id === colors[activeColor].id && productDetail.size.id === sizes[activeSize].id;
        });
        if(productDetailFilter.length > 0) {
            return productDetailFilter[0];
        }   
    }

   
    const addToCard = () => {
        const productDetail = getProductDetailByColorIdAndSizeId();
        if(productDetail) {
            addToCartLocalStorage({
                productDetail: productDetail,
                quantity: buyQuantity
            });
            dispatch(updateCartState());
        }
       
    }

    const setBuyQuantityProp = (value: number) => {
        setBuyQuantity(value);
    }

    return (
        <Container sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 5

        }}>
            <Box sx={{
                display: 'flex',
                gap: '50px',
                flex: 1
            }}>
                <Box>
                    <Carousel sx={{
                        width: 400,
                        height: 400,
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        margin: 'auto',
                        padding: '10px',
                        borderRadius: '10px',
                        boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)',
                        background: '#fff',
                        boxSizing: 'border-box',
                        border: '1px solid rgba(0, 0, 0, 0.125)',
                        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    }}>
                        {
                            productImages.map((productImage: ProductImageModel) => {
                                return (
                                    <Box sx={{ width: '100%', height: '100%' }}>
                                        <img
                                            width={'100%'}
                                            height={'100%'}
                                            src={productImage.path} alt={productImage.id?.toString()} />
                                    </Box>
                                )
                            })
                        }
                    </Carousel>
                </Box>
                <Box>
                    <Typography variant="h5">
                        {product?.productName}
                    </Typography>
                    <Typography>
                        {product?.provider?.providerName}
                    </Typography>
                    <Typography>
                        {convertPrice(product?.price)}
                    </Typography>
                    {product?.avgRating ? <Box>
                        <Rating name="read-only" value={product.avgRating} readOnly />
                        <Typography>{product.numberOfRating + ' đánh giá'}</Typography>
                    </Box> :
                        <Typography>Chưa có đánh giá</Typography>}
                    <Box>
                        <Box>
                            <Typography>
                                Màu sắc:
                            </Typography>
                            {colors.map((color: ColorModel, index: number) => (
                                <SizeColorBox text={color.colorName ?? ''} changeActive={changeActiveColor}
                                    index={index} activeIndex={activeColor} />
                            ))}
                        </Box>
                        <Box>
                            <Typography>
                                Kích thước:
                            </Typography>
                            {sizes.map((size: SizeModel, index: number) => (
                                <SizeColorBox text={size.numberSize?.toString() ?? size.textSize ?? ''}
                                    changeActive={changeActiveSize} index={index} activeIndex={activeSize} />
                            ))}
                        </Box>
                        <Box>
                            <Typography>
                                Số lượng trong kho: {quantityInStock?.toString()}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography>
                                Số lượng:
                            </Typography>
                           <QuantityProduct quantity={buyQuantity} setQuantity={setBuyQuantityProp} maxValue={quantityInStock}/>
                        </Box>
                        <Box>
                            <Button variant="contained" color="primary" onClick={addToCard}>
                                Thêm vào giỏ hàng
                            </Button>
                            <Button variant="contained" color="secondary">
                                Mua ngay
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box>
                <Box>

                </Box>
                <Box>
                    <Box>

                    </Box>
                    <Box></Box>
                </Box>
            </Box>
            <Box></Box>
        </Container>
    )
}

export default ProductDetail;