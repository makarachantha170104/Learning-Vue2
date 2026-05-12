# Vue2 Project Management App - Complete Documentation

## 📁 Project Structure Overview

```
vue2-learning-app/
├── public/
│   └── index.html           # HTML entry point
├── src/
│   ├── assets/
│   │   └── tailwind.css     # Tailwind CSS styles
│   ├── components/          # Reusable Vue components
│   ├── models/              # (Optional) Data models
│   ├── router/              # Route definitions
│   ├── stores/              # Pinia state management
│   ├── views/               # Page-level components
│   ├── App.vue              # Root component
│   └── main.js              # Application entry point
├── package.json             # Dependencies & scripts
├── tailwind.config.js       # Tailwind configuration
├── vue.config.js            # Vue CLI configuration
├── babel.config.js          # Babel configuration
├── postcss.config.js        # PostCSS configuration
└── jsconfig.json            # JS path aliases
```

---

## 🚀 Entry Point & Initialization

### `public/index.html`

- The HTML file served by the browser
- Contains a `<div id="app"></div>` where Vue mounts the application
- Linked to all CSS and JS bundles during build

### `src/main.js`

**Purpose:** Application bootstrap file - initializes Vue and mounts the app

**What it does:**

```javascript
- Imports Vue and App.vue (root component)
- Sets up Pinia for state management
- Initializes the router for page navigation
- Imports Tailwind CSS for styling
- Mounts the app to the #app element in index.html
```

**Key dependencies:**

- `vue`: Vue 2 framework
- `vue-router`: Client-side routing
- `pinia`: State management store
- `tailwind.css`: Utility-first CSS framework

### `src/App.vue`

**Purpose:** Root component that wraps all pages

**Structure:**

- `<router-view />`: Displays the current page based on the URL
- Sets up the main layout wrapper with background styling
- All routes are rendered inside this component

---

## 🛣️ Routing System

### `src/router/index.js`

**Purpose:** Defines all application routes and how URLs map to components

**Routes:**

```
1. "/" → Redirects to "/projects"
2. "/projects" → Displays Project.vue (Kanban board with all projects)
3. "/project/:id/detail" → Displays ProjectDetail.vue (single project details)
```

**Navigation methods:**

- Clicking project cards calls `this.$router.push('/project/:id/detail')`
- Back buttons call `this.$router.push('/projects')`

---

## 📊 State Management (Pinia Stores)

### `src/stores/projectStore.js`

**Purpose:** Manages global project data and CRUD operations

**State:**

```javascript
projects: []; // Array of all projects
searchQuery: ""; // Search text for filtering
statusFilter: "all"; // Filter by status (all, Todo, In Progress, Blocked, Completed)
loading: false; // Loading state for async operations
error: null; // Error messages
```

**Getters (computed properties):**

- `filteredProjects`: Returns projects filtered by search query and status
- `stats`: Returns statistics (total, completed, inProgress, blocked, todo, avgProgress)

**Actions (mutations):**
| Action | Purpose |
|--------|---------|
| `fetchProjectById(id)` | Fetch single project by ID with loading state |
| `searchProjects(query)` | Update search query state |
| `filterProjects(status)` | Update status filter state |
| `createProject(data)` | Add new project to store and localStorage |
| `updateProject(id, updates)` | Modify existing project properties |
| `deleteProject(id)` | Remove project from store and localStorage |
| `save()` | Persist projects to browser localStorage |

**Project Object Structure:**

```javascript
{
  id: "timestamp-string",
  name: "Project Name",
  description: "What the project is about",
  status: "Todo" | "In Progress" | "Blocked" | "Completed",
  progress: 0-100,        // Percentage complete
  tasks: [],              // Array of task objects
  createdAt: "ISO-date"
}
```

### `src/stores/taskStore.js`

**Purpose:** Manages tasks for each project and calculates progress

**State:**

```javascript
tasks: []; // Array of all tasks across all projects
```

**Getters:**

- `getTasksByProject(projectId)`: Returns tasks for a specific project
- `getProjectProgress(projectId)`: Calculates completion % for a project

**Actions:**
| Action | Purpose |
|--------|---------|
| `addTask(projectId, taskName)` | Create new task for a project |
| `toggleTask(taskId)` | Mark task as completed/incomplete |
| `updateTaskName(taskId, newName)` | Edit task name |
| `deleteTask(taskId)` | Remove task |
| `deleteTasksByProject(projectId)` | Clean up all tasks when project is deleted |
| `saveToLocalStorage()` | Persist tasks to browser storage |

**Task Object Structure:**

```javascript
{
  id: timestamp,
  projectId: "project-id",
  name: "Task description",
  completed: true | false
}
```

---

## 🎨 View Pages (Page-level Components)

### `src/views/Project.vue`

**Purpose:** Main projects list page - displays Kanban board with all projects

**Structure:**

```
├── Navbar
│   ├── Logo & Title
│   ├── ProjectSearch component
│   ├── ProjectFilter component
│   └── "New Project" button
├── ProjectList component (Kanban board)
└── ProjectForm modal
```

**Key methods:**

- `handleDelete(id)`: Deletes project and associated tasks
- `handleEdit(project)`: Opens form to edit project
- `handleSave(data)`: Creates or updates project
- `closeForm()`: Closes the modal form

**Data:**

- `showForm`: Boolean to show/hide the form modal
- `editingProject`: Stores the project being edited (null for new)

**Computed properties:**

- `projectStore`: Access to Pinia store
- `taskStore`: Access to task store

---

### `src/views/ProjectDetail.vue`

**Purpose:** Single project detail page - shows project info, status, progress, and subtasks

**Structure:**

```
├── Header with back button
├── Loading/Error states
└── Detail section
    ├── ProjectOverview component (stats)
    ├── Progress bar
    ├── Status badge
    ├── Description
    └── Sub-tasks checklist
        ├── Add new task input
        └── Task list with edit/delete options
```

**Key methods:**

- `handleAddTask()`: Create new subtask
- `toggleAndSync(taskId)`: Mark task done and update project progress
- `deleteAndSync(taskId)`: Remove task and update progress
- `startEdit(task)`: Enable inline editing for task name
- `saveEdit(taskId)`: Save edited task name
- `syncProjectStatus()`: Auto-update project status based on task completion

**Computed properties:**

- `project`: Get current project from store
- `subTasks`: Get all tasks for this project
- `progress`: Calculate progress % from tasks

**Lifecycle:**

- `created()`: Fetch project data when component mounts

---

## 🧩 Reusable Components

### `src/components/ProjectList.vue`

**Purpose:** Kanban board with draggable project columns

**Features:**

- 4 columns: Todo, In Progress, Blocked, Completed
- Drag-and-drop projects between columns
- Displays project count per column
- Empty state message when no projects

**Props:** None (uses Pinia store directly)

**Emits:**

```javascript
delete projectId; // Parent handles deletion
edit(project); // Parent opens edit form
```

**Methods:**

- `getProjectsByStatus(status)`: Filter projects for each column
- `onMove(evt, newStatus)`: Handle drag-drop status changes
- `handleUpdateStatus()`: Update status and sync progress
- `handleDelete(id)`: Emit delete event
- `handleEdit(project)`: Emit edit event

---

### `src/components/ProjectCard.vue`

**Purpose:** Individual project card displaying in Kanban columns

**Display:**

- Project name
- Completion checkbox (quick toggle)
- Progress bar
- Task dots (visual task completion)
- Edit/Delete buttons (hover)

**Props:**

```javascript
project: {
  type: Object,
  required: true
}
```

**Events:**

```javascript
@click        // Navigate to project detail
@update-status // Emit when quick-toggling completion
@delete       // Emit when delete clicked
@edit         // Emit when edit clicked
```

**Computed:**

- `displayProgress`: Show progress from tasks or project field
- `hasSubTasks`: Check if project has tasks
- `completedCount`: Count completed tasks

---

### `src/components/ProjectForm.vue`

**Purpose:** Modal form for creating/editing projects

**Fields:**

- Project Name (text input, required)
- Description (textarea)
- Status (dropdown: Todo, In Progress, Blocked, Completed)
- Progress % (number input, 0-100)

**Props:**

```javascript
visible: boolean; // Show/hide modal
project: Object | null; // Edit mode (populated) or Create mode (null)
```

**Emits:**

```javascript
@close // Close modal without saving
@save  // Save project with form data
```

**Behavior:**

- When `project` prop changes, form auto-populates with existing data
- When status is "Completed", automatically sets progress to 100
- Validates form before submission

---

### `src/components/ProjectSearch.vue`

**Purpose:** Search bar for filtering projects by name

**Features:**

- Real-time search as user types
- Search icon in input field
- Calls `projectStore.searchProjects(query)`

**Emits:** None (updates store directly via method)

---

### `src/components/ProjectFilter.vue`

**Purpose:** Dropdown filter for project status

**Options:**

- All Status (shows all projects)
- Todo
- In Progress
- Blocked
- Completed

**Behavior:**

- Updates `projectStore.statusFilter`
- Combined with search to filter ProjectList results

---

### `src/components/ProjectOverview.vue`

**Purpose:** Stats dashboard - shows key metrics

**Display modes:**

**1. Single Project Mode** (used in ProjectDetail):

- Total Tasks
- Current Status
- Completed Tasks

**2. Multi-Project Mode** (shows all projects):

- Total Projects
- In Progress Count
- Completed Count

**Props:**

```javascript
projects: Array; // For multi-project mode
project: Object; // For single-project mode
```

---

### `src/components/ProjectStatusBadge.vue`

**Purpose:** Displays colored status badge

**Status Colors:**
| Status | Color |
|--------|-------|
| Todo | Gray |
| In Progress | Blue |
| Blocked | Red |
| Completed | Green |

**Props:**

```javascript
status: string; // Status text (required)
```

---

## 💾 Data Flow

### Creating a Project:

```
1. User clicks "New Project" button in Project.vue
   ↓
2. ProjectForm modal opens (showForm = true, editingProject = null)
   ↓
3. User fills form and clicks "Create"
   ↓
4. handleSave() calls projectStore.createProject(data)
   ↓
5. Project added to store and localStorage
   ↓
6. ProjectList re-renders with new project in "Todo" column
```

### Updating Project Status:

```
1. User drags ProjectCard to different column
   ↓
2. ProjectList.onMove() detects drag event
   ↓
3. Calls projectStore.updateProject(id, {status: newStatus})
   ↓
4. Project status updates and auto-syncs with tasks
   ↓
5. Kanban board re-renders (Vue reactivity)
```

### Tracking Task Progress:

```
1. User adds task in ProjectDetail.vue
   ↓
2. taskStore.addTask() creates new task
   ↓
3. syncProjectStatus() recalculates project progress
   ↓
4. Updates projectStore with new progress %
   ↓
5. ProjectCard shows updated progress bar
```

---

## 🗄️ Local Storage

**Storage Keys:**

```javascript
"projects"; // Stores all projects
"saasflow_tasks"; // Stores all tasks
```

**Persistence:**

- Every time a project/task is modified, data is saved to localStorage
- On app load, data is restored from localStorage
- If localStorage is empty, app starts with empty project list

---

## 🎯 Key Features Summary

| Feature              | Implementation                                                    |
| -------------------- | ----------------------------------------------------------------- |
| **Create Project**   | ProjectForm modal + projectStore.createProject()                  |
| **Edit Project**     | Click edit button → populate ProjectForm                          |
| **Delete Project**   | Click delete button → confirmation → projectStore.deleteProject() |
| **Search Projects**  | ProjectSearch component → store searchQuery                       |
| **Filter by Status** | ProjectFilter dropdown → store statusFilter                       |
| **Drag-Drop Status** | ProjectList with vuedraggable library                             |
| **Task Management**  | ProjectDetail.vue + taskStore                                     |
| **Progress Sync**    | taskStore calculates % → syncs to projectStore                    |
| **Persistent Data**  | localStorage (projects & tasks)                                   |

---

## 🔧 Configuration Files

| File                 | Purpose                                     |
| -------------------- | ------------------------------------------- |
| `package.json`       | Dependencies, scripts (npm run serve/build) |
| `tailwind.config.js` | Tailwind CSS customization                  |
| `vue.config.js`      | Vue CLI build settings                      |
| `babel.config.js`    | JavaScript transpilation settings           |
| `postcss.config.js`  | CSS processing with autoprefixer            |
| `jsconfig.json`      | Path aliases (@) and JS configuration       |

---

## 📦 Key Dependencies

| Package               | Purpose                             |
| --------------------- | ----------------------------------- |
| `vue@2.6.14`          | Vue 2 framework                     |
| `vue-router@3.5.1`    | Client-side routing                 |
| `pinia@2.3.1`         | State management (Vuex alternative) |
| `vuedraggable@2.24.3` | Drag-and-drop functionality         |
| `tailwindcss`         | Utility CSS framework               |
| `autoprefixer`        | CSS vendor prefixes                 |

---

## 🚀 How to Run

```bash
# Install dependencies
npm install

# Start development server
npm run serve

# Build for production
npm run build
```

---

## 📝 Notes

- **State Management:** Pinia is used instead of Vuex for cleaner, more modular state
- **Styling:** 100% Tailwind CSS utility classes (no separate component styles needed)
- **Persistence:** Browser localStorage keeps data across sessions
- **Routing:** Hash-less history mode for clean URLs
- **Task Sync:** Tasks auto-update project progress percentage
- **Z-Index:** Modal uses inline styles to ensure it appears above navbar
