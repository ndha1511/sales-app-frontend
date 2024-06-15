import { Box, Button, IconButton, ImageListItem, ImageListItemBar } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from "react";

type Props = {
    url: string,
    removeImage: (index: number) => void,
    setThumbnailImage: (index: number) => void
    index: number,
    isThumbnail: boolean
}


const ProductImage = ({ url, removeImage, index, setThumbnailImage, isThumbnail }: Props) => {
    const [isHover, setIsHover] = useState<boolean>(false);
    return <ImageListItem
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        sx={{
            position: 'relative'
        }}
    >
        <img
            src={`${url}`}
            alt={"image"}
            loading="lazy"
            style={{
                objectFit: 'cover',
            }}
        />
        <ImageListItemBar
            sx={{
                background:
                    'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                    'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
            }}
            position="top"

            actionIcon={
                <Box sx={{ width: "100%" }}>
                    <IconButton
                        onClick={() => removeImage(index)}
                        sx={{ color: 'white' }}
                    >
                        <ClearIcon />
                    </IconButton>
                </Box>
            }
            actionPosition="right"
        />
        {isHover && !isThumbnail && <ImageListItemBar
            position="bottom"
            actionIcon={
                <Button
                    onClick={() => setThumbnailImage(index)}
                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                >
                    Đặt làm thumbnail
                </Button>
            }
            actionPosition="left"
        />}
        {isThumbnail && <Box sx={{
            position: 'absolute',
            top: 0,
            color: '#fff',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            p: 0.5,
            borderRadius: '0px 0px 5px 0px'
        }}>
            Thumbnail
        </Box>}
    </ImageListItem>

}

export default ProductImage;