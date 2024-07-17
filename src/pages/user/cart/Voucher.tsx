import { Box, Button, Typography } from "@mui/material"
import { VoucherModel } from "../../../models/voucher.model"
import { convertPrice } from "../../../utils/convert-price";

type Props = {
    voucher: VoucherModel;
    addVoucher: (voucher: VoucherModel) => void;
    voucherApply: VoucherModel[]
}

const Voucher = ({voucher, addVoucher, voucherApply} : Props) => {
    const isApply : boolean = voucherApply.some(v => v.id === voucher.id);
    return (
        <Box>
            <Typography>{`Giảm ${voucher.discount * 100}% cho đơn hàng từ ${convertPrice(voucher.minAmount)}`}</Typography>
            <Typography>{`Tối đa ${convertPrice(voucher.maxPrice)}`}</Typography>
            <Typography>{`Hạn sử dụng: ${voucher.expiredDate}`}</Typography>
            {isApply ? <Button>Hủy</Button>  :<Button onClick={() => addVoucher(voucher)}>Áp dụng</Button>}
        </Box>
    )
}

export default Voucher;