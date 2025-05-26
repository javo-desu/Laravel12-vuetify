<script setup lang="tsx">
/** @jsxImportSource vue */
import { motion } from 'motion-v'
import { ref, watch, onUnmounted, Ref } from 'vue'

const aspectRatio = ref(1)
const width = ref(100)
const debouncedAspectRatio = useDebouncedState(aspectRatio)
const debouncedWidth = useDebouncedState(width)

function useDebouncedState<T>(value: Ref<T>, duration: number = 0.2) {
    const debouncedValue = ref(value.value)
    
    let timeout: ReturnType<typeof setTimeout>
    watch(value, (newValue) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            debouncedValue.value = newValue
        }, duration * 1000)
    })

    onUnmounted(() => clearTimeout(timeout))

    return debouncedValue
}
</script>

<template>
    <div id="example">
        <div class="container">
            <motion.div
                layout
                class="box"
                :style="{
                    aspectRatio: debouncedAspectRatio,
                    width: debouncedWidth + 'px',
                    borderRadius: '20px'
                }"
            />
        </div>
        <div class="inputContainer">
            <div>
                <label>
                    <code>Aspect ratio</code>
                    <input
                        :value="aspectRatio"
                        type="range"
                        :min="0.1"
                        :max="5"
                        :step="0.1"
                        @input="e => aspectRatio = parseFloat((e.target as HTMLInputElement).value)"
                    />
                    <input
                        type="number"
                        :value="aspectRatio"
                        :min="0.1"
                        :max="5"
                        @input="e => aspectRatio = parseFloat((e.target as HTMLInputElement).value) || 0"
                    />
                </label>
                <label>
                    <code>Width</code>
                    <input
                        :value="width"
                        type="range"
                        :min="10"
                        :max="1000"
                        :step="5"
                        @input="e => width = parseFloat((e.target as HTMLInputElement).value)"
                    />
                    <input
                        type="number"
                        :value="width"
                        :min="10"
                        :max="1000"
                        @input="e => width = parseFloat((e.target as HTMLInputElement).value) || 0"
                    />
                </label>
            </div>
        </div>
    </div>
</template>

<style>
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 300px;
    gap: 20px;
}

.box {
    background-color: #4ff0b7;
    position: relative;
    z-index: 1;
}

.inputContainer {
    display: flex;
    flex-direction: row;
    gap: 20px;
    background-color: #0b1011;
    padding: 20px 40px;
    border-radius: 10px;
    position: relative;
    z-index: 2;
}

#example {
    display: flex;
    align-items: center;
    flex-direction: column;
}

#example input {
    accent-color: #4ff0b7;
    font-family: JetBrains Mono, monospace;
    font-size: 12px;
}

#example .inputs {
    display: flex;
    flex-direction: column;
    padding-left: 50px;
}

#example label {
    display: flex;
    align-items: center;
    margin: 10px 0;
    font-size: 12px;
}

#example label code {
    width: 100px;
}

#example input[type="number"] {
    border: 0;
    border-bottom: 1px dotted #4ff0b7;
    color: #4ff0b7;
    margin-left: 10px;
    background: transparent;
}

#example input[type="number"]:focus {
    outline: none;
    border-bottom: 2px solid #4ff0b7;
}

#example input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
}

input[type='range']::-webkit-slider-runnable-track {
    height: 10px;
    -webkit-appearance: none;
    background: #0b1011;
    border: 1px solid #1d2628;
    border-radius: 10px;
    margin-top: -1px;
}

input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #4ff0b7;
    top: -4px;
    position: relative;
}
</style>
