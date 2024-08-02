import LocalMallIcon from '@mui/icons-material/LocalMall';
import GroupIcon from '@mui/icons-material/Group';
import MessageIcon from '@mui/icons-material/Message';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { BackupTable, Equalizer, Home } from "@mui/icons-material";

export const adminMenu = [
    {
        title: 'Dashboard',
        icon: <Home />,
        href: '/admin/dashboard'
    },
    {
        title: 'Sản phẩm',
        icon: <LocalMallIcon />,
        href: '/admin/product',
        child: [
            {
                title: 'Thêm sản phẩm',
                icon: <FiberManualRecordIcon fontSize={"small"} sx={{ fontSize: '14px' }} />,
                href: '/admin/product/create'
            },
            {
                title: 'Danh sách sản phẩm',
                icon: <FiberManualRecordIcon fontSize={"small"} sx={{ fontSize: '14px' }} />,
                href: '/admin/product'
            },
            {
                title: 'Loại sản phẩm',
                icon: <FiberManualRecordIcon fontSize={"small"} sx={{ fontSize: '14px' }} />,
                href: '/admin/product/category'
            },
            {
                title: 'Nhà cung cấp',
                icon: <FiberManualRecordIcon fontSize={"small"} sx={{ fontSize: '14px' }} />,
                href: '/admin/product/provider'
            }
        ]
    },
    {
        title: 'Khách hàng',
        icon: <GroupIcon />,
        href: '/admin/customer'
    },
    {
        title: 'Hóa đơn',
        icon: <BackupTable />,
        href: '/admin/order'
    },
    {
        title: 'Tin nhắn',
        icon: <MessageIcon />,
        href: '/admin/message'
    },
    {
        title: 'Khuyến mãi',
        icon: <BookmarkIcon />,
        href: '/admin/coupon'
    },
    {
        title: 'Thống kê',
        icon: <Equalizer />,
        href: '/admin/statistics'
    }
];

export const userMenu = [
    {
        title: 'Trang chủ',
        href: '/home',
    },
    {
        title: 'Sản phẩm',
        href: '/products',
    },
    {
        title: 'Khuyến mãi',
        href: '/promotions',
    },
    {
        title: 'Giới thiệu',
        href: '/about',
    },
    {
        title: 'Thương hiệu',
        href: '/brands',
    }
]