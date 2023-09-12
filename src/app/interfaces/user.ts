import { Timestamp } from "@angular/fire/firestore";
import { BaseDoc } from "./firebase";

export interface User extends BaseDoc {
    name: string;
    email: string;
    phone: string;
    createdIn?: Timestamp;
}