import { Button, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { VerifyEmailDto } from "../../../dtos/requests/verify-email.dto";
import { ResponseSuccess } from "../../../dtos/responses/response.success";
import { LoginResponse } from "../../../dtos/responses/login-response";
import { verifyEmail } from "../../../services/auth.service";
import { saveToken } from "../../../services/token.service";
import { UserModel } from "../../../models/user.model";
import { getUserByEmail, saveUserToLocalStorage } from "../../../services/user.service";

const VerifyEmail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get('email');
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if(!email) {
            navigate("/auth/register");
        }
    }, []);

    const hanlderSubmit = async () => {

        const verifyEmailDto: VerifyEmailDto = {
            email: email ?? "",
            otp
        }
        try {
            const response: ResponseSuccess<LoginResponse> = await verifyEmail(verifyEmailDto);
            saveToken(response.data);
            const responseUser: ResponseSuccess<UserModel> = await getUserByEmail(email ?? "");
            saveUserToLocalStorage(responseUser.data);
            navigate("/home");
        } catch (error) {
            setError("Otp không chính xác")
        }
    }
    return (
        <Container>
            <input type="text" placeholder="Nhap ma xac nhan" onChange={(e) => setOtp(e.target.value)}/>
            {error && <p style={{color:'red'}}>{error}</p>}
            <Button variant="contained" color="primary" onClick={hanlderSubmit}>Xac nhan</Button>
        </Container>
    )
}
export default VerifyEmail;