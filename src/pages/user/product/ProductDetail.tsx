import { Box, Button, Container, Rating, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ProductResponse } from "../../../dtos/responses/product-response";
import { useParams } from "react-router-dom";
import { ResponseSuccess } from "../../../dtos/responses/response.success";
import { getProductById } from "../../../services/product.service";
import { ProductImageModel } from "../../../models/product-image.model";
import { ProductModel } from "../../../models/product.model";
import { ProductDetailModel } from "../../../models/product-detail.model";
import { convertPrice } from "../../../utils/convert-price";
import { ColorModel } from "../../../models/color.model";
import { SizeModel } from "../../../models/size.model";
import DoneIcon from '@mui/icons-material/Done';
import { addToCartLocalStorage } from "../../../utils/cart-handle";
import { useDispatch } from "react-redux";
import { updateCartState } from "../../../redux/reducers/cart-reducer";
import QuantityProduct from "../../../components/user/quantity-product/QuantityProduct";
import ListImage from "../../../components/user/list-image/ListImage";

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
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#fff',
            textAlign: 'center',
            color: 'black',
            borderRadius: '10px',
            position: 'relative',
            cursor: 'pointer',
            border: '1px solid black',
            flexGrow: 1,
            maxWidth: '150px',
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
                right: '5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                color: 'green',

            }}>
                <DoneIcon/>
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
        if (productDetailFilter.length > 0) {
            return productDetailFilter[0];
        }
    }


    const addToCard = () => {
        const productDetail = getProductDetailByColorIdAndSizeId();
        if (productDetail) {
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
            flexDirection: 'column',
            pb: 2

        }}>
            <Box sx={{
                display: 'flex',
                gap: '50px',
                flexWrap: 'wrap'
            }}>
                <ListImage images={productImages} />

                {/* right */}
                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '20px', width: '45%' }}>
                    <Typography component={'p'} variant="h5" sx={{
                        maxWidth: '100%',
                        wordBreak: 'break-word'
                    }}>
                        {product?.productName}
                    </Typography>
                    <Typography>
                        Nhà cung cấp: {product?.provider?.providerName}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: '25px' }}>
                        <Typography sx={{
                            textDecoration: 'line-through'
                        }}>
                            {convertPrice(product?.price)}
                        </Typography>
                        <Typography >
                            {convertPrice(product?.price)}
                        </Typography>
                    </Box>
                    {product?.avgRating ? <Box sx={{ display: 'flex', gap: '5px' }}>
                        <Rating name="read-only" value={product.avgRating} readOnly />
                        <Typography sx={{ color: 'blue' }}>{product.numberOfRating + ' đánh giá'}</Typography>
                    </Box> :
                        <Typography>Chưa có đánh giá</Typography>}
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                    }}>
                        <Box sx={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                            <Typography sx={{ flexGrow: 1, maxWidth: '20%' }}>
                                Màu sắc:
                            </Typography>
                            <Box sx={{ display: 'flex', flex: 1, alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                                {colors.map((color: ColorModel, index: number) => (
                                    <SizeColorBox key={color.id} text={color.colorName ?? ''} changeActive={changeActiveColor}
                                        index={index} activeIndex={activeColor} />
                                ))}
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', gap: '12px' }}>
                            <Typography sx={{ flexGrow: 1, maxWidth: '20%' }}>
                                Kích thước:
                            </Typography>
                            <Box sx={{ display: 'flex', flex: 1, alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                                {sizes.map((size: SizeModel, index: number) => (
                                    <SizeColorBox key={size.id} text={size.numberSize?.toString() ?? size.textSize ?? ''}
                                        changeActive={changeActiveSize} index={index} activeIndex={activeSize} />
                                ))}
                            </Box>
                        </Box>
                        <Box>
                            <Typography>
                                Số lượng trong kho: {quantityInStock?.toString()}
                            </Typography>
                        </Box>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <Typography>
                                Số lượng:
                            </Typography>
                            <QuantityProduct quantity={buyQuantity} setQuantity={setBuyQuantityProp} maxValue={quantityInStock} />
                        </Box>
                        <Box sx={{
                            mt: 2,
                            display: 'flex',
                            gap: '20px',
                            alignItems: 'center'
                        }}>
                            <Button variant="contained" color="warning" onClick={addToCard}>
                                Thêm vào giỏ hàng
                            </Button>
                            <Button variant="contained" color="success">
                                Mua ngay
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Typography  variant="h6">Mô tả sản phẩm</Typography>
            <Box>
                <Box>

                </Box>
                <Box>
                    <Box>

                    </Box>
                    <Box></Box>
                </Box>
            </Box>
            <Typography sx={{ mt: 2 }} variant="h6">Đánh giá</Typography>
            <Box></Box>
            <Typography sx={{ mt: 2 }} variant="h6">Các sản phẩm tương tự</Typography>
            <Box></Box>
        </Container>
    )
}

export default ProductDetail;