import {
    Box, Pagination,
    Select, Stack,
    Typography,
    useMediaQuery,

} from "@mui/material";
import SearchInput from "../../../components/admin/search-input/SearchInput.tsx";
import ButtonGradient from "../../../components/common/ButtonGradient.tsx";
import {pinkGradient} from "../../../theme.tsx";
import AddIcon from '@mui/icons-material/Add';
import {useNavigate} from "react-router-dom";
import ProductCard from "../../../components/admin/cards/ProductCard.tsx";



function createData(id: number, name: string, price: number) {
    return {id, name, price};
}

const rows = [
    createData(1, 'Frozen yoghurt', 159),
    createData(2, 'Frozen yoghurt 1', 159),
    createData(3, 'Frozen yoghurt 2', 159),
    createData(4, 'Frozen yoghurt 2', 159),
    createData(5, 'Frozen yoghurt 2', 159),
    createData(6, 'Frozen yoghurt 2', 159),
    createData(7, 'Frozen yoghurt 2', 159),

];

const Product = () => {
    const isMobile = useMediaQuery('(max-width:600px)');
    const navigate = useNavigate();
    const fNavigate = (id: number) => {
        navigate('update/' + id);
    }

    return <Box sx={{display: 'flex', flexDirection: 'column', p: 2}}>
        <Box  sx={{display: 'flex', width: '100%', justifyContent: 'flex-end', mb: 2}}>
            <Typography component="span" sx={{flexGrow: 1}}>Danh sách sản phẩm</Typography>
            <ButtonGradient size="small" sx={{
                background: pinkGradient,
                color: "#fff",
                fontSize: 10
            }} onClick={() => navigate("create")}>Thêm sản phẩm <AddIcon/> </ButtonGradient>
        </Box>
        <Box sx={{
            display: "flex", alignItems: "center",
            justifyContent: "space-between", mb: 3
        }}>
            <Box><SearchInput placeHolder={"Nhập tên sản phẩm"}/></Box>
            <Box>
                <Select size={"small"}></Select>
                <Select size={"small"}></Select>
                <Select size={"small"}></Select>
            </Box>
        </Box>
        <Box sx={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            p: 0.5
        }}>
            {rows.map((item: any, index: number) => (
                <Box sx={{width: isMobile ? '150px' : '270px'}} key={index}>
                    <ProductCard
                        productId={item.id}
                        productName={item.name}
                        productPrice={item.price}
                        fNavigate={fNavigate}
                    />
                </Box>
            ))}
        </Box>
        <Box sx={{
            display: 'flex', alignItems: 'center',
            width: '100%', justifyContent: 'flex-end',
            mt: 2
        }}>
            <Stack spacing={2}>
                <Pagination count={10} variant="outlined" color={"primary"}/>
            </Stack>
        </Box>
    </Box>
}

export default Product;