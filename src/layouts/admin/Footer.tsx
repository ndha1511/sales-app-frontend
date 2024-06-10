import {Button} from "@mui/material";
import {GradientBox} from "../../gradients/GradientColor.tsx";

const Footer = () => {
    return <GradientBox sx={{height: '100%'}}>
        <Button variant={"contained"} color={"primary"}>Footer</Button>
    </GradientBox>;
}

export default Footer;