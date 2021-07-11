interface TodoPriority {
  name: string;
  specialChar: string;
}
interface Todo {
  name: string;
  description: string;
  priority: TodoPriority;
}

export { TodoPriority, Todo };
