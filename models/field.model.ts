export interface Field {
    blockId: number;
    dynamicField: {
        type: string, 
        name: string, 
        required: boolean, 
        value: string, 
        colClass: string
    };
    formId: number;
    id: number;
    label: string;
    name: string;
    options: object;
    order: number;
    prefix: object;
    required: number;
    rules: object;
    suffix: object;
    type: number;
    typeObject: {
        id: number, 
        name: string, 
        value: string
    };
    width: number;
}
