<template>
    <q-btn
        icon="fas fa-ellipsis-v"
        round
        flat
        size="10px"
        color="blue-grey"
    >
        <!---Menu actions-->
        <q-menu
            anchor="bottom left"
            self="bottom end"
        >
            <q-list style="min-width: 100px">
            <q-item
                clickable
                v-close-popup
                v-for="(actionBlock, itemKey) in actions"
                :key="itemKey"
                @click.native="actionBlock.action(block)"
            >
                <q-item-section>
                    <div class="row items-center">
                        <q-icon
                            :name="actionBlock.icon"
                            class="q-mr-sm"
                            color="blue-grey"
                            size="18px"
                        />
                        {{ actionBlock.label }}
                    </div>
                </q-item-section>
            </q-item>
            </q-list>
        </q-menu>
    </q-btn>
</template>

<script lang="ts">
import { fileActions } from 'modules/qform/models'
import { computed, ref, toRefs } from 'vue'

export default {
props: {
    isField: {
        type: Boolean,
        default: false
    },
    block: {
        type: Object,
        default: () => {}
    },
},
emits: ['updateIdOfSelectedField'],
setup(props, { emit }) {
    const { isField, block } = toRefs(props)
    const loading = ref(false)

    const typeCrud = computed(() => {
        return isField.value ? 'crudFields' : 'crudBlocks'
    })

    const actions = computed(() => {
        return fileActions(emit, isField, typeCrud).value
    })

    return {
        loading,
        block,
        actions
    }
}
}
</script>
