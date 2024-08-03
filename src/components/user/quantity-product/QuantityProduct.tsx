import { Box, Button, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { CartItemModel } from "../../../models/cart-item.model";
import { updateItemCart } from "../../../utils/cart-handle";
import { useDispatch } from "react-redux";
import { updateCartState } from "../../../redux/reducers/cart-reducer";
import { useEffect } from "react";

type Props = {
    quantity: number,
    setQuantity: (quantity: number) => void
    maxValue: number,
    cartItem?: CartItemModel
}

const QuantityProduct = ({ quantity, setQuantity, maxValue, cartItem }: Props) => {
    const distpatch = useDispatch();

    const increasement = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        if (maxValue > quantity) {
            setQuantity(quantity + 1);
        }
    }

    const decreasement = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }

    }
    useEffect(() => {
        if (cartItem) {
            let newCartItem: CartItemModel = { ...cartItem, quantity: quantity };
            updateItemCart(newCartItem);
            distpatch(updateCartState());
        }
    }, [quantity])

    const changeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setQuantity(Number(e.target.value) > maxValue ? maxValue : Number(e.target.value));
    }

    const blurInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (Number(e.target.value) < 1) {
            setQuantity(1);
        }
    }


    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.875rem', 
        }}>
            <Button 
                variant="outlined"
                onClick={(e) => decreasement(e)} 
                size="small" 
                sx={{ p: 0.5 }} // Giảm padding để làm nút nhỏ hơn
            >
                <RemoveIcon fontSize="small" />
            </Button>
            <TextField
                sx={{
                    width: '60px', // Giảm kích thước TextField
                    '& .MuiInputBase-input': {
                        textAlign: 'center',
                        fontSize: '0.875rem', // Giảm kích thước font
                    }
                }}
                InputProps={{
                    sx: {
                        padding: '0px', // Loại bỏ padding bên trong
                        height: '32px', // Giảm chiều cao TextField
                    }
                }}
                variant="outlined"
                type="number"
                value={quantity}
                onChange={(e) => changeInput(e)}
                onBlur={(e) => blurInput(e)}
            />
            <Button 
                variant="outlined"
                onClick={(e) => increasement(e)} 
                size="small" 
                sx={{ p: 0.5 }} // Giảm padding để làm nút nhỏ hơn
            >
                <AddIcon fontSize="small" />
            </Button>
        </Box>
    )
}

export default QuantityProduct;