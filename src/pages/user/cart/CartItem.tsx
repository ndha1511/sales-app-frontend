import { Box, Button, Typography } from "@mui/material";
import { convertPrice } from "../../../utils/convert-price";
import { useNavigate } from "react-router-dom";
import { CartItemModel } from "../../../models/cart-item.model";
import QuantityProduct from "../../../components/user/quantity-product/QuantityProduct";
import { useState } from "react";
import { removeItemCart } from "../../../utils/cart-handle";
import { useDispatch } from "react-redux";
import { updateCartState } from "../../../redux/reducers/cart-reducer";

type Props = {
    item: CartItemModel
}

const CartItem = ({ item }: Props) => {
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState<number>(item.quantity);
    const distpatch = useDispatch();

    const setQuantityProp = (quantity: number) => {
        setQuantity(quantity);
    }

    const deleteItemCart = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        removeItemCart(item);
        distpatch(updateCartState());
    }
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            ':hover': {
                backgroundColor: 'secondary.main'
            },
            cursor: 'pointer'
        }} onClick={() => (navigate("/products/" + item.productDetail.product?.id))}>
            <img src={item.productDetail.product?.thumbnail ?? ""} alt={item.productDetail.product?.productName ?? ""} width={"20%"} height={150} />
            <Box>
                <Typography>Tên sản phẩm: {item.productDetail.product?.productName}</Typography>
            </Box>
            <Box>
                <Box>
                    <Typography>Màu sắc: {item.productDetail.color.colorName}</Typography>
                </Box>
                <Box>
                    <Typography>Kích thước: {item.productDetail.size.numberSize ?? item.productDetail.size.textSize}</Typography>
                </Box>
            </Box>
            <Box>
                <Typography>Đơn giá: {convertPrice(item.productDetail.product?.price)}</Typography>
            </Box>
            <Box onClick={(e) => {e.stopPropagation()}}>
                <Typography>Còn {item.productDetail.quantity} sản phẩm</Typography>
                <QuantityProduct cartItem={item} quantity={quantity} setQuantity={setQuantityProp} maxValue={item.productDetail?.quantity ?? 0}/>
            </Box>
            <Box>
                <Typography>Số tiền: {convertPrice((item.productDetail.product?.price ?? 0) * (item.quantity ?? 0))}</Typography>
            </Box>
            <Box>
                <Button variant="contained" size="small" color="error"
                    onClick={(e) => deleteItemCart(e)}
                >Xóa</Button>
            </Box>
        </Box>
    )
}

export default CartItem;