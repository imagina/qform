<template>
    <article 
        class="block-content col-12 col-md-6 col-lg-4"
    >
        <div class="box">
            <!--Block info-->
            <section 
                class="block-info relative-position row justify-between items-center q-mb-md"
            >
            <!--Block Title-->
            <div class="box-title col-12 q-py-sm q-pr-xl">
                <div class="block-info-title ellipsis cursor-pointer">
                <q-icon name="fas fa-arrows-alt" />
                {{ $tr('isite.cms.label.block') }} #{{ block.sortOrder }} | {{ block.title }}
                <q-tooltip>{{ block.title }}</q-tooltip>
                </div>
            </div>
            <!--Button action-->
            <dropdownMenu :block="block" :refs="refs"/>
            <!--Block description-->
            <div class="block-info-description q-mt-xs col-12 ellipsis-3-lines">
                {{ block.description }}
                <q-tooltip>{{ block.description }}</q-tooltip>
            </div>
            </section>

            <!--Block Fields-->
            <section class="block-fields">
                <!--Fields Information-->
                <div class="row justify-between items-center">
                    <!--Title-->
                    <div class="box-title">
                    {{ $trp('isite.cms.label.field') }}
                    </div>
                    <!--Btn to create field-->
                    <q-btn 
                        @click="onCreateField" 
                        icon="fas fa-plus"
                        color="green" 
                        padding="sm" 
                        size="10px" 
                        round 
                        unelevated
                    >
                        <q-tooltip>{{ $tr('iforms.cms.newField') }}</q-tooltip>
                    </q-btn>
                </div>

                <div id="contentFields" class="q-mt-md">
                    <q-scroll-area 
                        :thumb-style="thumbStyle" 
                        :content-active-style="contentActiveStyle"
                        style="height: 200px"
                    >
                        <!--Fields content (draggable)-->
                        <draggable 
                            @update="onFieldOrdenUpdate" 
                            @change="onFieldOrdenUpdate"
                            :list="formData.fields"
                            group="bocksfields"
                            v-bind="dragOptions" 
                            v-model="block.fields" 
                            class="list-group block"
                            style="min-height: 199px; width: 100%"
                        >
                            <div 
                                v-for="field in block.fields" 
                                :key="field.id"
                                class="items-center cursor-pointer"
                            >
                                <!--Field-->
                                <div 
                                    class="row justify-between items-center relative-position q-py-xs">
                                    <!--Field title-->
                                    <div class="ellipsis text-grey-9 q-mr-xl">
                                        <q-icon 
                                            class="cursor-pointer" 
                                            name="fas fa-arrows-alt"
                                        />
                                        {{ field.label }}
                                    </div>
                                    <!--Field Actions-->
                                    <dropdownMenu :block="block" :refs="refs" :is-field="true"/>
                                    <!--Separator-->
                                    <div class="col-12 q-my-xs">
                                        <q-separator class="col-12 q-my-xs"/>
                                    </div>
                                </div>
                            </div>
                        </draggable>
                    </q-scroll-area>
                </div>
            </section>
        </div>
    </article>
</template>

<script>
import dropdownMenu from './dropdownMenu.vue'
import draggable from 'vuedraggable'
export default {
    props: {
        block: {
            type: Object,
            default: {}
        },
        blockCreateField: {
            type: Number,
            default: false,
        },
        refs: {
            type: Object,
            default: {}
        },
        formData: {
            type: Object,
            default: {}
        }
    },
    components: {
        dropdownMenu,
        draggable,
    },
    emits: ['handleOrdenField', 'handleCreateField'],
    data() {
        return {
            dragOptions: {
                animation: 200,
                disabled: false,
                ghostClass: "ghost"
            },
            //Style of Scroll area
            thumbStyle: {
                right: '-11px',
                borderRadius: '5px',
                backgroundColor: '#555',
                width: '5px',
                opacity: 0.75,
            },
            contentActiveStyle: {
                color: 'black'
            }
        }
    },
    methods: {
        onFieldOrdenUpdate() {
            this.$emit('handleOrdenField')
        },
        onCreateField() {
            this.$emit('handleCreateField', this.block)
        }
    }
}
</script>