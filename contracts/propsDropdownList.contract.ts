import { Block } from "modules/qform/contracts/block.contract";

export interface PropsDropdownList {
    index: number;
    block: Block;
    childFields: Array<Block>;
    copiedFieldId: number;
}