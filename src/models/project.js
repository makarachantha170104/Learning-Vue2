export const ProjectStatus = {
  TODO: "Todo",
  IN_PROGRESS: "In Progress",
  BLOCKED: "Blocked",
  COMPLETED: "Completed",
};

export class Project {
  constructor({ id, name, description, status = "Todo", tasks = [] }) {
    this.id = id || Date.now().toString();
    this.name = name;
    this.description = description;
    this.status = status;
    this.tasks = tasks;
    this.progress = 0;
    this.createdAt = new Date().toISOString();
  }
}

export class Task {
  constructor(data = {}) {
    this.id = data.id || Date.now().toString();
    this.title = data.title || "";
    this.description = data.description || "";
    this.status = data.status || ProjectStatus.TODO;
    this.dueDate = data.dueDate || null;
  }
}
