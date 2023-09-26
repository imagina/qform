import Vue from 'vue';
import { Form, RequestParams } from '@imagina/qform/models/';

export const getBlocks = async ({ id, refresh }: { id: string, refresh: boolean }): Promise<Form> => {
    const PARAMS_INCLUDE = 'blocks.fields';
    const ROUTE_REFERENCE = 'apiRoutes.qform.forms';

    const requestParams: RequestParams = {
        refresh: true,
        params: {
            include: PARAMS_INCLUDE,
        },
    };

    return Vue.prototype.$crud
        .show(ROUTE_REFERENCE, id, requestParams)
        .then((value: Form) => value);
};

export const updateOrderBlock = async({ dataBlocks }: { dataBlocks: Array<any> }): Promise<Form> => {
    const ROUTE_REFERENCE = 'apiRoutes.qform.formBlocks';

    return Vue.prototype.$crud.put(ROUTE_REFERENCE, dataBlocks)
        .then(response => response)
}

export const updateOrderField = async({ dataFields }: { dataFields: Array<any> }): Promise<Form> => {
    const ROUTE_REFERENCE = 'apiRoutes.qform.formFields';

    return Vue.prototype.$crud.put(ROUTE_REFERENCE, dataFields)
        .then(response => response)
}