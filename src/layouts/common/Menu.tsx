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
        href: '/admin/dashboard/1'
    },
    {
        title: 'Hóa đơn',
        icon: <BackupTable />,
        href: '/admin/dashboard/1'
    },
    {
        title: 'Tin nhắn',
        icon: <MessageIcon />,
        href: '/admin/dashboard/1'
    },
    {
        title: 'Khuyến mãi',
        icon: <BookmarkIcon />,
        href: '/admin/dashboard/1'
    },
    {
        title: 'Thống kê',
        icon: <Equalizer />,
        href: '/admin/dashboard/1'
    }
];

export const userMenu = [
    {
        title: 'Trang chủ',
        href: '/',
    },
    {
        title: 'Sản phẩm',
        href: '/products',
        child: [
            {
                title: 'Sản phẩm mới',
                href: '/products/new',
            },
            {
                title: 'Sản phẩm bán chạy',
                href: '/products/hot',
            }
        ]
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