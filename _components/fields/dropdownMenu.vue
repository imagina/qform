<template>
    <q-btn 
        class="absolute-top-right q-pa-sm" 
        icon="fas fa-ellipsis-v" 
        unelevated 
        round 
        flat
        padding="sm"
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
                v-for="(actionBlock, itemKey) in fileActionsBlock"
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

<script>
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
data() {
    return {
        crud: this.isField ? 'crudFields' : 'crudBlocks',
        loading: false
    }
},
inject: ['refs'],
emits: ['updateIdOfSelectedField'],
computed: {
    fileActionsBlock() {
        return [
            {
                label: this.$tr('isite.cms.label.edit'),
                icon: 'fas fa-pen',
                color: 'green',
                action: element => {
                    this.refs[this.crud].update(element)
                }
            },
            {
                label: this.$tr('isite.cms.label.delete'),
                icon: 'fas fa-trash',
                color: 'red',
                action: element => {
                    const id = this.isField ? 'blockId' : 'id'
                    this.$emit('updateIdOfSelectedField', element[id])
                    this.refs[this.crud].delete(element)
                }
            }
        ]
    },
},
}
</script>