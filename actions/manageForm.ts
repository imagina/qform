import crud from '@imagina/qcrud/_services/baseService.js'
import { FormRequestResponse, UpdateResponse, RequestParams, Field, Block } from '@imagina/qform/contracts/';

const API_FORMS = 'apiRoutes.qform.forms'
const API_BLOCKS = 'apiRoutes.qform.blocks'
const API_FIELDS = 'apiRoutes.qform.formFields'
const PARAMS_INCLUDE = 'blocks.fields';

export const getForm = async (id, refresh = false): Promise<FormRequestResponse> => {
    const requestParams: RequestParams = {
        refresh: refresh,
        params: {
            include: PARAMS_INCLUDE,
        },
    };

    return crud.show(API_FORMS, id, requestParams);

}

export const createBlock = async (formId, sortOrder): Promise<Block> => {
    return crud
        .create(API_BLOCKS, { formId, sortOrder })
}

export const createField = async (data): Promise<Field> => {
    return crud.create(API_FIELDS, data)
}

export const updateBlock = async ({ data }: { data: object }): Promise<UpdateResponse> => {
    const ROUTE_REFERENCE = 'apiRoutes.qform.formBlocks'

    return crud.put(ROUTE_REFERENCE, data)
}

export const updateField = async ({ data }: { data: object }): Promise<UpdateResponse> => {
    return crud
        .put(API_FIELDS, data)
}