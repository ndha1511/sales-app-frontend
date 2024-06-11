import NavBar from "./NavBar.tsx";
import {Box, useMediaQuery} from "@mui/material";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import {ReactNode} from "react";

type Props = {
    children?: ReactNode;
}

const AdminLayout = ({children}: Props) => {

    const isMobile : boolean = useMediaQuery('(max-width:600px)');

    return <Box sx={{display: "flex", flexDirection: "column"}}>
        <Header></Header>
        <Box sx={{display: "flex", mt: 9,}}>
            {isMobile? <></>: <NavBar></NavBar>}
            <Box sx={{display: 'flex', flexDirection: 'column', flex: 1,  borderLeft: '1px solid #e4e4e4',}}>
                <Box sx={{flex: 1}}>{children}</Box>
                <Box sx={{ height: '200px'}}><Footer></Footer></Box>
            </Box>
        </Box>
    </Box>
}

export default AdminLayout;