
import {Box} from "@mui/material";
import CardGradientBackground, {CardGradientProps} from "../../components/admin/cards/CardGradientBackground.tsx";
import CardContent, {ContentCardProps} from "../../components/admin/cards/CardContent.tsx";
import {AttachMoney, InsertChart} from "@mui/icons-material";

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


    return (
        <Box sx={{
            display: "flex", width: "100%", justifyContent: "space-between",
            flexWrap: "wrap",
            p: 2,
            pl: 3,
            pr: 3,
            gap: '16px',
            backgroundColor: "background.paper"
        }}>
            {cards.map((cardItem, index: number) => {
                return (
                    <Box sx={{
                        flexBasis: '30%',
                        flexGrow: 1,
                        flexShrink: 1,
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
            {/*<Box sx={{flex: 1, display: 'flex'}}><BarChartCustom/></Box>*/}
        </Box>
    )
}

export default Dashboard;