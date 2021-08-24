import {StatusType, TChatMessage} from "../types/types";

type SubscriberType = (messages: TChatMessage[]) => void;
type TEventNames = 'message-received' | 'status-changed';
type MessageReceivedSubscriberType = (messages: TChatMessage[]) => void;
type StatusChangedSubscriberType = (status: StatusType) => void;


let ws: WebSocket | null;
let subscribers = {
    'message-received': [] as MessageReceivedSubscriberType[],
    'status-changed': [] as StatusChangedSubscriberType[],
};

const notifySubscribersStatusChange = (status: StatusType) => {
    subscribers["status-changed"].forEach(s => s(status));
}
const closeChannelHandler = () => {
    console.log("WS CLOSE");
    setTimeout(createChannel, 3000);
}

const messageHandler = (e: MessageEvent) => {
    let newMessage = JSON.parse(e.data);
    subscribers['message-received'].forEach(s => s(newMessage));
};

const openHandler = () => {
    notifySubscribersStatusChange('ready');
};
const errorHandler = () => {
    notifySubscribersStatusChange('error');
    console.error('REFRESH PAGE');
};

const createChannel = () => {
    //зачистка старого сокета
    //handler должен быть вынесен в отдельную функцию чтобы отписка произошла
    cleanUp();
    ws?.close();
    ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");
    notifySubscribersStatusChange('pending');
    ws?.addEventListener("close", closeChannelHandler);
    ws?.addEventListener("message", messageHandler);
    ws?.addEventListener("open", openHandler);
    ws?.addEventListener("error", errorHandler);
}


const cleanUp = () => {
    ws?.removeEventListener("close", closeChannelHandler);
    ws?.removeEventListener("message", messageHandler);
    ws?.removeEventListener("open", openHandler);
    ws?.removeEventListener("error", errorHandler);
};

export const chatAPI = {
    start() {
        createChannel();
    },
    stop() {
        subscribers['message-received'] = [];
        subscribers['status-changed'] = [];
        cleanUp();
        ws?.close();
    },
    subscribe: function (eventName: TEventNames, callback: MessageReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName].push(callback);
        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback);
        }
    },
    unsubscribe(eventName: TEventNames, callback: MessageReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback as any);
    },
    sendMessage(message: string) {
        ws?.send(message)
    }
};
