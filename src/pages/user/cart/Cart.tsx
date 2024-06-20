import { Box, Container, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import CartEmpty from "./CartEmpty";
import CartItem from "./CartItem";
import { useEffect, useState } from "react";
import { convertPrice } from "../../../utils/convert-price";
import { CartItemModel } from "../../../models/cart-item.model";

const Cart = () => {
    const cart = useSelector((state: RootState) => state.cart.items);
    const [totalMoney, setTotalMoney] = useState<number>(0);
    useEffect(() => {
        let total = 0;
        cart.forEach((cartItem: CartItemModel) => {
            total += (cartItem.productDetail.product?.price ?? 0) * (cartItem.quantity ?? 0);
        });
        setTotalMoney(total);
    }, [cart]);
    return (
        <Container sx={{
            display: 'flex',
            flexDirection: 'column'
        }}>
            {cart.length > 0 ?
                <>
                    <Box sx={{
                        height: "50vh",
                        overflow: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px'
                    }}>
                        {cart.map((cartItem: CartItemModel, index: number) => (
                            <CartItem key={index} item={cartItem} />
                        ))}
                    </Box>
                    <Box>
                        <Typography>Tổng tiền: {convertPrice(totalMoney)}</Typography>
                    </Box>
                </> :
                <CartEmpty />}
        </Container>
    )
}

export default Cart;