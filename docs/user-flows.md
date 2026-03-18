# User Flows

## Create Task

### Goal

Create a new task in the current project.

### Trigger

User clicks "Create Task".

### Preconditions

- User is a member of the current project
- Current project is loaded

### Flow

1. User opens the create task form
2. User enters task data
3. User submits the form
4. System validates input
5. System creates the task with default values
6. System broadcasts the new task to connected clients

### System Response

- `project_id` is assigned from current project
- `creator_id` is set to current user
- `assignee_id` is `null`
- `status` is `backlog`

### UI Result

- Task appears in the backlog column of the current project board
- Other connected clients see the task appear in real time

### Edge Cases

- User has no permission to create tasks
- Validation fails because required fields are missing

---

## Assign Task

### Goal

Assign a task to a specific user.

### Trigger

User selects a task and assigns it to a user.

### Preconditions

- User is a member of the project
- Task exists
- User has permission to assign tasks

### Flow

1. User selects a task
2. System checks if the user has permission
3. User assigns the task to a user
4. System updates `assignee_id` in the task data
5. System broadcasts the update via WebSocket
6. All clients receive the update
7. Clients update the task state

### System Response

- `assignee_id` is updated
- Realtime event is emitted to all connected clients

### UI Result

- Task displays assigned user
- Task position updates visually if needed
- Assigned user sees the task in their personal dashboard

### Edge Cases

- Task was already reassigned by another user
- User does not have permission to assign tasks

---

## Update Task

### Goal

Update task information.

### Trigger

User edits a task and submits changes.

### Preconditions

- User is a project member
- User has permission to update the task

### Flow

1. User selects a task
2. System checks user permissions
3. User modifies task fields
4. User submits update
5. System validates data
6. System updates task data (last write wins)
7. System broadcasts updated task
8. Clients receive update and refresh state

### System Response

- Task data is updated in database
- Realtime update is emitted

### UI Result

- Updated task data is reflected instantly
- All clients see consistent state

### Edge Cases

- Data changed by another user before submission
- Validation fails

---

## Take Task

### Goal

Assign a task to the current user.

### Trigger

User selects an unassigned task and takes it.

### Preconditions

- User is a project member
- Task is unassigned
- User has permission to take tasks

### Flow

1. User selects a task
2. System checks permission
3. System checks if task is still unassigned
4. User assigns task to themselves
5. System updates `assignee_id`
6. System broadcasts update
7. Clients update task state

### System Response

- `assignee_id` is set to current user
- Realtime event is emitted

### UI Result

- Task shows assigned user badge
- Task may move visually within the column
- Task appears in user's personal dashboard

### Edge Cases

- Task was already assigned by another user
- Permission denied

---

## Create Project

### Goal

Create a new project.

### Trigger

User submits project creation form.

### Preconditions

- User is authenticated

### Flow

1. User opens create project form
2. User enters project data
3. User submits form
4. System validates data
5. System creates project
6. System assigns current user as owner

### System Response

- New project is created
- `owner_id` is set to current user

### UI Result

- Project appears in user's project list

### Edge Cases

- Validation fails (missing title, duplicate slug, etc.)

---

## Add Member (MVP: no invite flow)

### Goal

Add a user to a project.

### Trigger

User adds a member to the current project.

### Preconditions

- User is project owner
- Target user exists

### Flow

1. User selects "Add Member"
2. User searches for another user
3. System checks if user exists
4. System checks if user is already a member
5. System creates `project_membership` with default role = member
6. System updates project membership list

### System Response

- New membership is created
- User is linked to the project

### UI Result

- Member appears in project member list
- Project appears in member's project overview

### Edge Cases

- User does not exist
- User is already a member
- Permission denied
