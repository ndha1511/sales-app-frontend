import {ReactNode, useEffect, useState } from "react";
import { getUserFromLocalStorage } from "./services/user.service";
import { connect, isConnected, stompClient } from "./configurations/websocket.config";
import { UserModel } from "./models/user.model";
import { Message } from "stompjs";


const App = ({children} : {children: ReactNode}) => {
    const user: UserModel | null = getUserFromLocalStorage();
    const [connectSuccess, setConnectSuccess] = useState<boolean>(false);
    useEffect(() => {
        if(user !== null) {
            connect(onConnected, onError);
        } else {
            setConnectSuccess(true);
        }
    }, []);

    const onMessageReceived = (message: Message) => {
        console.log("Received message: ", message.body);
    }

    const onConnected = () => {
        console.log("Connected to websocket server");
        if(isConnected() && stompClient) {
            stompClient.subscribe("/user/" + user?.email + "/queue/notifications", onMessageReceived);
        }
        setConnectSuccess(true);
    }

    const onError = () => {
        console.log("Error connecting to websocket server");
    }
    return connectSuccess ? children : <></>;
}

export default App;