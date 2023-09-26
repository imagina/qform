import { FormattedData } from "@imagina/qform/models/index";
import { Form } from "@imagina/qform/models/index";

export const formatBlockData = ({ data }: { data: Form }): FormattedData => {
    const { id, title, systemName, blocks } = data;
    const GENERIC_NAME = 'Bloque';

    const blockData = blocks.map(({ id, title, name, description, fields }, index) => {
        const label = title || name || description || `${GENERIC_NAME} ${index + 1}`;
        const children = fields.map(({ label }) => ({ label }));

        return {
            id,
            label,
            subtext: 'Campos',
            noTick: children.length === 0,
            children,
        };
    });

    return {
        id,
        title: title || systemName,
        blockData,
    };
};
