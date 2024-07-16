import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from 'yup';
import { UserModel } from "../../../models/user.model";
import { getUserFromLocalStorage } from "../../../services/user.service";
import { DeliveryMethod, OrderDto, PaymentMethod } from "../../../dtos/requests/order.dto";
import { CartItemModel } from "../../../models/cart-item.model";
import { getCartLocalStorage } from "../../../utils/cart-handle";
import { createOrder } from "../../../services/order.service";

const addressSchema = yup.object().shape({
    street: yup.string()
        .required('Street is required'),
    district: yup.string()
        .required('District is required'),
    city: yup.string()
        .required('City is required')
});

const validationOrderSchema = yup.object({
    phoneNumber: yup.string().required("Vui lòng nhập số điện thoại nhận hàng")
        .matches(/^0[0-9]{9}$/, "Số điện thoại không hợp lệ"),
    buyerName: yup.string().required("Vui lòng nhập tên người nhận hàng"),
    // addressDto: addressSchema
});
const Payment = () => {
    const user: UserModel | null = getUserFromLocalStorage();
    const cart: CartItemModel[] = getCartLocalStorage();
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
            })
        },
        validationSchema: validationOrderSchema,
        onSubmit: async (values: OrderDto) => {
            console.log(values);
            await createOrder(values);
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
            <Button onClick={() => formikPayment.submitForm()}>Đặt hàng</Button>
        </Box>
    )
}

export default Payment;