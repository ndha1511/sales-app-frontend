import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    styled,
    TextField,
    Typography
} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TableCustom from "../../../components/common/TableCustom.tsx";
const VisuallyHiddenInput = styled('input')({
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});
type RowData = {
    name: string,
    calories: number,
    fat: number
}
const rows: RowData[] = [
    { name: 'Frozen yoghurt', calories: 159, fat: 6.0},
    { name: 'Ice cream sandwich', calories: 237, fat: 9.0},
    { name: 'Eclair', calories: 262, fat: 16.0},
];

const columns = [
    { label: 'Name', align: 'left' },
    { label: 'Calories', align: 'right' },
    { label: 'Fat', align: 'right' },
];



const CreateProduct = () => {
    return <Box
        component="form"
        sx={{
            '& .MuiTextField-root': {m: 1, width: '25ch'},
            p: 2
        }}
        noValidate
        autoComplete="off"
    >
        <Typography variant="h6" component="span" sx={{flexGrow: 1}}>
            Thêm sản phẩm
        </Typography>
        <Box sx={{mt: 2}}>
            <Typography component="span" sx={{flexGrow: 1, pl: 3}}>
                Thông tin sản phẩm
            </Typography>
            <Box sx={{p: 2}}>
                <TextField
                    id="product-name"
                    label="Tên sản phẩm"
                />
                <TextField
                    id="product-price"
                    label="Giá"
                    type="number"

                />
            </Box>
            <Box sx={{p: 2, pl: 3, display: 'flex', justifyContent: 'space-between'}}>
                <FormControl sx={{width: '40%'}}>
                    <InputLabel id="demo-simple-select-label">Loại sản phẩm</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Loại sản phẩm"
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{width: '40%'}}>
                    <InputLabel id="demo-simple-select-label">Nhà cung cấp</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Nhà cung cấp"
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{p: 2}}>
                <TextField
                    id="outlined-multiline-static"
                    label="Mô tả"
                    multiline
                    rows={4}
                />
            </Box>
            <Box sx={{p: 2, pl: 3}}>
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                >
                    Upload ảnh
                    <VisuallyHiddenInput type="file" accept={"image/*"}/>
                </Button>
            </Box>
            <Box>
                List images
            </Box>
        </Box>
        <Box sx={{mt: 2}}>
            <Typography component="span" sx={{flexGrow: 1, pl: 3}}>
                Chi tiết sản phẩm
            </Typography>
            <Box sx={{p: 2, pl: 3, display: 'flex', justifyContent: 'space-between'}}>
                <FormControl sx={{width: '40%'}}>
                    <InputLabel id="demo-simple-select-label">Màu sắc</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Màu sắc"
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{width: '40%'}}>
                    <InputLabel id="demo-simple-select-label">Kích thước</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Kích thước"
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{p: 2}}>
                <TextField
                    id="product-price"
                    label="Số lượng"
                    type="number"

                />
            </Box>
            <Box>
                <Button>Thêm</Button>
            </Box>
            <Box>
                <TableCustom columns={columns} rows={rows}/>
            </Box>
        </Box>
    </Box>
}
export default CreateProduct;