import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    useMediaQuery
} from "@mui/material";
import { useEffect, useState } from "react";
import DialogCreateCategory from "../../../components/admin/dialogs/categories/DialogCreateCategory.tsx";

import { CategoryModel } from "../../../models/category.model.ts";
import { getAllCategories } from "../../../services/category.service..ts";
import { ResponseSuccess } from "../../../dtos/responses/response.success.ts";
import DialogUpdateCategory from "../../../components/admin/dialogs/categories/DialogUpdateCategory.tsx";
import DialogDeleteCategory from "../../../components/admin/dialogs/categories/DialogDeleteCategory.tsx";
import ButtonGradient from "../../../components/common/ButtonGradient.tsx";
import { pinkGradient } from "../../../theme.tsx";
import AddIcon from '@mui/icons-material/Add';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Status } from "../../../models/enums/status.enum.ts";
import AlertCustom from "../../../components/common/AlertCustom.tsx";


const Category = () => {
    const [open, setOpen] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const [category, setCategory] = useState<CategoryModel>({});
    const isMobile = useMediaQuery('(max-width:600px)');
    const [openAlert, setOpenAlert] = useState({
        show: false,
        status: '',
        message: ''
    });
    const handleClose = () => {
        setOpen(false);
    }
    const handleCloseUpdate = () => {
        setOpenUpdate(false);
    }

    const handleCloseDelete = () => {
        setOpenDelete(false);
    }

    useEffect(() => {
        (async () => {
            try {
                const response: ResponseSuccess<CategoryModel[]> = await getAllCategories();
                setCategories(response.data);
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    const addCategory = (category: CategoryModel) => {
        setCategories(prev => [...prev, category]);
    }

    const updateCategory = (category: CategoryModel) => {
        setCategories(prev => {
            const oldCategory = prev.filter((item) => category.id === item.id);
            const index = prev.indexOf(oldCategory[0]);
            prev[index] = category;
            return prev;
        });
    }

    const colseAlert = () => {
        setOpenAlert(
            {
                show: false,
                status: '',
                message: ''
            }
        )
    }

    const deleteCategory = (category: CategoryModel) => {
        setCategories(prev => prev.filter((item) => item.id !== category.id));
    }

    const showAlert = (status: string, message: string) => {
        setOpenAlert(
            {
                show: true,
                status: status,
                message: message
            }
        )
    }

    return (
        <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end', mb: 2 }}>
                <Typography component="span" sx={{ flexGrow: 1 }}>Danh sách loại sản phẩm</Typography>
                <ButtonGradient size="small" sx={{
                    background: pinkGradient,
                    color: "#fff",
                    fontSize: 10
                }} onClick={() => setOpen(true)}>Thêm loại sản phẩm <AddIcon /> </ButtonGradient>
            </Box>
        
            {openUpdate && <DialogUpdateCategory showAlert={showAlert} updateCategory={updateCategory} open={openUpdate} handleClose={handleCloseUpdate} category={category} />}
            {openDelete && <DialogDeleteCategory showAlert={showAlert} open={openDelete} handleClose={handleCloseDelete} category={category} deleteCategory={deleteCategory} />}
            {open && <DialogCreateCategory showAlert={showAlert} addCategory={addCategory} open={open} handleClose={handleClose} />}
            {openAlert.show && <AlertCustom alert={openAlert} colseAlert={colseAlert}/>}
            <TableContainer component={Paper}>
                <Table size={isMobile ? 'small' : 'medium'} aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell >Id</TableCell>
                            <TableCell >Tên loại sản phẩm</TableCell>
                            <TableCell >Trạng thái</TableCell>
                            <TableCell align="center">Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.map((category: CategoryModel) => (
                            <TableRow key={category.id} sx={{
                                ':hover': {
                                    backgroundColor: 'secondary.main'
                                }
                            }}>
                                <TableCell >{category.id}</TableCell>
                                <TableCell >{category.categoryName}</TableCell>
                                <TableCell >
                                    {category.status === Status.ACTIVE ? 
                                    <Box sx={{display: 'flex', 
                                        alignItems: 'center', gap: '5px'}}><FiberManualRecordIcon fontSize="small" color="success"/>Hoạt động</Box> : 
                                        <Box sx={{display: 'flex', 
                                            alignItems: 'center', gap: '5px'}}><FiberManualRecordIcon fontSize="small" color="error"/>Ngưng hoạt động</Box>}</TableCell>
                                <TableCell align="center">
                                    <Button sx={{
                                        width: '70px',
                                        height: '20px',
                                        fontSize: '9px',
                                        fontWeight: 'bold',
                                        textTransform: 'none',
                                        ml: 1
                                    }} color={'success'} variant="contained" onClick={() => {
                                        setCategory(category);
                                        setOpenUpdate(true);
                                    }}>Cập nhật</Button>
                                    <Button sx={{
                                        width: '70px',
                                        height: '20px',
                                        fontSize: '9px',
                                        fontWeight: 'bold',
                                        textTransform: 'none',
                                        ml: 1
                                    }} className="btn-action-table" variant="contained" color="error" onClick={() => {
                                        setCategory(category);
                                        setOpenDelete(true);
                                    }} >Xóa</Button>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}
export default Category;