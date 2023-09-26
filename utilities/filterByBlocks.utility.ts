import { Block, Form } from "@imagina/qform/models";

export const filterByBlock = ({ form }: { form: Form }): Block[] => {
    const response: Block[] = [];
    console.log({form})
    // Recorrer los bloques
    form?.blocks?.map((block, index) => {
        block.sort_order = index + 1;
        response.push(block);
    });

    return response;
};
