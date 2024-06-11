import {Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useState} from "react";
import DialogCategory from "../../../components/admin/dialogs/DialogCategory.tsx";


const Category = () => {
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Box>
            <Button onClick={() => setOpen(true)}>Thêm loại sản phẩm</Button>
            {open && <DialogCategory open={open} handleClose={handleClose}/>}
            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Tên loại sản phẩm</TableCell>
                            <TableCell>Trạng thái</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}
export default Category;