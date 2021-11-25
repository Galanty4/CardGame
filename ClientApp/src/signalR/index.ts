import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

export const connection = new HubConnectionBuilder()
.withUrl("/table")
.configureLogging(LogLevel.Information)
.build();

connection.start();
