import { Backdrop, Box, Button, CircularProgress, Container, TextField, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { UserRegisterDto } from "../../../dtos/requests/user-register.dto";
import * as yup from 'yup';
import { useFormik } from "formik";
import { useState } from "react";
import { register } from "../../../services/auth.service";
import { useNavigate } from "react-router-dom";

type RegisterForm = UserRegisterDto & {
    confirmPassword: string
}

const validationRegisterSchema = yup.object({
    email: yup.string()
        .required('Vui lòng nhập email')
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Email không hợp lệ"),
    password: yup.string()
        .required('Vui lòng nhập mật khẩu').min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password')], 'Mật khẩu xác nhận không khớp')
        .required('Vui lòng xác nhận mật khẩu'),
    phoneNumber: yup.string()
        .required("Vui lòng nhập số điện thoại")
        .matches(/^0[0-9]{9}$/, "Số điện thoại không hợp lệ"),
    name: yup.string().required("Vui lòng nhập tên")
});

const Register = () => {
    const [errorEmail, setErrorEmail] = useState("");
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const formikRegister = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
            phoneNumber: '',
            name: ''
        },
        validationSchema: validationRegisterSchema,
        onSubmit: async (values: RegisterForm) => {
            const userRegisterDto: UserRegisterDto = values;
            try {
                setOpen(true);
                await register(userRegisterDto);
                navigate("/auth/verify?email=" + userRegisterDto.email);
            } catch (error) {
                setErrorEmail("Email đã được sử dụng");
                setOpen(false);
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
                    value={formikRegister.values.email}
                    onChange={(e) => {formikRegister.handleChange(e); setErrorEmail("")}}
                    onBlur={formikRegister.handleBlur}
                    error={formikRegister.touched.email && Boolean(formikRegister.errors.email)}
                    helperText={formikRegister.touched.email && formikRegister.errors.email}
                />
                {errorEmail && <Typography color={"error"} component={"span"}>{errorEmail}</Typography>}
                <TextField
                    sx={{
                        flex: 1
                    }}
                    label="Họ và tên"
                    name="name"
                    value={formikRegister.values.name}
                    onChange={formikRegister.handleChange}
                    onBlur={formikRegister.handleBlur}
                    error={formikRegister.touched.name && Boolean(formikRegister.errors.name)}
                    helperText={formikRegister.touched.name && formikRegister.errors.name}
                />
                <TextField
                    sx={{
                        flex: 1
                    }}
                    type="password"
                    label="Mật khẩu"
                    name="password"
                    value={formikRegister.values.password}
                    onChange={formikRegister.handleChange}
                    onBlur={formikRegister.handleBlur}
                    error={formikRegister.touched.password && Boolean(formikRegister.errors.password)}
                    helperText={formikRegister.touched.password && formikRegister.errors.password}
                />
                <TextField
                    sx={{
                        flex: 1
                    }}
                    type="password"
                    label="Xác nhận mật khẩu"
                    name="confirmPassword"
                    value={formikRegister.values.confirmPassword}
                    onChange={formikRegister.handleChange}
                    onBlur={formikRegister.handleBlur}
                    error={formikRegister.touched.confirmPassword && Boolean(formikRegister.errors.confirmPassword)}
                    helperText={formikRegister.touched.confirmPassword && formikRegister.errors.confirmPassword}
                />
                <TextField
                    sx={{
                        flex: 1
                    }}
                    label="Số điện thoại"
                    type="tel"
                    name="phoneNumber"
                    value={formikRegister.values.phoneNumber}
                    onChange={formikRegister.handleChange}
                    onBlur={formikRegister.handleBlur}
                    error={formikRegister.touched.phoneNumber && Boolean(formikRegister.errors.phoneNumber)}
                    helperText={formikRegister.touched.phoneNumber && formikRegister.errors.phoneNumber}
                />
                <Button onClick={() => formikRegister.submitForm()}>Đăng nhập</Button>
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

export default Register;