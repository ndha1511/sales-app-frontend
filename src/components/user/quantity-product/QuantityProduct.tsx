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
            display: 'flex'
        }}>
            <Button onClick={(e) => decreasement(e)}>
                <RemoveIcon />
            </Button>
            <TextField
            sx={{
                width: '50%'
            }}
                InputProps={{
                    sx: {
                        width: '100%',

                        '& .MuiInputBase-input': {
                            textAlign: 'center',
                        }
                    }
                }}
                variant="outlined" type="number" value={quantity} onChange={(e) => changeInput(e)} onBlur={(e) => blurInput(e)} />
            <Button onClick={(e) => increasement(e)}>
                <AddIcon />
            </Button>
        </Box>
    )
}

export default QuantityProduct;