<template>
    <!-- The enable class is not used to style. In this
    case it is used because it is the way in which
    you activate or deactivate the draggable.
    See draggable prop of draggable -->
    <div
        class="box block-container"
        :class="{
            'animation-loading': activateLoadingAnimation
        }"
    >
        <!--Block info-->
        <div class="tw-w-full tw-mb-8">
            <!--Block Title-->
            <div class="tw-flex tw-items-center tw-justify-between">
                <div class="box-title col-12 q-py-sm q-pr-xl">
                    <div class="block-info-title ellipsis cursor-pointer">
                        <q-icon name="fa-solid fa-grip-dots-vertical"></q-icon>
                        {{ $tr('isite.cms.label.block') }} #{{ block.sortOrder }} | {{ block.title }}
                        <q-tooltip>{{ block.title }}</q-tooltip>
                    </div>
                </div>
                <!--Button action-->
                <dropdownMenu :block="block"/>
            </div>
            <!--Block description-->
            <div
                v-if="block.description"
                class="block-info-description text-grey-8 q-mt-xs col-12 ellipsis-3-lines"
            >
                {{ block.description }}
                <q-tooltip>{{ block.description }}</q-tooltip>
            </div>
        </div>
        <!--Block Fields-->
        <div class="block-fields">
        <!--Fields Information-->
            <div class="row justify-between items-center tw-mt-4 tw-mb-3">
                <!--Title-->
                <div class="box-title">
                    {{ $trp('isite.cms.label.field') }}
                </div>
                <!--Btn to create field-->
                <q-btn
                    @click="createField(block.id)"
                    icon="fa-light fa-plus"
                    color="primary"
                    padding="sm"
                    v-if="!isSon"
                    size="10px"
                    rounded unelevated outline
                >
                    <q-tooltip>
                        {{ $tr('iforms.cms.newField') }}
                    </q-tooltip>
                </q-btn>
            </div>
            <div>
                <q-scroll-area
                    :thumb-style="thumbStyle"
                    :content-active-style="contentActiveStyle"
                    class="scroll-area"
                >
                    <!--Fields content (draggable)-->
                    <slot />
                </q-scroll-area>
            </div>
        </div>
    </div>
</template>

<script>
import dropdownMenu from 'modules/qform/_components/fields/dropdownMenu.vue'
import useBlock from 'modules/qform/uses/useBlock'

export default {
    props: {
        block: {
            type: Object,
            default: () => []
        },
        isSon: Boolean,
        softLoading: {
            type: Boolean,
            default: false,
        },
        updatedBlockId: {
            type: [Number, null],
            required: false,
            default: null
        }
    },
    emits: ['createField'],
    components: {
        dropdownMenu
    },
    setup(props, { emit }) {
        return { ...useBlock({ props, emit }) }
    }
}
</script>

<style scope>

.block-container {
    height: 370px;
    box-sizing: border-box;
}

:root {
    --border-size: 2px;
    --border-angle: 0turn;
}

@keyframes rotate {
	100% {
		transform: rotate(1turn);
	}
}

.animation-loading {
	position: relative;
	z-index: 0;
	border-radius: 10px;
	overflow: hidden;
}

.animation-loading::after {
    content: '';
    position: absolute;
    z-index: -1;
    bottom: 2px;
    right: 2px;
    left: 2px;
    width: calc(100% - 4px);
    height: calc(100% - 4px);
    background: #fff;
    border-radius: 8px;
}

.animation-loading::before {
    content: '';
    position: absolute;
    z-index: -2;
    left: -50%;
    top: -50%;
    width: 200%;
    height: 200%;
    background-repeat: no-repeat;
    background-position: 0 0;
    background-image: conic-gradient(transparent, var(--q-primary), transparent 30%);
    animation: rotate 4s linear infinite;
}

@keyframes opacityChange {
	50% {
		opacity:.5;
	}
	100% {
		opacity: 1;
	}
}

.block-info-description {
    line-height: 1.2;
    font-size: 14px;
    text-align: justify;
    max-height: 40px;
    min-height: 40px;
}

.scroll-area {
    height: 230px;
    box-sizing: border-box;
}
</style>
