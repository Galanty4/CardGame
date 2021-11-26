import { BaseState } from "../generics/generics";

export interface UserState {
    [key: string]: any;
    session: Session;
}


export interface Session {
    room: string;
    name: string;
    messages: ChatMessage[];
}


export interface ChatMessage {
    user: string;
    message: string;
}