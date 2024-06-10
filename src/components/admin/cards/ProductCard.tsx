import {Box, Card, CardActionArea, CardContent, CardMedia, Fab, Typography} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

type Props = {
    productId: number,
    productName: string,
    productPrice: number,
    fNavigate: (id: number) => void;

}

const ProductCard = ({productId, productName, productPrice, fNavigate} : Props) => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="200"
                    image="data:image/jpeg;base64,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"
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {productName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {productPrice}
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'flex-end',
                        gap: '8px',
                    }}>
                        <Fab onClick={() => fNavigate(productId)} variant="extended" color={"success"} size="small" sx={{fontSize: 12}}>
                            <EditIcon sx={{
                                fontSize: 14,
                            }}/>
                            Edit
                        </Fab>
                        <Fab variant="extended" size="small" color={"error"} sx={{fontSize: 12}}>
                            <DeleteIcon sx={{
                                fontSize: 14,
                            }}/>
                            Delete
                        </Fab>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default ProductCard;