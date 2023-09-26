<template>
    <div class="inherit-fields-container">
        <page-actions />
        <article>
            <inner-loading :visible="loading"/>
            <h2 
                class="text-h6 text-bold q-mb-md text-center text-primary"
            >Selecciona los campos a importar
            </h2>
            <ul class="dropdown-list">
                <dynamic-field 
                    v-model="filter" 
                    :field="searchField"
                    class="q-my-lg q-mx-xl"
                />
                <p 
                    v-if="!form"
                    class="text-blue-grey-4 text-bold text-subtitle1 text-center"
                >No se encontraron campos para este formulario
                </p>
                <FormBlockTree 
                    :form="form" 
                    :filter="filter"
                    @updateTickedStatus="updateTickedStatus"
                />
            </ul>
        </article>
        <article class="marking-window-container">
            <h6 class="text-h6 text-bold q-mb-md text-center text-primary">
                Nuevo formulario
            </h6>
            <section class="marking-window box">
                <p class="text-blue-grey-5">
                    Campos del formulario
                </p>
                <p 
                    class="q-mt-lg text-blue-grey-4 text-bold text-subtitle1 text-center"
                    v-if="ticked.length < 1"
                >Selecciona un campo para empezar
                </p>
                <SelectedField :ticked="ticked" />
            </section>
        </article>
    </div>
</template>

<script lang="ts">
import Vue, { onMounted, ref, Ref } from 'vue';
import { formatBlockData } from '@imagina/qform/utilities/index'
import FormBlockTree from '@imagina/qform/_components/inheritFields/FormBlockTree'
import SelectedField from '@imagina/qform/_components/inheritFields/SelectedField'
import { getBlocks } from '@imagina/qform/services/form.service'
import { SearchField } from '@imagina/qform/models/index'

export default {
    components: { 
        FormBlockTree,
        SelectedField
    },
    setup(props: any, { attrs }: any) {
        const loading: Ref<boolean> = ref(true);
        const form: Ref<any> = ref(null);
        const filter: Ref<string> = ref('');
        const ticked: Ref<any[]> = ref([]);
        const searchField: Ref<SearchField> = ref({
            value: null,
            type: 'search'
        });

        const updateTickedStatus = (value: any) => {
            ticked.value = value;
        }

        onMounted(async () => {
            loading.value = true;
            const id = attrs.formId;
            getBlocks({ id })
                .then(value => {
                    form.value = formatBlockData(value);
                }).catch(err => {
                    Vue.prototype
                        .$apiResponse
                        .handleError(err, () => {});
                }).finally(() => {
                    loading.value = false;
                })
        });

        return {
            loading,
            updateTickedStatus,
            ticked,
            form,
            filter,
            searchField
        }
    }
}

</script>

<style scoped>
.inherit-fields-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 82vh;
}

.dropdown-list {
    overflow-y: auto;
}

.marking-window-container {
    display: grid;
    grid-template-rows: auto 1fr;
}

</style>