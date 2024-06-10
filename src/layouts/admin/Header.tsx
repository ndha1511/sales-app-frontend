import {
    AppBar,
    Avatar,
    Badge,
    Box,
    useMediaQuery
} from "@mui/material";
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import {deepPurple} from "@mui/material/colors";
import {Mail, Notifications} from "@mui/icons-material";
import IconButtonGradient from "../../components/common/IconButtonGradient.tsx";
import logoIcon from "../../assets/logo/logo-icon.png";
import {useState} from "react";
import NavBar from "./NavBar.tsx";
import logoIconFull from "../../assets/logo/logo.png";
import SearchInput from "../../components/admin/search-input/SearchInput.tsx";

type HeaderProps = {
    openNavbar: () => void;
    isOpenNavbar: boolean;
}

const Header = ({openNavbar, isOpenNavbar}: HeaderProps) => {
    const isMobile: boolean = useMediaQuery('(max-width:600px)');
    const [open, setOpen] = useState(false);
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <NavBar isOpenNavbar={true}></NavBar>
    );

    return <AppBar sx={{display: "flex", flexDirection: 'row', p: 1, alignItems: "center",
        justifyContent: 'space-between', backgroundColor: "background.paper"}}>
        {isMobile ? <><img src={logoIcon} alt={"logo"} width={"55px"} height={"55px"}/></> :
            <Box sx={{width: '40%', display: "flex", alignItems: 'center'}}>
                <Box>
                    {isOpenNavbar ?
                        <img src={logoIconFull} alt={"logo"} width={"100px"} height={"50px"} />
                        :
                        <img src={logoIcon} alt={"logo"} width={"50px"} height={"50px"}/>}
                </Box>
                <IconButtonGradient aria-label="menu" onClick={() => openNavbar()}>
                    <MenuIcon/>
                </IconButtonGradient>
                <SearchInput placeHolder={"Nhập nội dung cần tìm"}/>
            </Box>}
        <Box sx={{
            display: "flex", width: isMobile ? '40%' : '20%', justifyContent: 'space-evenly',
            alignItems: "center"
        }}>
            <IconButtonGradient type="button" aria-label="message">
                <Badge badgeContent={4} color="primary">
                    <Mail fontSize={"small"}/>
                </Badge>
            </IconButtonGradient>
            <IconButtonGradient type="button" aria-label="message">
                <Badge badgeContent={4} color="primary">
                    <Notifications fontSize={"small"}/>
                </Badge>
            </IconButtonGradient>
            <Avatar sx={{bgcolor: deepPurple[500]}}>OP</Avatar>
            {isMobile ? <Box>
                <IconButtonGradient onClick={toggleDrawer(true)}>
                    <MenuIcon/>
                </IconButtonGradient>
                <Drawer open={open} onClose={toggleDrawer(false)}>
                    {DrawerList}
                </Drawer>
            </Box> : <></>}
        </Box>
    </AppBar>
}

export default Header;