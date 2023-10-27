import { computed, onMounted, ref, toRefs, watch, ComponentPublicInstance } from 'vue'
import { PropsDropdownList } from '@imagina/qform/contracts'

export default function useDropdownList({ props }) {
    const isUnfolded = ref(true)
    const { index, block, childFields }: PropsDropdownList = computed(() => props).value;
    const dragOptions = ref({
        animation: 200,
        disabled: false,
        ghostClass: "ghost"
    })
    const onUnfolded = () => {
        isUnfolded.value = !isUnfolded.value
    }
    const refItemField = ref<any>(null)

    onMounted(() => {
        checkAssets(null)
    })

    watch(childFields, () => {
        checkAssets(null)
    })

    const nameBlock = computed(() => {
        return block?.title || block?.name || `Bloque #${index}`
    })

    const checkAssets = (idField: number | null) => {    
        const idOfChildFields: Array<number> = []
        if (idField) idOfChildFields.push(idField)

        childFields.map(block => {
            if (block) {
                block.fields.map(
                    field => idOfChildFields.push(field?.parentId)
                )
            }
        })

        refItemField.value?.map((el, index) => {
            const id = Number(refItemField.value[index].attributes.id.value)
            if (idField) {
                if (id === idField) {
                    refItemField.value[index]?.classList.add('disable')
                    refItemField.value[index]?.classList.remove('enable')
                }
                return null
            }

            if (idOfChildFields.includes(id)) {
                refItemField.value[index]?.classList.add('disable')
                refItemField.value[index]?.classList.remove('enable')
                return null
            }

            refItemField.value[index]?.classList.remove('disable')
            refItemField.value[index]?.classList.add('enable')
            
        })
    }

    return {
        isUnfolded,
        dragOptions,
        block,
        refItemField,
        nameBlock,
        onUnfolded,
        checkAssets
    }
}