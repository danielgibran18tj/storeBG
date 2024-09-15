

export class LogginRQ {
    username : string = "";
    password : string = "";
}

export interface LogginRS {
    token: string;
    role: string;
}