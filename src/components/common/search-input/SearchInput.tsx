import {Box, Input, Tooltip} from "@mui/material";
import IconButtonGradient from "../../common/IconButtonGradient.tsx";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

type Props = {
    placeHolder?: string,
    handleSearch?: (text: string) => void
}

const SearchInput = ({placeHolder, handleSearch}: Props) => {
    const [valueSearch, setValueSearch] = useState<string>("");
    return <Box sx={{display: "flex", width:'100%'}}>
        <Input
            sx={{flex: 1}}
            placeholder={placeHolder}
            value={valueSearch}
            onChange={(e) => setValueSearch(e.target.value)}
        />
        <Tooltip title="Tìm kiếm">
        <IconButtonGradient type="button" aria-label="search" onClick={() => {
            if(handleSearch) {
                handleSearch(valueSearch);
            }
        }}>
            <SearchIcon/>
        </IconButtonGradient>
        </Tooltip>
    </Box>
}
export default SearchInput;