import Header from "../../layouts/admin/Header.tsx";
import Footer from "../../layouts/admin/Footer.tsx";
import {Box, useMediaQuery} from "@mui/material";
import NavBar from "../../layouts/admin/NavBar.tsx";
import CardGradientBackground, {CardGradientProps} from "../../components/admin/cards/CardGradientBackground.tsx";
import CardContent, {ContentCardProps} from "../../components/admin/cards/CardContent.tsx";
import {AttachMoney, InsertChart} from "@mui/icons-material";
import {useState} from "react";
import BarChartCustom from "../../components/admin/charts/BarChartCustom.tsx";

type CardItem = CardGradientProps & ContentCardProps;

const Dashboard = () => {
    const cards: CardItem[] = [
        {
            color: "pink",
            icon: <InsertChart fontSize={"large"}/>,
            content: {
                text: "15.000",
                icon: <AttachMoney fontSize={"large"}/>
            },
            title: "hello"
        },
        {
            color: "blue",
            icon: <InsertChart fontSize={"large"}/>,
            content: {
                text: "15.000",
                icon: <AttachMoney fontSize={"large"}/>
            },
            title: "hello"
        },
        {
            color: "green",
            icon: <InsertChart fontSize={"large"}/>,
            content: {
                text: "15.000",
                icon: <AttachMoney fontSize={"large"}/>
            },
            title: "hello"
        },
    ];

    const [isOpenNavbar, setIsOpenNavbar] = useState(false);

    const openNavbar = () => {
        setIsOpenNavbar(!isOpenNavbar);
    }
    const isMobile : boolean = useMediaQuery('(max-width:600px)');

    return <Box sx={{display: "flex"}}>
        {isMobile? <></>: <NavBar isOpenNavbar={isOpenNavbar}></NavBar>}
        <Box sx={{flex: 1}}>
            <Header openNavbar={openNavbar}></Header>
            <Box sx={{
                display: "flex", width: "100%", justifyContent: "space-between",
                flexWrap: "wrap",
                p: 2,
                pl: 3,
                gap: '16px',
                backgroundColor: "background.paper"
            }}>
                {cards.map((cardItem, index: number) => {
                    return (
                        <Box sx={{
                            flexBasis: '30%', // Adjust this value to change the width of each card
                            flexGrow: 1,
                            flexShrink: 1,
                            minWidth: '250px', // Ensures the card doesn't get too small
                            height: '200px',
                        }} key={index}>
                            <CardGradientBackground color={cardItem.color}>
                                <CardContent title={cardItem.title}
                                             content={cardItem.content}
                                             icon={cardItem.icon}/>
                            </CardGradientBackground>
                        </Box>
                    )
                })}
                <Box sx={{width: '100%'}}><BarChartCustom/></Box>
            </Box>
            <Footer></Footer>
        </Box>
    </Box>
}

export default Dashboard;