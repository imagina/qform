const moduleName = 'iform';
const moduleVersion = 'v1';
const urlBase = `/${moduleName}/${moduleVersion}`

export default {
	urlBase : urlBase,
	version: moduleVersion,
  forms : `${urlBase}/forms`,
  fields : `${urlBase}/fields`,
  leads : `${urlBase}/leads`,
  types : `${urlBase}/types`,
  formFields : `${urlBase}/fields/updateOrders`,
  blocks : `${urlBase}/blocks`,
  blocksOrder : `${urlBase}/blocks/bulk/order`,
  formBlocks : `${urlBase}/forms/blocks`,
}
