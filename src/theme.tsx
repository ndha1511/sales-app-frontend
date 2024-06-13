import { experimental_extendTheme as extendTheme} from '@mui/material/styles';
import {green, pink} from "@mui/material/colors";

export const theme = extendTheme({
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: pink[600],
                },
                secondary: {
                    main: '#f0f0f0'
                },

            },
        },
        dark: {
            palette: {
                primary: {
                    main: pink[400],
                },
                secondary: {
                    main: pink[300],
                },
                success: {
                    main: green[600],
                }


            },
        },
    },
});

export const primaryGradient = 'linear-gradient(to right, #CB7FFF 40%, #A15BFF 100%)';
export const pinkGradient = 'linear-gradient(to right, #FFA296 0%, #FE8596 50%, #FE7096 100%)';
export const blueGradient = 'linear-gradient(to right, #40D1E9 0%, #56C5EC 50%, #7CB1F2 100%)';
export const greenGradient = 'linear-gradient(to right, #4ECBBB 0%, #46C9B8 50%, #3CC6B3 100%)';