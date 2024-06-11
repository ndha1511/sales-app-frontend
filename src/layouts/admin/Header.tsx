import {
    AppBar,
    Avatar,
    Badge,
    Box, useColorScheme,
    useMediaQuery
} from "@mui/material";
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import {deepPurple} from "@mui/material/colors";
import {Notifications} from "@mui/icons-material";
import IconButtonGradient from "../../components/common/IconButtonGradient.tsx";
import logoIcon from "../../assets/logo/logo-icon.png";
import {useState} from "react";
import NavBar from "./NavBar.tsx";
import SearchInput from "../../components/admin/search-input/SearchInput.tsx";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Tooltip from '@mui/material/Tooltip';


const Header = () => {
    const isMobile: boolean = useMediaQuery('(max-width:600px)');
    const {mode, setMode} = useColorScheme();
    const [open, setOpen] = useState(false);
    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <NavBar></NavBar>
    );

    return <AppBar sx={{
        display: "flex", flexDirection: 'row', p: 1, alignItems: "center",
        justifyContent: 'space-between', backgroundColor: "background.paper"
    }}>
        {isMobile ? <><img src={logoIcon} alt={"logo"} width={"55px"} height={"55px"}/></> :
            <Box sx={{width: '40%', display: "flex", alignItems: 'center'}}>
                <Box sx={{mr: 20}}>
                    <img src={logoIcon} alt={"logo"} width={"50px"} height={"50px"}/>
                </Box>
                <SearchInput placeHolder={"Nhập nội dung cần tìm"}/>
            </Box>}
        <Box sx={{
            display: "flex", width: isMobile ? '65%' : '15%', justifyContent: 'space-evenly',
            alignItems: "center"
        }}>
            <Tooltip title={mode === 'light' ? "giao diện tối" : "giao diện sáng"}>
                <IconButtonGradient type="button" aria-label="mode"
                                    onClick={() => {
                                        setMode(mode === 'light' ? 'dark' : 'light');
                                    }}
                >
                    {mode === 'light' ? <Brightness4Icon/> : <Brightness7Icon/>}
                </IconButtonGradient>
            </Tooltip>
            <Tooltip title={"Thông báo"}>
            <IconButtonGradient type="button" aria-label="message">
                <Badge badgeContent={4} color="primary">
                    <Notifications fontSize={"small"}/>
                </Badge>
            </IconButtonGradient>
            </Tooltip>
            <Tooltip title={"Tài khoản"}>
            <Avatar sx={{bgcolor: deepPurple[500]}}>OP</Avatar>
            </Tooltip>
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