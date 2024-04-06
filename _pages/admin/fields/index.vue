<template>
  <div
    id="formfieldsPage"
    class="layout-padding"
  >
    <!--Blocks Crud-->
    <crud
      :crud-data="import('modules/qform/_crud/blocks')"
      :custom-data="customCrudBlocks" type="no-index"
      ref="crudBlocks"
      @updated="getData(false)"
      @deleted="getData(false)"
      @created="getData(false)"
    />
    <!--Fields Crud-->
    <crud
      :crud-data="import('modules/qform/_crud/fields')"
      :custom-data="customCrudFields"
      type="no-index"
      ref="crudFields"
      @updated="getData(false)"
      @deleted="getData(false)"
      @created="getData(false)"
    />

    <crud
      :crud-data="import('modules/qform/_crud/crudForms.vue')"
      :custom-data="customCrudForm"
      type="no-index"
      @deleted="redirect"
      ref="crudForm"
    />

    <!--page Content-->
    <div
      id="formfieldsPageContent"
      class="row q-col-gutter-md relative-position"
    >
      <!--Form info-->
      <q-skeleton v-if="loadingSkeleton" width="100vw" height="70px" />
      <div
        class="col-12"
        v-if="formData && !loadingSkeleton"
      >
        <!--Page Actions-->
        <div class="box box-auto-height">
          <page-actions
            :title="`${$tr('isite.cms.label.form')}: ${formData.title}`"
            @refresh="getData"
            :extraActions="editAction"
            icon="fa-light fa-clipboard-list"
            :description="showDescription"
            :help="showTooltip"
          />
        </div>
      </div>
      <!--Blocks content (draggable)-->
      <div :class="{ 'content-dropdown col-12': isSon, 'col-12': !isSon }">
        <article 
          class="
            tw-mr-3.5
            block-list-container 
            box
          " 
            v-if="isSon"
        >
          <q-skeleton v-if="loadingSkeleton" height="55vh" />
          <router-link
            class="parent-list-header"
            v-if="!loadingSkeleton"
            target="_blank"
            :to="`/form/fields/${parentForm.id}`"
          >
            <h2 class="blue-grey-9 tw-text-xl tw-mr-2 tw-font-medium">
              {{ parentForm.title }}
            </h2>
            <q-icon 
              class="tw-text-gray-600"
              name="fa-regular fa-arrow-up-right-from-square" 
              size="12px" 
            />
            <q-tooltip>
              {{ $tr('iforms.cms.label.openParentForm') }}
            </q-tooltip>
          </router-link>
          <template
            v-for="(block, key) in parentForm.blocks"
            :key="key"
          >
            <dropdownList
              v-if="!loadingSkeleton"
              :block="block"
              :index="key + 1"
              :childFields="formData.blocks"
              :copiedFieldId="copiedFieldId"
            />
          </template>
        </article>
        <div class="list-blocks-skeleton" v-if="loadingSkeleton">
          <q-skeleton
            v-for="skeleton in new Array(6)"
            :key="skeleton"
            width="100%"
            height="350px"
          />
        </div>
        <draggable
          @change="updateOrderBlock"
          group="bocksBlocks"
          v-bind="dragOptions"
          v-model="formData.blocks"
          class="list-blocks"
          :style="{ '--max-size': isAutoWidth ? '400px' : '1fr'}"
          draggable=".enable"
          item-key="id"
        >
          <template #item="{ element }">
            <block
              v-if="!loadingSkeleton"
              :key="element.id"
              :block="element"
              :isSon="isSon"
              @createField="createField"
              :softLoading="softLoading"
              :updatedBlockId="updatedBlockId"
            >
              <draggable
                @update="handleUpdatingFields(null)"
                @change="props => handleChangeInFields(props, element.id)"
                :list="element.fields"
                group="bocksfields"
                v-bind="dragOptions"
                class="
                  tw-w-full
                  tw-draggable-fields
                  tw-q-pb-md
                  tw-overflow-auto
                  tw-h-56
                "
                :class="{
                  'drag-drog-field': element.fields.length === 0
                }"
                :data-descr="$tr('iforms.cms.label.dragFieldsHere')"
                item-key="id"
              >
                <template #item="{ element }">
                  <section
                    v-if="element"
                    :key="element.id"
                    class="
                      tw-cursor-pointer 
                      tw-border 
                      tw-border-solid 
                      tw-border-gray-300
                      tw-rounded-xl
                      tw-p-2
                      tw-flex
                      tw-mb-2
                      tw-justify-between 
                      tw-items-center 
                      tw-transform 
                      hover:tw-bg-gray-100
                      active:tw-cursor-grabbing
                    "
                  >
                    <div>
                      <q-icon
                        name="fa-light fa-grip-dots-vertical"
                        class="tw-mr-2"
                      />
                      <span class="title-field">
                        {{ element.label || '--' }}
                      </span>
                    </div>
                    <dropdownMenu
                      class=""
                      :block="element"
                      :is-field="true"
                      @updateIdOfSelectedField="updateIdOfSelectedField"
                    />
                  </section>
                </template>
              </draggable>
            </block>
          </template>
          <template #footer>
            <button
              class="btn-add-block"
              @click="handleCreateBlock"
              :disable="loading"
              v-show="!loadingSkeleton"
            >
              <span class="text-h3">
                <i class="fa fa-plus text-blue-grey-6" aria-hidden="true" />
              </span>
              <span class="text-subtitle1 text-blue-grey-6" >
                {{ $tr('iforms.cms.label.addNewBlock') }}
              </span>
            </button>
          </template>
        </draggable>
      </div>
      <!--Inner Loading-->
      <inner-loading :visible="loading"/>
    </div>
  </div>
</template>

<script>
//import Component
import renderForm from 'modules/qform/_components/frontend/forms/renderForm'
import formForm from 'modules/qform/_components/admin/forms/form'
import draggable from 'vuedraggable'
import block from 'modules/qform/_components/fields/block'
import dropdownList from 'modules/qform/_components/fields/dropdownList'
import dropdownMenu from 'modules/qform/_components/fields/dropdownMenu.vue'
import useFields from 'modules/qform/uses/useFields.ts'

export default {
  components: {
    draggable,
    renderForm,
    formForm,
    dropdownList,
    dropdownMenu,
    block,
  },
  props: {
    formId: {
      type: Number,
      defualt: null,
    },
  },
  setup(props, { attrs }) {
    return { ...useFields(attrs, props) }
  }
}
</script>

<style scope>

.box block-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 200px;
  max-width: 500px;
  gap: 6.4px;
  margin: 0 auto;
}

.parent-list-header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 14px 0;
  margin-bottom: 8px;
}

.parent-list-header:hover {
  background-color: #f1f1f1;
  border-radius: 10px;
}

.parent-list-header > h2 {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.draggable-fields {
  min-height: 199px;
}

.drag-drog-field {
  color: #cccccc;
  text-align: center;
  border-radius: 10px;
  border: dashed 2px #cccccc;
  padding: 24px;
}

.title-field {
  width: 250px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.drag-drog-field[data-descr]::after {
  content: attr(data-descr);
}

.content-dropdown {
  display: grid;
  grid-template-columns: minmax(30%, 100px) 1fr;
}

.list-blocks {
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(300px, var(--max-size))
  );
  grid-template-rows: min-content;
  gap: 14px;
}

.list-blocks-skeleton {
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(300px, 1fr)
  );
  grid-template-rows: min-content;
  gap: 15px;
}

.btn-add-block {
  display: flex;
  place-content: center;
  place-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 370px;
  height: 370px;
  border: dashed 2px #cccccc;
  border-radius: 10px;
  margin: 0 auto;
}

</style>
