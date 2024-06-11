import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";

interface Column<T> {
    label: string;
    align?: 'right' | 'left' | 'center';
    accessor: keyof T;
}

interface TableProps<T> {
    rows: T[];
    columns: Column<T>[];
}

const TableCustom = <T extends NonNullable<unknown>>({rows, columns} : TableProps<T>) => {
  
    return <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
            <TableHead>
                <TableRow>
                    {columns.map((column, index) => (
                        <TableCell key={index} align={column.align || 'left'}>
                            {column.label}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row, rowIndex) => (
                    <TableRow
                        key={rowIndex}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        {columns.map((column, colIndex) => (
                            <TableCell key={colIndex} align={column.align || 'left'}>
                                {row[column.label.toLowerCase() as keyof T]}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
}

export default TableCustom;