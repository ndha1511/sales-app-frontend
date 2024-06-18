import {Box, Input, Tooltip} from "@mui/material";
import IconButtonGradient from "../../common/IconButtonGradient.tsx";
import SearchIcon from "@mui/icons-material/Search";

type Props = {
    placeHolder?: string
}

const SearchInput = ({placeHolder}: Props) => {
    return <Box sx={{display: "flex", width:'100%'}}>
        <Input
            sx={{flex: 1}}
            placeholder={placeHolder}
        />
        <Tooltip title="Tìm kiếm">
        <IconButtonGradient type="button" aria-label="search">
            <SearchIcon/>
        </IconButtonGradient>
        </Tooltip>
    </Box>
}
export default SearchInput;