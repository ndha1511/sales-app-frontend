import {
    Box,
    Collapse,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    useMediaQuery,
} from "@mui/material";
import {ExpandLess, ExpandMore } from "@mui/icons-material";
import { pinkGradient, primaryGradient } from "../../theme.tsx";
import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { blue } from "@mui/material/colors";
import logoIcon from "../../assets/logo/logo-icon.png";

type Item = {
    title: string,
    icon?: ReactNode,
    href: string,
    child?: Item[]
}

type Props = {
    items: Item[],
}

const NavBar = ({items} : Props) => {
    const [open, setOpen] = useState<{ [key: string]: boolean }>({});
    const location = useLocation();
    const isMobile: boolean = useMediaQuery('(max-width:1150px)');


    const handleClick = (title: string) => {
        setOpen(prev => ({ ...prev, [title]: !prev[title] }));
    };

    const buttonIcon: Item[] = items; 

    return (
        <Box sx={{
            display: 'flex', flexDirection: 'column',
            alignItems: "center",
            height: '100vh',
            width: '220px',
        }}>
            {isMobile && <img src={logoIcon} alt={"logo"} width={"55px"} height={"55px"} />}
            <List
                sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                {buttonIcon.map((itemIcon: Item, index: number) => {
                    const isOpen = open[itemIcon.title] || false;
                    return (
                        <ListItem key={index} sx={{
                            display: "flex",
                            flexDirection: 'column',
                            alignItems: "center",
                            width: '100%',
                            cursor: "pointer",
                            p: 0
                        }}>
                            <ListItemButton component={Link} to={itemIcon.child ? '' : itemIcon.href} sx={{
                                display: "flex",
                                ':hover': {
                                    background: pinkGradient,
                                    color: 'white'
                                },
                                width: '100%',
                                background: location.pathname.startsWith(itemIcon.href) ? primaryGradient : 'none',
                                color: location.pathname.startsWith(itemIcon.href) ? 'white' : 'none',
                                alignItems: 'center',
                                p: 2,
                                pt: 1,
                                pb: 1
                            }} onClick={() => handleClick(itemIcon.title)}>
                                <ListItemText primary={itemIcon.title} sx={{ width: "50%" }} />
                                {itemIcon.icon && <ListItemIcon sx={{
                                    justifyContent: 'center', width: "30%",
                                    color: location.pathname.startsWith(itemIcon.href) ? "#fff" : ""
                                }}>
                                    {itemIcon.icon}
                                </ListItemIcon>}
                                <Box sx={{ display: 'flex', width: "15%", height: '100%', alignItems: 'center' }}>
                                    {itemIcon.child ? isOpen ? <ExpandLess /> : <ExpandMore /> : <></>}
                                </Box>
                            </ListItemButton>
                            {itemIcon.child && (
                                <Collapse in={isOpen}>
                                    <List component={"div"} disablePadding>
                                        {itemIcon.child.map((childItem: Item, childIndex: number) => {
                                            return (
                                                <ListItemButton
                                                    key={childIndex}
                                                    component={Link}
                                                    to={childItem.href}
                                                    sx={{
                                                        color: location.pathname === childItem.href ? blue[600] : ""
                                                    }}
                                                >
                                                    {childItem.icon && <ListItemIcon
                                                        sx={{ color: location.pathname === childItem.href ? blue[600] : "" }}>
                                                        {childItem.icon}
                                                    </ListItemIcon>}
                                                    <ListItemText primary={childItem.title} />
                                                </ListItemButton>
                                            )
                                        })}
                                    </List>
                                </Collapse>
                            )}
                        </ListItem>
                    )
                })}
            </List>
        </Box>
    );
}

export default NavBar;
