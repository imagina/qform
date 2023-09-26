import { filterByBlock } from "@imagina/qform/utilities/filterByBlocks.utility";
import { Form, Field } from "@imagina/qform/models";

export const filterByField = ({ form }: { form: Form }): Field[] => {
    const response: Field[] = [];

    const blocks = filterByBlock({ form });

    blocks.map(block => {
        block.fields.map(field => {
            field.order = response.length + 1;

            response.push(field);
        });
    });

    // Respuesta
    return response;
};
