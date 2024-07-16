import { Box, Button, Container, Drawer, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import CartEmpty from "./CartEmpty";
import CartItem from "./CartItem";
import { useEffect, useState } from "react";
import { convertPrice } from "../../../utils/convert-price";
import { CartItemModel } from "../../../models/cart-item.model";
import { isLogin } from "../../../services/user.service";
import { useNavigate } from "react-router-dom";
import Payment from "./Payment";

const Cart = () => {
    const cart = useSelector((state: RootState) => state.cart.items);
    const [totalMoney, setTotalMoney] = useState<number>(0);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    useEffect(() => {
        let total = 0;
        cart.forEach((cartItem: CartItemModel) => {
            total += (cartItem.productDetail.product?.price ?? 0) * (cartItem.quantity ?? 0);
        });
        setTotalMoney(total);
    }, [cart]);

    const openDrawer = () => {
        if (!isLogin()) {
            localStorage.setItem("historyPath", location.pathname);
            navigate('/auth/login', {state: { from: '/cart'}});
        }
        setOpen(true);
    };
    return (
        <Container sx={{
            display: 'flex',
            flexDirection: 'column'
        }}>
            {cart.length > 0 ?
                <>
                    <Box sx={{
                        maxHeight: "50vh",
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
                    <Box>
                        <Button>Chọn mã giảm giá</Button>
                    </Box>
                    <Button onClick={openDrawer}>Thanh toán</Button>
                    <Drawer
                        anchor={"bottom"}
                        open={open}
                        onClose={() => setOpen(false)}
                    >
                        <Payment/>
                    </Drawer>
                </> :
                <CartEmpty />}
        </Container>
    )
}

export default Cart;