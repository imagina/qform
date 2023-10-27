import { Block } from "@imagina/qform/contracts/block.contract";
import { Url } from "url";

export interface Form {
    id?: number;
    title?: string;
    systemName: string;
    blocks: Block[];
    active: number;
    createdAt: string;
    embed: string;
    order: any;
    parentId: null | number;
    formType: number;
    options: object;
    updatedAt: string;
    url: string;
    fields: Array<[]>;
}