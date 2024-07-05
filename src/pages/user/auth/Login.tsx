import { Backdrop, Box, Button, CircularProgress, Container, IconButton, TextField, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import { login, loginWithSocial } from "../../../services/auth.service";
import * as yup from 'yup';
import { useFormik } from "formik";
import { LoginRequestDto } from "../../../dtos/requests/login-request.dto";
import { ResponseSuccess } from "../../../dtos/responses/response.success";
import { LoginResponse } from "../../../dtos/responses/login-response";
import { saveToken } from "../../../services/token.service";
import { getUserByEmail, saveUserToLocalStorage } from "../../../services/user.service";
import { UserModel } from "../../../models/user.model";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const validationLoginSchema = yup.object({
    email: yup.string().required('Vui lòng nhập email'),
    password: yup.string().required('Vui lòng nhập mật khẩu'),
});

const Login = () => {
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const formikLogin = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationLoginSchema,
        onSubmit: async (values: LoginRequestDto) => {
            try {
                setOpen(true);
                const response: ResponseSuccess<LoginResponse> = await login(values);
                saveToken(response.data);
                const responseUser: ResponseSuccess<UserModel> = await getUserByEmail(values.email);
                saveUserToLocalStorage(responseUser.data);
                navigate("/home");
            } catch (error) {
                setOpen(false);
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                setError("email hoặc mật khẩu không chính xác");
            }
            
        },
    });
    return (
        <Container sx={{
            height: '100vh',
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Box sx={{
                width: '60%',
                display: "flex",
                justifyContent: 'center',
                background: blue[400],
                p: 2,
                gap: '12px',
                flexDirection: "column",
                borderRadius: '8px'
            }}>
                <TextField
                    sx={{
                        flex: 1
                    }}
                    label="Email"
                    name="email"
                    value={formikLogin.values.email}
                    onChange={formikLogin.handleChange}
                    onBlur={formikLogin.handleBlur}
                    error={formikLogin.touched.email && Boolean(formikLogin.errors.email)}
                    helperText={formikLogin.touched.email && formikLogin.errors.email}
                />
                <TextField
                    sx={{
                        flex: 1
                    }}
                    type="password"
                    label="Password"
                    name="password"
                    value={formikLogin.values.password}
                    onChange={formikLogin.handleChange}
                    onBlur={formikLogin.handleBlur}
                    error={formikLogin.touched.password && Boolean(formikLogin.errors.password)}
                    helperText={formikLogin.touched.password && formikLogin.errors.password}
                />
                {error && <Typography component={"span"} color={"error"}>{error}</Typography>}
                <Button onClick={() => formikLogin.submitForm()}>Đăng nhập</Button>
                <Box>
                    <IconButton onClick={() => loginWithSocial('facebook')}>
                        <FacebookIcon />
                    </IconButton>
                    <IconButton onClick={() => loginWithSocial('google')}>
                        <GoogleIcon />
                    </IconButton>
                </Box>
                <Button onClick={() => navigate("/auth/register")}>Tạo tài khoản</Button>

            </Box>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </Container>
    )
}

export default Login;
