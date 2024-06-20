import { Box } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import { ReactNode } from "react";

type Props = {
    children?: ReactNode;
}

const UserLayout = ({ children }: Props) => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: '100vh'}}>
            <Header />
            <Box sx={{flex: 1, marginTop: '85px', display: 'flex', alignItems: 'center'}}>
                {children}
            </Box>
            <Box sx={{ height: '60px'}}><Footer></Footer></Box>
        </Box>
    )
}

export default UserLayout;