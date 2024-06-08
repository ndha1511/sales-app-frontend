import {
    Avatar,
    Badge,
    Box,
    Input,
    useMediaQuery
} from "@mui/material";
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import {deepPurple} from "@mui/material/colors";
import {Mail, Notifications} from "@mui/icons-material";
import IconButtonGradient from "../../components/common/IconButtonGradient.tsx";
import logoIcon from "../../assets/logo/logo-icon.png";
import {useState} from "react";
import NavBar from "./NavBar.tsx";

type HeaderProps = {
    openNavbar: () => void;
}

const Header = ({openNavbar}: HeaderProps) => {
    const isMobile: boolean = useMediaQuery('(max-width:600px)');
    const [open, setOpen] = useState(false);
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <NavBar isOpenNavbar={true}></NavBar>
    );

    return <Box sx={{display: "flex", p: 1, alignItems: "center", justifyContent: 'space-between'}}>
        {isMobile ? <><img src={logoIcon} alt={"logo"} width={"55px"} height={"55px"}/></> :
            <Box sx={{width: '40%', display: "flex"}}>
                <IconButtonGradient aria-label="menu" onClick={() => openNavbar()}>
                    <MenuIcon/>
                </IconButtonGradient>
                <Input
                    sx={{flex: 1}}
                    placeholder="Nhập nội dung cần tìm"
                />
                <IconButtonGradient type="button" aria-label="search">
                    <SearchIcon/>
                </IconButtonGradient>
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
    </Box>
}

export default Header;