import {Box, Button, Typography, useColorScheme} from "@mui/material";
import {BackupTable, Equalizer, Home} from "@mui/icons-material";
import IconButtonGradient from "../../components/common/IconButtonGradient.tsx";
import {pinkGradient, primaryGradient} from "../../theme.tsx";
import {ReactNode} from "react";
import {Link, useLocation} from "react-router-dom";



type NavBarProps = {
    isOpenNavbar: boolean
}
type Item = {
    title: string,
    icon: ReactNode,
    href: string
}
const NavBar = ({isOpenNavbar}: NavBarProps) => {
    const { mode, setMode } = useColorScheme();
    const location = useLocation();

    const buttonIcon : Item[] = [
        {
            title: 'Dashboard',
            icon: <Home/>,
            href: '/admin/dashboard'
        },
        {
            title: 'Sản phẩm',
            icon: <BackupTable/>,
            href: '/admin/product'
        },
        {
            title: 'Thống kê',
            icon: <Equalizer/>,
            href: '/admin/dashboard/1'
        }
    ]
    return <Box sx={{
        display: 'flex', flexDirection: 'column',
        alignItems: "center",
        height: '100vh', pt: 1,
        width: isOpenNavbar ? '220px' : '80px',
        transition: 'width 0.6s'
    }}>

        <Box sx={{display: 'flex', flexDirection: 'column', width: isOpenNavbar ? '100%' : 'auto'}}>
            {buttonIcon.map((itemIcon: Item, index: number) => {
                return <Link to={itemIcon.href} style={{
                    textDecoration: 'none',
                    color: 'inherit',
                }}>
                    { isOpenNavbar ?
                    (
                    <Box key={index} sx={{
                        display: "flex",
                        alignItems: "center",
                        width: '100%',
                        p: 1,
                        pl: 2,
                        pr: 2,
                        justifyContent: 'space-between',
                        cursor: "pointer",
                        ':hover': {
                            background: pinkGradient,
                            color: 'white'
                        },
                        background: location.pathname.startsWith(itemIcon.href) ? primaryGradient : 'none',
                        color: location.pathname.startsWith(itemIcon.href) ? 'white' : 'none'
                    }}>
                        <Typography>{itemIcon.title}</Typography>
                        <IconButtonGradient >
                            {itemIcon.icon}
                        </IconButtonGradient>
                    </Box>
                    ) : (
                    <IconButtonGradient key={index} sx={{
                        mb: 1.5,
                        background: location.pathname === itemIcon.href ? primaryGradient : 'none',
                        color: location.pathname === itemIcon.href ? 'white' : 'none'
                    }}>
                        {itemIcon.icon}
                    </IconButtonGradient>
                    )}
                </Link>
            })}
            <Button
                onClick={() => {
                    setMode(mode === 'light' ? 'dark' : 'light');
                }}
            >
                {mode === 'light' ? 'Turn dark' : 'Turn light'}
            </Button>
        </Box>
    </Box>
}

export default NavBar;