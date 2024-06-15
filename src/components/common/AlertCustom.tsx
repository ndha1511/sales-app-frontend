import { Alert, Snackbar } from "@mui/material";

type AlertType = {
    show: boolean;
    status: string;
    message: string;
}

type Props = {
    alert: AlertType;
    colseAlert: () => void;
}



const AlertCustom = ({alert, colseAlert} : Props) => {
    return (
        <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={alert.show} autoHideDuration={3000} onClose={colseAlert}>
                <Alert
                    severity={alert.status === 'success' ? 'success' : 'error'}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {alert.message}
                </Alert>
            </Snackbar>
    )
}

export default AlertCustom;