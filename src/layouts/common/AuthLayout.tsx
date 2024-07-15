import { Box } from "@mui/material";
import { ReactNode } from "react";
import background from "../../assets/backgrounds/login-background.jpg";

const AuthLayout = ({children} : {children: ReactNode}) => {
    return (
        <Box sx={{
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            overflow: 'hidden',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            {children}
        </Box>
    )
}

export default AuthLayout;