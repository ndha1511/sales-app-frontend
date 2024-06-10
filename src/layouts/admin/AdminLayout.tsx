import NavBar from "./NavBar.tsx";
import {Box, useMediaQuery} from "@mui/material";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import {ReactNode, useState} from "react";

type Props = {
    children?: ReactNode;
}

const AdminLayout = ({children}: Props) => {

    const [isOpenNavbar, setIsOpenNavbar] = useState(true);

    const openNavbar = () => {
        setIsOpenNavbar(!isOpenNavbar);
    }
    const isMobile : boolean = useMediaQuery('(max-width:600px)');

    return <Box sx={{display: "flex", flexDirection: "column"}}>
        <Header isOpenNavbar={isOpenNavbar} openNavbar={openNavbar}></Header>
        <Box sx={{display: "flex", mt: 10}}>
            {isMobile? <></>: <NavBar isOpenNavbar={isOpenNavbar}></NavBar>}
            <Box sx={{display: 'flex', flexDirection: 'column', flex: 1}}>
                <Box sx={{flexGrow: 1}}>{children}</Box>
                <Box sx={{ height: '200px'}}><Footer></Footer></Box>
            </Box>
        </Box>
    </Box>
}

export default AdminLayout;