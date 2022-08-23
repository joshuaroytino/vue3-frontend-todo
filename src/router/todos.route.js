import LoggedinLayout from "@/views/LoggedinLayout.vue";
import TodoView from "@/views/TodoView.vue";

export default {
  path: "/todos",
  component: LoggedinLayout,
  children: [{ path: "", name: "todos", component: TodoView }],
};
