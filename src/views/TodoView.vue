<template>
  <div class="container mx-auto">
    <h1 class="mt-8 text-2xl">Todos</h1>

    <div class="mt-3">
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-6 space-y-4 px-1" style="height: 500px">
          <div
            v-for="todo in state.todos"
            :key="todo.index"
            class="p-8 bg-white shadow-md rounded flex items-center justify-between"
            :class="{ 'bg-green-200': todo.done }"
          >
            <div>
              <div>{{ todo.text }}</div>
              <div class="text-gray-500 text-sm">{{ todo.created_at }}</div>
            </div>
            <div class="space-x-2">
              <button
                v-if="!todo.done"
                class="px-2 text-red-600"
                title="Remove Todo"
                @click="removeTodo(todo.id)"
              >
                &times;
              </button>
              <button
                v-if="!todo.done"
                class="px-2 text-green-600"
                title="Mark as Done"
                @click="markAsDone(todo.id)"
              >
                &check;
              </button>
              <button
                v-else
                class="px-2 text-orange-600"
                title="Mark as Undone"
                @click="markAsUndone(todo.id)"
              >
                &#8630;
              </button>
            </div>
          </div>
          <div v-if="state.todos.length === 0">
            You don't have any tasks to do.
          </div>
        </div>
        <div class="col-span-6">
          <div class="p-8 bg-white shadow-md rounded">
            <h2 class="text-xl">Add a todo</h2>
            <input
              type="text"
              v-model="state.todoText"
              @keydown.enter="addTodo"
              class="p-2 mt-4 border rounded w-full"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { defineComponent, reactive } from "vue";

export default defineComponent({
  setup() {
    const baseUrl = process.env.VUE_APP_BASE_API_URL;

    const state = reactive({
      todos: [],
      todoText: "",
    });

    function addTodo() {
      if (state.todoText === "") return;

      axios
        .post(`${baseUrl}/todo`, {
          text: state.todoText,
        })
        .then(() => {
          state.todoText = "";
          getTodos();
        });
    }

    function removeTodo(id) {
      if (!confirm("Remove todo?")) {
        return;
      }

      axios.delete(`${baseUrl}/todo/${id}`).then(() => {
        getTodos();
      });
    }

    function markAsDone(id) {
      axios.post(`${baseUrl}/todo/mark/${id}`).then(() => {
        getTodos();
      });
    }

    function markAsUndone(id) {
      axios.post(`${baseUrl}/todo/unmark/${id}`).then(() => {
        getTodos();
      });
    }

    function getTodos() {
      axios.get(`${baseUrl}/todos`).then((response) => {
        const { data } = response.data;
        state.todos = data;
      });
    }

    getTodos();

    return {
      state,
      addTodo,
      removeTodo,
      markAsDone,
      markAsUndone,
    };
  },
});
</script>
