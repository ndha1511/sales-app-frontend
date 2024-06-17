import { Box } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import { ReactNode } from "react";

type Props = {
    children?: ReactNode;
}

const UserLayout = ({ children }: Props) => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: '100vh', width: '100wh' }}>
            <Box sx={{width: '100%'}}><Header /></Box>
            <Box sx={{flex: 1, marginTop: '100px'}}>
                {children}
            </Box>
            <Box sx={{ height: '60px'}}><Footer></Footer></Box>
        </Box>
    )
}

export default UserLayout;