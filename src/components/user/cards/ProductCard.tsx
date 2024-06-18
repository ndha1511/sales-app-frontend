import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography, useMediaQuery } from "@mui/material";

const ProductCard = () => {
    const isMobile: boolean = useMediaQuery('(max-width:600px)');
    return (
        <Card sx={{ width: '100%', position: 'relative', cursor: 'pointer',
            transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
            '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
            }
         }}>
            <Box sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                backgroundColor: 'red',
                p: 1,
                borderRadius: '0px 0px 0px 5px'
            }}>
                <Typography>Sale off 40%</Typography>
            </Box>
            <CardMedia
                component="img"
                height={isMobile ? "200" : "250"}
                width={'100%'}
                image="https://th-thumbnailer.cdn-si-edu.com/ii_ZQzqzZgBKT6z9DVNhfPhZe5g=/fit-in/1600x0/filters:focal(1061x707:1062x708)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer_public/55/95/55958815-3a8a-4032-ac7a-ff8c8ec8898a/gettyimages-1067956982.jpg"
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Lizard
                </Typography>
                <Box sx={{
                    display: 'flex',
                    gap: '20px',
                    alignItems: 'center'
                }}>
                    <Typography variant="body2" color="text.secondary" sx={{
                        textDecoration: 'line-through'
                    }}>
                        1.500.000 đ
                    </Typography>
                    <Typography variant="body2">
                        1.000.000 đ
                    </Typography>
                </Box>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary">
                    Thêm vào giỏ hàng
                </Button>
            </CardActions>
        </Card>
    )
}

export default ProductCard;