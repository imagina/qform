import { Block } from "@imagina/qform/models/index";
import { Url } from "url";

export interface Form {
    id: string;
    title?: string;
    systemName: string;
    blocks: Block[];
    active: number;
    createdAt: string;
    embed: string;
    formType: number;
    options: object;
    updatedAt: string;
    url: Url;
}