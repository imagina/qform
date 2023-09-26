<template>
    <li v-if="form">
        <div
            class="q-pb-lg q-pl-md row q-col-gutter-sm"
        >
            <q-tree class="col-12 col-sm-6"
                :nodes="form.blockData"
                :filter="filter"
                node-key="label"
                :tick-strategy="tickStrategy"
                :ticked.sync="ticked"
                no-connectors
                accordion
                default-expand-all
            >
                <template #default-header="{ node, uid }">
                    <div>
                        <span v-if="node.id">Bloque: </span>
                        <span class="text-bold" :key="uid">
                            {{ node.label }}
                        </span>
                    </div>
                </template>

                <template #default-body="{ node }">
                    <span v-if="node.subtext">
                        {{ node.subtext }}
                    </span>
                </template>
            </q-tree>
        </div>
    </li>
</template>

<script>
import { toRefs, ref, watch } from 'vue';
import draggable from 'vuedraggable';

export default {
    props: {
        form: {
            type: Object,
            default: () => { }
        },
        filter: String
    },
    setup(props, { emit }) {
        const { form, filter } = toRefs(props);
        const tickStrategy = ref('leaf-filtered');
        const ticked = ref([]);

        watch(ticked, (value) => {
            emit('updateTickedStatus', value);
        });

        return {
            form,
            filter,
            ticked,
            tickStrategy,
        };
    },
    components: { draggable }
}
</script>