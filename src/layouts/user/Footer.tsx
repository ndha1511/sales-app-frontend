import { Typography } from "@mui/material";
import { GradientBox } from "../../gradients/GradientColor";

const Footer = () => {
    return <GradientBox sx={{
        height: '100%', 
        width: '100%', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }}>
        <Typography sx={{color: 'white'}}>© 2024 Your Company. All rights reserved.</Typography>
    </GradientBox>;

}

export default Footer;