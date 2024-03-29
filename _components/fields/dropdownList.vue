<template>
    <div
        :key="block.id"
    >
        <button 
            class="list-header"
            @click="onUnfolded"
        >
            {{ nameBlock }}
        </button>
        <div
            v-if="block.fields.length === 0"
            v-show="isUnfolded"
            class="warn-empty-field text-blue-grey-5"
        >
            <q-icon 
                name="fa-thin fa-cube"
                class="text-h3 text-weight-light"
            />
            <span>{{ $tr('iforms.cms.label.emptyBlock') }}</span>
        </div>
        <draggable 
            :list="block.fields"
            :group="{ name: 'bocksfields', pull: 'clone', put: false }"
            v-bind="dragOptions"
            v-show="isUnfolded"
            :sort="false"
            class="draggable-list"
            draggable=".enable"
        >
            <div
                v-for="field in block.fields" 
                :key="field.id"
                :id="field.id"
                class="list-item blue-grey"
                :class="{
                    'enable' : !checkAssets(field.id),
                    'disable': checkAssets(field.id)
                }"
            >
                <q-icon 
                    name="fa-sharp fa-light fa-grip-dots-vertical" 
                    class="icon-item q-mr-sm"
                />
                <span class="title-field">
                    {{ field.label || '--'}}
                </span>
            </div>
        </draggable>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
import useDropdownList from '@imagina/qform/uses/useDropdownList'

export default {
    props: {
        block: {
            type: Object,
            default: () => {}
        },
        childFields: {
            type: Array,
            default: () => []
        },
        index: {
            type: Number,
            default: 0
        },
        copiedFieldId: {
            type: Number,
            default: null
        }
    },
    components: {
        draggable
    },
    setup(props) {
        return { ...useDropdownList({ props }) }
    }
}

</script>

<style scoped>

.warn-empty-field {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 24px;
    gap: 14px;
    font-size: 16px;
    font-weight: 500;
}
.list-header {
    width: 100%;
    background-color: #eeeeee;
    border-radius: 10px;
    padding: 8px;
    box-sizing: border-box;
}

.enable {
    color: #3b3b3b
}

.enable:hover {
    background-color: #f5f5f5;
}

.disable {
    color: #c0c0c0;
}

.disable:hover {
    cursor: no-drop;
    background-color: #fff;
}

.draggable-list {
    overflow: hidden;
    margin-top: 8px;
    margin-left: 14px;
    border-left: solid var(--q-color-primary) 2px;
}

.list-item {
    display: flex;
    align-items: center;
    margin: 7px 14px;
    border: solid #d8d8d8 1px;
    padding: 12px 8px;
    border-radius: 10px;
    cursor: pointer;
}

.title-field {
  width: 250px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}


.list-item:active {
    cursor: grabbing;
}

</style>