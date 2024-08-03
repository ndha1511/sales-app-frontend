import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from 'yup';
import { UserModel } from "../../../models/user.model";
import { getUserFromLocalStorage } from "../../../services/user.service";
import { DeliveryMethod, OrderDto, PaymentMethod } from "../../../dtos/requests/order.dto";
import { CartItemModel } from "../../../models/cart-item.model";
import { getCartLocalStorage } from "../../../utils/cart-handle";
import { createOrder } from "../../../services/order.service";
import { useState } from "react";
import { VoucherModel } from "../../../models/voucher.model";
import { ResponseSuccess } from "../../../dtos/responses/response.success";
import { getVouchersByEmail } from "../../../services/voucher.service";
import Voucher from "./Voucher";
import { OrderModel } from "../../../models/order.model";
import { getVnpPaymentUrl } from "../../../services/payment.service";

const validationOrderSchema = yup.object({
    phoneNumber: yup.string().required("Vui lòng nhập số điện thoại nhận hàng")
        .matches(/^0[0-9]{9}$/, "Số điện thoại không hợp lệ"),
    buyerName: yup.string().required("Vui lòng nhập tên người nhận hàng"),
});

const Payment = () => {
    const user: UserModel | null = getUserFromLocalStorage();
    const cart: CartItemModel[] = getCartLocalStorage();
    const [openDialog, setOpenDialog] = useState(false);
    const [vouchers, setVouchers] = useState<VoucherModel[]>([]);
    const [vouchersApply, setVouchersApply] = useState<VoucherModel[]>([]);

    const handleClose = () => {
        setOpenDialog(false);
    }

    const addVoucher = (voucher: VoucherModel) => {
        const index = vouchersApply.findIndex((v) => v.id === voucher.id);
        if (index === -1) {
            setVouchersApply([...vouchersApply, voucher]);
        }
    }

    const handleOpen = async () => {
        if (vouchers.length <= 0) {
            try {
                const response: ResponseSuccess<VoucherModel[]> = await getVouchersByEmail(user?.email);
                setVouchers(response.data);
                setOpenDialog(true);
            } catch (error) {
                console.log(error);
            }
        } else {
            setOpenDialog(true);
        }
    }

    const formikPayment = useFormik({
        initialValues: {
            email: user?.email || '',
            phoneNumber: user?.phoneNumber || '',
            buyerName: user?.name || '',
            address: {
                street: user?.address?.street || '',
                district: user?.address?.district || '',
                city: user?.address?.city || ''
            },
            note: '',
            paymentMethod: PaymentMethod.COD,
            deliveryMethod: DeliveryMethod.ECONOMY,
            productOrders: cart.map((item) => ({
                productDetailId: item.productDetail.id || 0,
                quantity: item.quantity,
            })),
            vouchers: vouchersApply.map((voucher) => voucher.id)
        },
        validationSchema: validationOrderSchema,
        onSubmit: async (values: OrderDto) => {
            values.vouchers = vouchersApply.map((voucher) => voucher.id);
            const response: ResponseSuccess<OrderModel> = await createOrder(values);
            const order: OrderModel = response.data;
            if (order.paymentMethod === PaymentMethod.CC) {
                alert('Đã đặt hàng thành công, vui lòng chuyển tiền qua đây: ');
                const paymentUrl: string = (await getVnpPaymentUrl(order.discountedAmount)).data;
                location.href = paymentUrl;
            } else {
                alert('Đặt hàng thành công');
                localStorage.removeItem("cart");
                window.location.href = '/home';
            }
        },
    });

    return (
        <Box sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#121212', // Nền tối cho chế độ tối
            color: '#ffffff', // Màu chữ sáng
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
        }}>
            <TextField
                sx={{
                    mb: 2, // Khoảng cách dưới giữa các trường
                    '& .MuiInputBase-root': {
                        backgroundColor: '#1e1e1e', // Nền trường nhập liệu
                        color: '#ffffff', // Màu chữ trong trường nhập liệu
                        borderRadius: '4px',
                    },
                    '& .MuiFormLabel-root': {
                        color: '#b0b0b0', // Màu nhãn trường nhập liệu
                    },
                }}
                label="Tên người nhận"
                name="buyerName"
                value={formikPayment.values.buyerName}
                onChange={formikPayment.handleChange}
                onBlur={formikPayment.handleBlur}
                error={formikPayment.touched.buyerName && Boolean(formikPayment.errors.buyerName)}
                helperText={formikPayment.touched.buyerName ? formikPayment.errors.buyerName : ""}
            />
            <TextField
                sx={{
                    mb: 2,
                    '& .MuiInputBase-root': {
                        backgroundColor: '#1e1e1e',
                        color: '#ffffff',
                        borderRadius: '4px',
                    },
                    '& .MuiFormLabel-root': {
                        color: '#b0b0b0',
                    },
                }}
                label="Số điện thoại người nhận"
                name="phoneNumber"
                value={formikPayment.values.phoneNumber}
                onChange={formikPayment.handleChange}
                onBlur={formikPayment.handleBlur}
                error={formikPayment.touched.phoneNumber && Boolean(formikPayment.errors.phoneNumber)}
                helperText={formikPayment.touched.phoneNumber ? formikPayment.errors.phoneNumber : ""}
            />
            <TextField
                sx={{
                    mb: 2,
                    '& .MuiInputBase-root': {
                        backgroundColor: '#1e1e1e',
                        color: '#ffffff',
                        borderRadius: '4px',
                    },
                    '& .MuiFormLabel-root': {
                        color: '#b0b0b0',
                    },
                }}
                label="Tên đường"
                name="address.street"
                value={formikPayment.values.address.street}
                onChange={formikPayment.handleChange}
                onBlur={formikPayment.handleBlur}
            />
            <TextField
                sx={{
                    mb: 2,
                    '& .MuiInputBase-root': {
                        backgroundColor: '#1e1e1e',
                        color: '#ffffff',
                        borderRadius: '4px',
                    },
                    '& .MuiFormLabel-root': {
                        color: '#b0b0b0',
                    },
                }}
                label="Quận, huyện"
                name="address.district"
                value={formikPayment.values.address.district}
                onChange={formikPayment.handleChange}
                onBlur={formikPayment.handleBlur}
            />
            <TextField
                sx={{
                    mb: 2,
                    '& .MuiInputBase-root': {
                        backgroundColor: '#1e1e1e',
                        color: '#ffffff',
                        borderRadius: '4px',
                    },
                    '& .MuiFormLabel-root': {
                        color: '#b0b0b0',
                    },
                }}
                label="Tỉnh, thành phố"
                name="address.city"
                value={formikPayment.values.address.city}
                onChange={formikPayment.handleChange}
                onBlur={formikPayment.handleBlur}
            />
            <FormControl sx={{ mb: 2 }}>
                <InputLabel id="paymentMethod" sx={{ color: '#b0b0b0' }}>Phương thức thanh toán</InputLabel>
                <Select
                    labelId="paymentMethod"
                    label="Phương thức thanh toán"
                    name="paymentMethod"
                    value={formikPayment.values.paymentMethod}
                    onChange={formikPayment.handleChange}
                    onBlur={formikPayment.handleBlur}
                    error={formikPayment.touched.paymentMethod && Boolean(formikPayment.errors.paymentMethod)}
                    sx={{ 
                        '& .MuiSelect-select': {
                            backgroundColor: '#1e1e1e',
                            color: '#ffffff',
                        },
                        '& .MuiFormLabel-root': {
                            color: '#b0b0b0',
                        },
                    }}
                >
                    <MenuItem value={PaymentMethod.COD}>Thanh toán khi nhận hàng</MenuItem>
                    <MenuItem value={PaymentMethod.CC}>Thanh toán bằng ví điện tử</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{ mb: 2 }}>
                <InputLabel id="deliveryMethod" sx={{ color: '#b0b0b0' }}>Phương thức vận chuyển</InputLabel>
                <Select
                    labelId="deliveryMethod"
                    label="Phương thức vận chuyển"
                    name="deliveryMethod"
                    value={formikPayment.values.deliveryMethod}
                    onChange={formikPayment.handleChange}
                    onBlur={formikPayment.handleBlur}
                    error={formikPayment.touched.deliveryMethod && Boolean(formikPayment.errors.deliveryMethod)}
                    sx={{ 
                        '& .MuiSelect-select': {
                            backgroundColor: '#1e1e1e',
                            color: '#ffffff',
                        },
                        '& .MuiFormLabel-root': {
                            color: '#b0b0b0',
                        },
                    }}
                >
                    <MenuItem value={DeliveryMethod.EXPRESS}>Giao hàng nhanh</MenuItem>
                    <MenuItem value={DeliveryMethod.ECONOMY}>Giao hàng tiết kiệm</MenuItem>
                </Select>
            </FormControl>
            <Button 
                onClick={handleOpen} 
                sx={{ 
                    mt: 2, 
                    backgroundColor: '#1e1e1e', 
                    color: '#ffffff', 
                    ':hover': { backgroundColor: '#333333' } 
                }}
            >
                Chọn mã giảm giá
            </Button>
            <Button 
                onClick={() => formikPayment.submitForm()} 
                sx={{ 
                    mt: 2, 
                    backgroundColor: '#1e1e1e', 
                    color: '#ffffff', 
                    ':hover': { backgroundColor: '#333333' } 
                }}
            >
                Đặt hàng
            </Button>
            <Dialog
                open={openDialog}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                sx={{ '& .MuiPaper-root': { backgroundColor: '#1e1e1e', color: '#ffffff' } }}
            >
                <DialogTitle>{"Mã giảm giá của bạn"}</DialogTitle>
                <DialogContent>
                    {vouchers.map((voucher: VoucherModel) => (
                        <Voucher key={voucher.id} voucher={voucher} addVoucher={addVoucher} voucherApply={vouchersApply}/>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{ color: '#ffffff' }}>Đóng</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default Payment;
