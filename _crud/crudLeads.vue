<template>
  <master-modal
    v-model="modal.show"
    @hide="resetModal()"
    :title="modal.lead ? modal.lead.form.title : ''"
  >
    <div class="box">
      <q-list separator dense>
        <q-item
          v-for="(item, itemKey) in showLeadItems"
          :key="itemKey"
          style="padding: 8px 0"
        >
          <q-item-section>
            <q-item-label
              v-if="item.fieldType != 'media'"
            >
              {{ item.label }}
            </q-item-label>
            <!--File preview-->
            <q-item-label v-if="item.fieldType == 'media'">
              <file-list
                v-model="item.value"
                grid-col-class="col-12"
                hide-header
              />
            </q-item-label>
            <!--value-->
            <q-item-label v-else caption>
              {{ item.value }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </master-modal>
</template>

<script>
import fileList from 'modules/qsite/_components/master/fileList'
import useCrudLeads from 'modules/qform/uses/useCrudLeads'

export default {
  components: {
    fileList
  },
  setup() {
    return { ...useCrudLeads() }
  }
}
</script>

<style lang="scss">
</style>
