import { Block } from "@imagina/qform/models/block.model";
import { Url } from "url";

export interface Form {
    id: number;
    title?: string;
    systemName: string;
    blocks: Block[];
    active: number;
    createdAt: string;
    embed: string;
    order: number;
    formType: number;
    options: object;
    updatedAt: string;
    url: Url;
    fields: Array<[]>;
}