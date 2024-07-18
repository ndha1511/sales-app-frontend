import SockJS from "sockjs-client";
import { apiUrl } from "./api-url";
import { Client, over } from "stompjs";

export var stompClient : Client | null = null;

export const connect = (onConnected: () => void, onError: () => void)  => {
    let sock = new SockJS(`${apiUrl}/ws`);
    stompClient = over(sock);
    stompClient.connect({}, onConnected, onError);
}

export const disconnect = () => {
    if (stompClient !== null) {
        stompClient.disconnect(()=> {
            console.log("Disconnected from server.");
        });
        stompClient = null;
    }
};

export const isConnected = (): boolean => {
    return stompClient !== null && stompClient.connected;
};