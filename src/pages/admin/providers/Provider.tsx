import {Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import DialogCreateCategory from "../../../components/admin/dialogs/categories/DialogCreateCategory.tsx";
import {useState} from "react";

const Provider = () => {
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    }
    return (
        <Box>
            <Button onClick={() => setOpen(true)}>Thêm nhà cung cấp</Button>
            {open && <DialogCreateCategory open={open} handleClose={handleClose}/>}
            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Tên nhà cung cấp</TableCell>
                            <TableCell>Trạng thái</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default Provider;