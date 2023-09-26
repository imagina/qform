<template>
    <ul>
        <draggable v-bind="dragOptions">
            <li
                v-for="tick in ticked" 
                :key="`ticked-${tick}`"
                class="q-mt-md tick-name"
            >   
                <section class="field-ticked">
                    <small>Label</small>
                    <span class="text-bold">{{ tick }}</span>
                </section>
                <section class="field-ticked">
                    <small>Type</small>
                    <span class="text-bold">Text</span>
                </section>
                <section class="field-ticked">
                    <small>Name</small>
                    <span class="text-bold">{{ tick }}</span>
                </section>
                <section class="field-ticked">
                    <small>Placeholder</small>
                    <span class="text-bold">Placeholder</span>
                </section>
            </li>
        </draggable>
    </ul>
</template>

<script>
import { toRefs } from 'vue';
import draggable from 'vuedraggable';

export default {
    props: {
        ticked: {
            type: Array,
            default: () => []
        }
    },
    setup(props) {
        const { ticked } = toRefs(props);
        const dragOptions = {
            animation: 200,
            disabled: false,
            ghostClass: "ghost"
        }

        return {
            ticked,
            dragOptions
        };
    },
    components: { draggable }
}
</script>

<style scoped>
.tick-name {
    display: flex;
    gap: 24px;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 8px 14px;
    border-radius: 14px;
    background-color: #cecece;
}

.field-ticked {
    display: flex;
    flex-direction: column;
    width: 10rem;
}
</style>