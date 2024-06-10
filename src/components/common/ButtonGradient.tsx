import {Button, styled} from "@mui/material";
import {primaryGradient} from "../../theme.tsx";

const ButtonGradient = styled(Button) ({
    display: "flex",
    alignItems: "center",
    ':hover': {
        background: primaryGradient,
        color: "white",
        transition: 'background 0.3s ease-in-out',
    },
})

export default ButtonGradient;