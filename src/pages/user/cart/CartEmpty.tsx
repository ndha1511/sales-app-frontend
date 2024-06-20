import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CartEmpty = () => {
    const navigate = useNavigate();
    return <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        textAlign: 'center',
    }}>
        <Typography variant="h4">Chưa có sản phẩm nào trong giỏ hàng</Typography>
        <Button variant="contained" onClick={() => navigate('/')}>Về trang chủ</Button>
    </Box>
}

export default CartEmpty;