import { Box, Container, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ProviderModel } from "../../../models/provider.model";
import { CategoryModel } from "../../../models/category.model";
import { ResponseSuccess } from "../../../dtos/responses/response.success";
import { getAllProviders } from "../../../services/provider.service";
import { getAllCategories } from "../../../services/category.service.";
import { useNavigate } from "react-router-dom";

type Props = {
    pageNoState: number;
    search: {
        field: string;
        value: string;
        operator: string;
    }[];
    setSearch: React.Dispatch<React.SetStateAction<{
        field: string;
        value: string;
        operator: string;
    }[]>>;
    setSort: React.Dispatch<React.SetStateAction<{
        field: string;
        order: string;
    }[]>>;
    setPageNoState: React.Dispatch<React.SetStateAction<number>>
}

const parseParam = (param: string) => {
    const match = param.match(/(.*?)(<=|>=|:|-|>|<)(.*)/);
    if (!match) {
        throw new Error('Invalid parameter format');
    }

    const [, field, operator, value] = match;
    return { field, operator, value };
}

const FilterProduct = ({ pageNoState, search, setSearch, setSort, setPageNoState }: Props) => {

    const [providers, setProviders] = useState<ProviderModel[]>([]);
    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const [sortView, setSortView] = useState<string>("ALL");
    const [categoryName, setCategoryName] = useState<string>("ALL");
    const [providerName, setProviderName] = useState<string>("ALL");
    const [rangePrice, setRangePrice] = useState<string>("ALL");
    const queryParams = new URLSearchParams(location.search);
    const navigate = useNavigate();

    useEffect(() => {
        const searchParamString = queryParams.get("search");
        if (searchParamString) {
            const searchArray = searchParamString.split(',').map(param => parseParam(param));
            if (search.length > 0) {
                let flag : boolean = false;
                for (let i = 0; i < searchArray.length; i++) {
                    if (searchArray[i].field.startsWith("category")) {
                        setCategoryName(searchArray[i].value);
                    } else if (searchArray[i].field.startsWith("provider")) {
                        setProviderName(searchArray[i].value);
                    } else if (searchArray[i].field.startsWith("price")) {
                        if (!flag) {
                            setRangePrice(`${searchArray[i].operator}:${searchArray[i].value}`);
                        } else {
                            setRangePrice(prev =>
                                `${prev};${searchArray[i].operator}:${searchArray[i].value}`)
                        }
                        flag = true;
                    }
                }
            } else {
                setCategoryName("ALL");
                setProviderName("ALL");
                setRangePrice("ALL");
            }
            setSearch(searchArray);
        }
    }, [location.search]);

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

    const changeRange = (event: SelectChangeEvent<string>) => {
        setRangePrice(event.target.value);
        if (event.target.value !== "ALL") {
            const arrRange: string[] = event.target.value.split(";");
            let flag : boolean = false;
            for (let i = 0; i < arrRange.length; i++) {
                const [operator, value] = arrRange[i].split(':');
                setSearch(prev => {
                    if(!flag) {
                        const arrFilter = prev.filter(search => search.field !== 'price');
                        return [...arrFilter, {
                            field: 'price',
                            operator: operator,
                            value: value
                        }]
                    } else {
                        return [...prev, {
                            field: 'price',
                            operator: operator,
                            value: value
                        }]
                    }
                })
                flag = true;
                setPageNoState(1);
            }
        } else {
            setRangePrice("ALL");
            setSearch([]);
        }
    }

    return <Container sx={{
        mt: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: '20px'
    }}>
        <Box sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '10px'
        }}>
            <Typography>Lọc sản phẩm: </Typography>
            <Box sx={{
                display: 'flex',
                gap: '15px',
                flexWrap: "wrap",

            }}>
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
                    <InputLabel id="providersLabel">Thương hiệu</InputLabel>
                    <Select labelId="providersLabel"
                        name="provider.providerName"
                        label="Thương hiệu" size={"small"} value={providerName} onChange={e => changeSelect(e, setProviderName)}>
                        <MenuItem value="ALL">--.--</MenuItem>
                        {providers.map((provider: ProviderModel) => (
                            <MenuItem key={provider.id} value={provider.providerName}>{provider.providerName}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl sx={{
                    minWidth: '120px'
                }}>
                    <InputLabel id="price">Giá</InputLabel>
                    <Select labelId="price"
                        name="price"
                        label="Giá" size={"small"} value={rangePrice} onChange={e => changeRange(e)}>
                        <MenuItem value="ALL">--.--</MenuItem>
                        <MenuItem value="<:500000">Dưới 500k</MenuItem>
                        <MenuItem value=">=:500000;<=:1000000">Từ 500k tới 1tr</MenuItem>
                        <MenuItem value=">=:1000000;<=:2000000">Từ 1tr tới 2tr</MenuItem>
                        <MenuItem value=">:2000000">Trên 2tr</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Box>
        <Box sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '10px'
        }}>
            <Box sx={{
                display: 'flex',
                gap: '15px',
                flexWrap: "wrap",

            }}>
                <FormControl sx={{
                    minWidth: '120px'
                }}>
                    <InputLabel id="category">Sắp xếp</InputLabel>
                    <Select labelId="category"
                        name="category"
                        label="Sắp xếp" size={"small"} value={sortView} onChange={e => changeSelect(e, setSortView, true)}>
                        <MenuItem value="ALL">--.--</MenuItem>
                        <MenuItem value="price:asc">Giá tăng dần</MenuItem>
                        <MenuItem value="price:desc">Giá giảm dần</MenuItem>
                        <MenuItem value="buyQuantity:desc">Lượt mua</MenuItem>
                        <MenuItem value="numberOfRating:desc">Đánh giá</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Box>
    </Container>
}

export default FilterProduct;
