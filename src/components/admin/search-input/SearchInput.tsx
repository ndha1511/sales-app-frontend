import {Box, Input} from "@mui/material";
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
        <IconButtonGradient type="button" aria-label="search">
            <SearchIcon/>
        </IconButtonGradient>
    </Box>
}
export default SearchInput;