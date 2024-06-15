import { Card, CardActions, CardContent, CardMedia, Fab, Typography, useMediaQuery } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
    productId: number,
    productName: string,
    productPrice: number,
    fNavigate: (id: number) => void;
    thumbnail: string;

}

const ProductCard = ({ productId, productName, productPrice, fNavigate, thumbnail }: Props) => {
    const isMobile = useMediaQuery('(max-width:600px)');
    return (
        <Card sx={{ maxWidth: 345 }}>

            <CardMedia
                component="img"
                height={isMobile ? '150px': '200px'}
                image={thumbnail}
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom component="div" sx={{fontSize: '18px'}}>
                    {productName}
                </Typography>
                <Typography color="text.secondary">
                    {productPrice}
                </Typography>
            </CardContent>
            <CardActions sx={{
                justifyContent: 'flex-end',
            }}>
                <Fab onClick={() => fNavigate(productId)} variant="extended" color={"success"} size="small" sx={{ fontSize: 10 }}>
                    <EditIcon sx={{
                        fontSize: 10,
                    }} />
                    Edit
                </Fab>
                <Fab variant="extended" size="small" color={"error"} sx={{ fontSize: 10 }}>
                    <DeleteIcon sx={{
                        fontSize: 10,
                    }} />
                    Delete
                </Fab>
            </CardActions>
        </Card>
    )
}

export default ProductCard;