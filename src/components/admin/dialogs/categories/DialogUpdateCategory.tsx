import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import {useState} from "react";
import {Status} from "../../../../models/enums/status.enum.ts";
import {CategoryModel} from "../../../../models/category.model.ts";
import {ResponseSuccess} from "../../../../dtos/responses/response.success.ts";
import {updateCategory as updateCategoryAPi} from "../../../../services/category.service..ts";


type Props = {
    open: boolean;
    handleClose: () => void;
    category?: CategoryModel;
    updateCategory: (category: CategoryModel) => void;
    showAlert: (status: string, message: string) => void
}

const DialogUpdateCategory = ({open, handleClose, category, updateCategory, showAlert}: Props) => {
    const [categoryName, setCategoryName] = useState(category?.categoryName);
    const [errorText, setErrorText] = useState('');
    const [status, setStatus] = useState(category?.status?.toString()
        ?? Status.ACTIVE.toString());
    const handleSubmit = async () => {
        let newStatus: Status = Status.ACTIVE;
        if (status === 'INACTIVE') {
            newStatus = Status.INACTIVE;
        }
        if (category?.categoryName !== categoryName || category?.status !== newStatus) {
            try {
                const response: ResponseSuccess<CategoryModel> = await updateCategoryAPi(category?.id, {
                    categoryName,
                    status: newStatus
                });
                updateCategory(response.data);
                showAlert('success', 'Cập nhật thành công');
                handleClose();
            } catch (error) {
                showAlert('error', 'Cập nhật thất bại');
                handleClose();
            }
        }
    }
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
            }}
        >
            <DialogTitle>Cập nhật loại sản phẩm</DialogTitle>
            <DialogContent>
                <TextField
                    disabled={true}
                    label="ID"
                    value={category?.id}
                    type="text"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogContent>
                <TextField
                    autoFocus
                    id="category_name"
                    name="category_name"
                    label="Tên loại sản phẩm"
                    error={errorText !== ''}
                    helperText={errorText}
                    InputLabelProps={
                        {
                            shrink: true,
                        }
                    }
                    value={categoryName}
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(e) => {
                        setCategoryName(e.target.value);
                        setErrorText('');
                    }}
                />
            </DialogContent>
            <DialogContent>
                <FormControl fullWidth>
                    <InputLabel id="status">Trạng thái</InputLabel>
                    <Select
                        onChange={(e) => {
                            setStatus(e.target.value)
                        }}
                        labelId="status"
                        id="status"
                        value={status}
                        label="Trạng thái"
                    >
                        <MenuItem value={Status.ACTIVE.toString()}>Hoạt động</MenuItem>
                        <MenuItem value={Status.INACTIVE.toString()}>Ngưng hoạt động</MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Hủy</Button>
                <Button onClick={handleSubmit}>Cập nhật</Button>
            </DialogActions>
        </Dialog>
    );
}
export default DialogUpdateCategory;