import Vue from 'vue';
import { Form, RequestParams } from '@imagina/qform/models/';

const crud = Vue.prototype.$crud
const API_FORMS = 'apiRoutes.qform.forms'
const API_BLOCKS = 'apiRoutes.qform.blocks'
const API_FIELDS = 'apiRoutes.qform.fields'
const PARAMS_INCLUDE = 'blocks.fields';

export const getForm = async (id, refresh=false): Promise<any> => {
    const requestParams: RequestParams = {
        refresh: refresh,
        params: {
            include: PARAMS_INCLUDE,
        },
    };

    return crud
        .show(API_FORMS, id, requestParams)
        .then(response => response)
}

export const createForm = async (data): Promise<any> => {
    
    return crud
        .create(API_FORMS, data)
        .then(response => response)
}

export const createBlock = async (formId, sortOrder): Promise<any> => {
    return crud
        .create(API_BLOCKS, { formId, sortOrder })
        .then(response => response)
        .catch(()  => {
            Vue.prototype.$alert.error({
                message:  Vue.prototype.$tr('isite.cms.message.errorRequest'), 
                pos: 'bottom'
            })
        })
}

export const createField = async (data): Promise<any> => {

    return crud
        .create(API_FIELDS, data)
        .then(response => response)
}

export const getBlocks = async ({ id, refresh=false }: { id: number, refresh?: boolean }): Promise<Form> => {
    const PARAMS_INCLUDE = 'blocks.fields';

    const requestParams: RequestParams = {
        refresh: refresh,
        params: {
            include: PARAMS_INCLUDE,
        },
    };

    return crud
        .show(API_FORMS, id, requestParams)
        .then(value => value);
};

export const updateOrderBlock = async({ dataBlocks }: { dataBlocks: object }): Promise<any> => {
    const ROUTE_REFERENCE = 'apiRoutes.qform.formBlocks';

    return crud.put(ROUTE_REFERENCE, dataBlocks)
        .then(response => response)
}

export const updateOrderField = async({ dataFields }: { dataFields: object }): Promise<any> => {
    return crud.put(API_FIELDS, dataFields)
        .then(response => response)
}