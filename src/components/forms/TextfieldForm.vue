<script setup>
import LabelForm from "./LabelForm.vue";
defineProps({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
  },
  modelValue: String,
  required: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const updateValue = (event) => {
  emit("update:modelValue", event.target.value);
};
</script>
<template>
  <LabelForm :for="id">{{ label }}</LabelForm>
  <input
    :id="id"
    :type="type"
    :placeholder="label"
    :value="modelValue"
    @input="updateValue"
    :required="required ? true : null"
    class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
  />
</template>
