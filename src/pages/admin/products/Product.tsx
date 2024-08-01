import {
    Box, FormControl, InputLabel, MenuItem, Pagination,
    Select, SelectChangeEvent, Stack,
    Typography,
    useMediaQuery,

} from "@mui/material";
import SearchInput from "../../../components/common/search-input/SearchInput.tsx";
import ButtonGradient from "../../../components/common/ButtonGradient.tsx";
import { pinkGradient } from "../../../theme.tsx";
import AddIcon from '@mui/icons-material/Add';
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../../../components/admin/cards/ProductCard.tsx";
import { useEffect, useState } from "react";
import { getPageProducts } from "../../../services/product.service.ts";
import { ResponseSuccess } from "../../../dtos/responses/response.success.ts";
import { ProductUserResponse } from "../../../dtos/responses/product-user-response.ts";
import { PageResponse } from "../../../dtos/responses/page-response.ts";
import { ProviderModel } from "../../../models/provider.model.ts";
import { CategoryModel } from "../../../models/category.model.ts";
import { getAllProviders } from "../../../services/provider.service.ts";
import { getAllCategories } from "../../../services/category.service..ts";


const Product = () => {
    const isMobile = useMediaQuery('(max-width:600px)');
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [totalPage, setTotalPage] = useState(1);
    const pageNo = queryParams.get("pageNo") ? Number(queryParams.get("pageNo")) : 1;
    const [pageNoState, setPageNoState] = useState(pageNo);
    const [search, setSearch] = useState<{
        field: string,
        value: string,
        operator: string
    }[]>([]);
    const [status, setStatus] = useState<string>("ALL");
    const [sort, setSort] = useState<{
        field: string,
        order: string
    }[]>([]);
    const [providers, setProviders] = useState<ProviderModel[]>([]);
    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const [sortView, setSortView] = useState<string>("ALL");
    const [categoryName, setCategoryName] = useState<string>("ALL");
    const [providerName, setProviderName] = useState<string>("ALL");

    const fNavigate = (id: number) => {
        navigate('update/' + id);
    }
    const [products, setProducts] = useState<ProductUserResponse[]>([]);
    const handleSearch = (text: string) => {
        if (text) {
            const searchParams = [{
                field: "productName",
                value: text,
                operator: ":"
            }];
            setSearch(searchParams);
        } else {
            setSearch([]);
        }
    }

    const changeSelect = (event: SelectChangeEvent<string>, dispatch: React.Dispatch<React.SetStateAction<string>>, sort: boolean = false) => {
        dispatch(event.target.value);
        if (event.target.value !== "ALL") {
            if (!sort) {
                setSearch(prev => {
                    const filter = prev.filter(s => s.field !== event.target.name);
                    filter.push({
                        field: event.target.name,
                        value: event.target.value,
                        operator: "-"
                    })
                    return filter;
                });
                setPageNoState(1);
            } else {
                const arrSplit: string[] = event.target.value.split(":");
                setSort([
                    {
                        field: arrSplit[0],
                        order: arrSplit[1]
                    }
                ]);
                setPageNoState(1);
            }
        } else {
            if (!sort) {
                setSearch([]);
            } else {
                setSort([]);
            }
        }

    }

    useEffect(() => {
        handleNavigate(pageNoState, search);
    }, [pageNoState, search]);

    const handleNavigate = (pageNoState: number, searchParams: any[]) => {
        let appendSearch: string = "";
        if (searchParams.length > 0) {
            const searchString: string = searchParams.map(param => `${param.field}${param.operator}${param.value}`).join(',');
            appendSearch = "&search=" + encodeURIComponent(searchString);
        }

        navigate(`?pageNo=${pageNoState}${appendSearch}`);
    }

    useEffect(() => {
        const searchParamString = queryParams.get("search");
        if (searchParamString) {
            const searchArray: {
                field: string,
                operator: string,
                value: string;
            }[] = searchParamString.split(',').map(param => {
                const [field, operatorValue] = param.split(/[:\-]/);
                const operator = param.includes(':') ? ':' : '-';
                const value = operatorValue.split('or')[0];
                return { field, operator, value };
            });
            if (search.length > 0) {
                for (let i = 0; i < searchArray.length; i++) {
                    if (searchArray[i].field.startsWith("category")) {
                        setCategoryName(searchArray[i].value);
                    } else if (searchArray[i].field.startsWith("provider")) {
                        setProviderName(searchArray[i].value);
                    } else if (searchArray[i].field.startsWith("status")) {
                        setStatus(searchArray[i].value);
                    }
                }
            } else {
                setCategoryName("ALL");
                setProviderName("ALL");
                setStatus("ALL");
            }
            setSearch(searchArray);
        }
    }, [location.search]);

    useEffect(() => {
        (async () => {
            try {
                const responseProvider: ResponseSuccess<ProviderModel[]> = await getAllProviders();
                setProviders(responseProvider.data);
                const responseCategory: ResponseSuccess<CategoryModel[]> = await getAllCategories();
                setCategories(responseCategory.data);

            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const response: ResponseSuccess<PageResponse<ProductUserResponse[]>> = await getPageProducts(pageNoState, 40, search, sort);
                setProducts(response.data.data);
                setTotalPage(response.data.totalPage);
            } catch (e) {
                console.log(e);
            }
        })();
    }, [pageNoState, search, sort]);
    const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPageNoState(value);
    };

    return <Box sx={{ display: 'flex', flexDirection: 'column', p: 2 }}>
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'flex-end', mb: 2 }}>
            <Typography component="span" sx={{ flexGrow: 1 }}>Danh sách sản phẩm</Typography>
            <ButtonGradient size="small" sx={{
                background: pinkGradient,
                color: "#fff",
                fontSize: 10
            }} onClick={() => navigate("create")}>Thêm sản phẩm <AddIcon /> </ButtonGradient>
        </Box>
        <Box sx={{
            display: "flex", alignItems: "center",
            justifyContent: "space-between", mb: 3,
            flexWrap: "wrap",
            gap: '25px'
        }}>
            <Box><SearchInput placeHolder={"Nhập tên sản phẩm"} handleSearch={handleSearch} /></Box>
            <Box sx={{
                display: 'flex',
                gap: '15px',
                flexWrap: "wrap",
            }}>
                <FormControl sx={{
                    minWidth: '120px'
                }}>
                    <InputLabel id="status">Trạng thái</InputLabel>
                    <Select labelId="status"
                        name="status"
                        label="Trạng thái" size={"small"} value={status} onChange={e => changeSelect(e, setStatus)}>
                        <MenuItem value="ALL">--.--</MenuItem>
                        <MenuItem value="ACTIVE">Đang kinh doanh</MenuItem>
                        <MenuItem value="INACTIVE">Ngưng kinh doanh</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{
                    minWidth: '120px'
                }}>
                    <InputLabel id="categoriesLabel">Loại sản phẩm</InputLabel>
                    <Select labelId="categoriesLabel"
                        name="category.categoryName"
                        label="Loại sản phẩm" size={"small"} value={categoryName} onChange={e => changeSelect(e, setCategoryName)}>
                        <MenuItem value="ALL">--.--</MenuItem>
                        {categories.map((category: CategoryModel) => (
                            <MenuItem key={category.id} value={category.categoryName}>{category.categoryName}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl sx={{
                    minWidth: '120px'
                }}>
                    <InputLabel id="providersLabel">Nhà cung cấp</InputLabel>
                    <Select labelId="providersLabel"
                        name="provider.providerName"
                        label="Loại sản phẩm" size={"small"} value={providerName} onChange={e => changeSelect(e, setProviderName)}>
                        <MenuItem value="ALL">--.--</MenuItem>
                        {providers.map((provider: ProviderModel) => (
                            <MenuItem key={provider.id} value={provider.providerName}>{provider.providerName}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl sx={{
                    minWidth: '120px'
                }}>
                    <InputLabel id="status">Sắp xếp</InputLabel>
                    <Select labelId="status"
                        label="Trạng thái" size={"small"} value={sortView} onChange={e => changeSelect(e, setSortView, true)}>
                        <MenuItem value="ALL">--.--</MenuItem>
                        <MenuItem value="createdAt:asc">Mới nhất</MenuItem>
                        <MenuItem value="createdAt:desc">Cũ nhất</MenuItem>
                        <MenuItem value="price:asc">Giá tăng dần</MenuItem>
                        <MenuItem value="price:desc">Giá giảm dần</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Box>
        <Box sx={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            p: 0.5
        }}>
            {products.map((item: ProductUserResponse, index: number) => (
                <Box sx={{ width: isMobile ? '150px' : '270px' }} key={index}>
                    <ProductCard
                        productId={item.product.id ?? 0}
                        productName={item.product.productName ?? ''}
                        productPrice={item.product.price ?? 0}
                        fNavigate={fNavigate}
                        thumbnail={item.product.thumbnail ?? ''}
                    />
                </Box>
            ))}
        </Box>
        <Box sx={{
            display: 'flex', alignItems: 'center',
            width: '100%', justifyContent: 'flex-end',
            mt: 2
        }}>
            <Stack spacing={2}>
                <Pagination count={totalPage} page={pageNoState} variant="outlined" color={"primary"} onChange={handleChange} />
            </Stack>
        </Box>
    </Box>
}

export default Product;