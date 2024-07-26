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

// const addressSchema = yup.object().shape({
//     street: yup.string()
//         .required('Street is required'),
//     district: yup.string()
//         .required('District is required'),
//     city: yup.string()
//         .required('City is required')
// });

const validationOrderSchema = yup.object({
    phoneNumber: yup.string().required("Vui lòng nhập số điện thoại nhận hàng")
        .matches(/^0[0-9]{9}$/, "Số điện thoại không hợp lệ"),
    buyerName: yup.string().required("Vui lòng nhập tên người nhận hàng"),
    // addressDto: addressSchema
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
        if(vouchers.length <= 0) {
            try {
                const response : ResponseSuccess<VoucherModel[]> = await getVouchersByEmail(user?.email);
                setVouchers(response.data);
                console.log(response.data);
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
            productOrders: cart.map((item) => {
                return {
                    productDetailId: item.productDetail.id || 0,
                    quantity: item.quantity,
                }
            }),
            vouchers: vouchersApply.map((voucher) => voucher.id)
        },
        validationSchema: validationOrderSchema,
        onSubmit: async (values: OrderDto) => {
            values.vouchers = vouchersApply.map((voucher) => voucher.id);
            const response: ResponseSuccess<OrderModel> = await createOrder(values);
            const order :OrderModel = response.data;
            if(order.paymentMethod === PaymentMethod.CC) {
                alert('Đã đặt hàng thành công, vui lòng chuyển tiền qua đây: ');
                const paymentUrl :string = (await getVnpPaymentUrl(order.discountedAmount)).data;
                location.href = paymentUrl;
            }
            alert('đặt hàng thành công');
            localStorage.removeItem("cart");
            window.location.href = '/home';
        },
    });
    return (
        <Box sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
        }}>
            <TextField
                sx={{
                    flex: 1
                }}
                label="Tên người nhận"
                name="buyerName"
                value={formikPayment.values.buyerName}
                onChange={(e) => { formikPayment.handleChange(e) }}
                onBlur={formikPayment.handleBlur}
                error={formikPayment.touched.buyerName && Boolean(formikPayment.errors.buyerName)}
                helperText={formikPayment.touched.buyerName ? formikPayment.errors.buyerName : " "}
            />
            <TextField
                sx={{
                    flex: 1
                }}
                label="Số điện thoại người nhận"
                name="phoneNumber"
                value={formikPayment.values.phoneNumber}
                onChange={(e) => { formikPayment.handleChange(e) }}
                onBlur={formikPayment.handleBlur}
                error={formikPayment.touched.phoneNumber && Boolean(formikPayment.errors.phoneNumber)}
                helperText={formikPayment.touched.phoneNumber ? formikPayment.errors.phoneNumber : " "}
            />
            <TextField
                sx={{
                    flex: 1
                }}
                label="Tên đường"
                name="address.street"
                value={formikPayment.values.address.street}
                onChange={(e) => { formikPayment.handleChange(e) }}
                onBlur={formikPayment.handleBlur}

            />
            <TextField
                sx={{
                    flex: 1
                }}
                label="Quận, huyện"
                name="address.district"
                value={formikPayment.values.address.district}
                onChange={(e) => { formikPayment.handleChange(e) }}
                onBlur={formikPayment.handleBlur}

            />
            <TextField
                sx={{
                    flex: 1
                }}
                label="Tỉnh, thành phố"
                name="address.city"
                value={formikPayment.values.address.city}
                onChange={(e) => { formikPayment.handleChange(e) }}
                onBlur={formikPayment.handleBlur}

            />
            <FormControl sx={{
                mb: 2,
            }}>
                <InputLabel id="paymentMethod">Phương thức thanh toán</InputLabel>
                <Select
                    labelId="paymentMethod"
                    label="Phương thức thanh toán"
                    name="paymentMethod"
                    value={formikPayment.values.paymentMethod}
                    onChange={formikPayment.handleChange}
                    onBlur={formikPayment.handleBlur}
                    error={formikPayment.touched.paymentMethod && Boolean(formikPayment.errors.paymentMethod)}
                >
                    <MenuItem value={PaymentMethod.COD}>Thanh toán khi nhận hàng</MenuItem>
                    <MenuItem value={PaymentMethod.CC}>Thanh toán bằng ví điện tử</MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id="deliveryMethod">Phương thức vận chuyển</InputLabel>
                <Select
                    labelId="deliveryMethod"
                    label="Phương thức thanh toán"
                    name="deliveryMethod"
                    value={formikPayment.values.deliveryMethod}
                    onChange={formikPayment.handleChange}
                    onBlur={formikPayment.handleBlur}
                    error={formikPayment.touched.deliveryMethod && Boolean(formikPayment.errors.deliveryMethod)}
                >
                    <MenuItem value={DeliveryMethod.EXPRESS}>Giao hàng nhanh</MenuItem>
                    <MenuItem value={DeliveryMethod.ECONOMY}>Giao hàng tiết kiệm</MenuItem>
                </Select>
            </FormControl>
            <Button onClick={handleOpen}>Chọn mã giảm giá</Button>
            <Button onClick={() => formikPayment.submitForm()}>Đặt hàng</Button>
            <Dialog
                open={openDialog}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Mã giảm giá của bạn"}</DialogTitle>
                <DialogContent>
                    {vouchers.map((voucher: VoucherModel) => (
                        <Voucher key={voucher.id} voucher={voucher} addVoucher={addVoucher} voucherApply={vouchersApply}/>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default Payment;