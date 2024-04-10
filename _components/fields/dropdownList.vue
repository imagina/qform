<template>
    <div 
        :key="block.id"
        class="tw-mb-2"
    >
        <q-expansion-item
            :label="nameBlock"
            header-class="tw-bg-gray-100 tw-rounded-xl"
            expand-icon-class="text-size-custom"
        >
            <div
                v-if="block.fields.length === 0"
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
                item-key="id"
            >
              <template #item="{ element }">
                <div
                  :key="element.id"
                  :id="element.id"
                  class="list-item blue-grey"
                  :class="{
                        'enable' : !checkAssets(element.id),
                        'disable': checkAssets(element.id)
                    }"
                >
                    <q-icon
                        name="fa-light fa-grip-dots-vertical"
                        class="icon-item tw-mr-sm"
                    />
                    <span class="title-field">
                        {{ element.label || '--'}}
                    </span>
                </div>
              </template>
            </draggable>
        </q-expansion-item>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
import useDropdownList from 'modules/qform/uses/useDropdownList'

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
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    margin-top: 8px;
    margin-left: 16px;
}

.list-item {
    display: flex;
    align-items: center;
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

.text-size-custom {
  font-size: 14px !important;
}

</style>
