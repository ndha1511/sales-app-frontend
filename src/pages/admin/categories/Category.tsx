import {
    Alert,
    Box,
    Button,
    Paper, Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {useEffect, useState} from "react";
import DialogCreateCategory from "../../../components/admin/dialogs/categories/DialogCreateCategory.tsx";

import {CategoryModel} from "../../../models/category.model.ts";
import {getAllCategories} from "../../../services/category.service..ts";
import {ResponseSuccess} from "../../../dtos/responses/response.success.ts";
import DialogUpdateCategory from "../../../components/admin/dialogs/categories/DialogUpdateCategory.tsx";
import DialogDeleteCategory from "../../../components/admin/dialogs/categories/DialogDeleteCategory.tsx";


const Category = () => {
    const [open, setOpen] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const [category, setCategory] = useState<CategoryModel>({});
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

    const addCategory =  (category: CategoryModel) => {
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
        <Box sx={{p: 2}}>
            <Button onClick={() => setOpen(true)}>Thêm loại sản phẩm</Button>
            {openUpdate && <DialogUpdateCategory showAlert={showAlert} updateCategory={updateCategory} open={openUpdate} handleClose={handleCloseUpdate} category={category}/>}
            {openDelete && <DialogDeleteCategory showAlert={showAlert} open={openDelete} handleClose={handleCloseDelete} category={category} deleteCategory={deleteCategory}/>}
            {open && <DialogCreateCategory showAlert={showAlert} addCategory={addCategory} open={open} handleClose={handleClose}/>}
            {openAlert.show && <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={openAlert.show} autoHideDuration={3000} onClose={() => setOpenAlert({
                show: false,
                status: '',
                message: ''
            })}>
                <Alert
                    severity={openAlert.status === 'success' ? 'success' : 'error'}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {openAlert.message}
                </Alert>
            </Snackbar>}
            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align={'center'}>Id</TableCell>
                            <TableCell align={'center'}>Tên loại sản phẩm</TableCell>
                            <TableCell align={'center'}>Trạng thái</TableCell>
                            <TableCell align={'center'}>Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.map((category: CategoryModel) => (
                            <TableRow key={category.id}>
                                <TableCell align={'center'}>{category.id}</TableCell>
                                <TableCell align={'center'}>{category.categoryName}</TableCell>
                                <TableCell align={'center'}>{category.status}</TableCell>
                                <TableCell align={'center'}>
                                    <Button color={'success'} onClick={() => {
                                        setCategory(category);
                                        setOpenUpdate(true);
                                    }}>Cập nhật</Button>
                                    <Button onClick={() => {
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