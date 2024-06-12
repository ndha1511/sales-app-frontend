import {Button, Dialog, DialogActions, DialogTitle} from "@mui/material";
import {CategoryModel} from "../../../../models/category.model.ts";
import {deleteCategory as deleteCategoryAPI} from "../../../../services/category.service..ts";

type Props = {
    open: boolean;
    handleClose: () => void;
    deleteCategory: (category: CategoryModel) => void;
    category: CategoryModel;
    showAlert: (status: string, message: string) => void
}

const DialogDeleteCategory = ({open, handleClose, deleteCategory, category, showAlert} : Props) => {
    const handleDelete = async () => {
        try {
            const response = await deleteCategoryAPI(category.id);
            console.log(response);
            deleteCategory(category);
            showAlert('success', 'Xóa thành công');
            handleClose();
        } catch (error) {
            showAlert('error', 'Xóa thất bại');
            handleClose();
        }
    }
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Bạn có chắc muốn xóa ?"}
            </DialogTitle>
            <DialogActions>
                <Button onClick={handleClose}>Hủy</Button>
                <Button onClick={handleDelete} autoFocus>
                    Đồng ý
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogDeleteCategory;