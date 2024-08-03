import { Box, Typography, useMediaQuery } from "@mui/material";
import { ProductUserResponse } from "../../../dtos/responses/product-user-response";
import ProductCard from "../../../components/user/cards/ProductCard";
import { primaryGradient } from "../../../theme";

type Props = {
    products: ProductUserResponse[];
    title: string;
    applyCss?: boolean;
}

const ListProduct = ({ products, title, applyCss }: Props) => {
    const isMobile: boolean = useMediaQuery('(max-width:600px)');
    return <>
        <Typography sx={{
            fontSize: applyCss ? (isMobile ? '20px' : '32px') : (isMobile ? '16px' : '24px'),
            fontWeight: applyCss ? 'bold' : 'normal',
            background: applyCss ? primaryGradient : 'none',
            WebkitBackgroundClip: applyCss ? 'text' : 'none',
            WebkitTextFillColor: applyCss ? 'transparent' : 'inherit',
            textAlign: 'center',
            margin: '20px 0'
        }}>
            {title}
        </Typography>
        <Box sx={{
            display: 'flex',
            gap: '30px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            mb: 4
        }}>
            {products.map((product: ProductUserResponse) => (
                <Box key={product.product.id} sx={{ flexBasis: isMobile ? '100px' : '250px', flexGrow: 1, maxWidth: isMobile ? '150px' : '250px' }}>
                    <ProductCard product={product}></ProductCard>
                </Box>
            ))}
        </Box>
    
    </>
}

export default ListProduct;
