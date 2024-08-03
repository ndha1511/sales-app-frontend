import { Typography, Box, Link, IconButton } from "@mui/material";
import { GradientBox } from "../../gradients/GradientColor";
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
    return (
        <GradientBox sx={{
            height: 'auto',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            py: 3,
        }}>
            <Typography variant="h6" sx={{color: 'white', mb: 2}}>Your Company</Typography>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2,
            }}>
                <IconButton component={Link} href="https://facebook.com/hoanganh.1511.02" target="_blank" sx={{color: 'white'}}>
                    <Facebook />
                </IconButton>
                <IconButton component={Link} href="https://twitter.com" target="_blank" sx={{color: 'white'}}>
                    <Twitter />
                </IconButton>
                <IconButton component={Link} href="https://instagram.com" target="_blank" sx={{color: 'white'}}>
                    <Instagram />
                </IconButton>
                <IconButton component={Link} href="https://www.linkedin.com/in/anh-ho%C3%A0ng-a580342b7/" target="_blank" sx={{color: 'white'}}>
                    <LinkedIn />
                </IconButton>
            </Box>
            <Typography sx={{color: 'white', mb: 1}}>© 2024 Your Company. All rights reserved.</Typography>
            <Typography sx={{color: 'white', mb: 1}}>Website: <Link href="https://yourcompany.com" sx={{color: 'white'}}>yourcompany.com</Link></Typography>
            <Typography sx={{color: 'white', mb: 1}}>Contact us: <Link href="mailto:contact@yourcompany.com" sx={{color: 'white'}}>contact@yourcompany.com</Link></Typography>
            <Typography sx={{color: 'white'}}>Address: 123 Your Street, Your City, Your Country</Typography>
        </GradientBox>
    );
}

export default Footer;
