import {Box, Typography} from "@mui/material";
import {BackupTable, Equalizer, Home} from "@mui/icons-material";
import logoIcon from "../../assets/logo/logo-icon.png";
import logoIconFull from "../../assets/logo/logo.png";
import IconButtonGradient from "../../components/common/IconButtonGradient.tsx";
import {primaryGradient} from "../../theme.tsx";

type NavBarProps = {
    isOpenNavbar: boolean
}
const NavBar = ({isOpenNavbar}: NavBarProps) => {
    const buttonIcon = [
        <Home/>,
        <BackupTable/>,
        <Equalizer/>
    ]
    return <Box sx={{
        display: 'flex', flexDirection: 'column',
        alignItems: "center",
        height: '100vh', pt: 1,
        width: isOpenNavbar ? '200px' : '60px',
        transition: 'width 0.4s',
    }}>
        <Box sx={{mt: 1, mb: 3}}>
            {isOpenNavbar ?
                <img src={logoIconFull} alt={"logo"} width={"100px"} height={"55px"}/>
                :
                <img src={logoIcon} alt={"logo"} width={"55px"} height={"55px"}/>}
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'column', width: isOpenNavbar ? '100%' : 'auto'}}>
            {buttonIcon.map((icon, index) => {
                return isOpenNavbar ?
                    (
                        <Box key={index} sx={{
                            display: "flex",
                            alignItems: "center",
                            width: '100%',
                            p: 1,
                            justifyContent: 'space-around',
                            cursor: "pointer",
                            ':hover': {
                                background: primaryGradient,
                                color: 'white'
                            }
                        }}>
                            <Typography>Dashboard</Typography>
                            <IconButtonGradient >
                                {icon}
                            </IconButtonGradient>
                        </Box>
                    ) : (
                        <IconButtonGradient key={index} sx={{
                            mb: 1
                        }}>
                            {icon}
                        </IconButtonGradient>
                    )
            })}
        </Box>
    </Box>
}

export default NavBar;