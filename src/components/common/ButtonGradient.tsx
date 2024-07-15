import { Button, styled } from "@mui/material";
import { primaryGradient } from "../../theme";


const ButtonGradient = styled(Button)({
    display: "flex",
    alignItems: "center",
    background: primaryGradient,
    transition: "background 0.3s ease-in-out",
    ':hover': {
        background: 'linear-gradient(to right, #CB7FFF 20%, #A15BFF 80%)', 
        color: "white",
    },
});

export default ButtonGradient;
