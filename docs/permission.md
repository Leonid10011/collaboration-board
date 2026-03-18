## Task Permissions

| Action        | Owner | Member | Condition          |
| ------------- | ----- | ------ | ------------------ |
| Read Task     | ✔     | ✔      | Project member     |
| Create Task   | ✔     | ✔      | Project member     |
| Update Task   | ✔     | ✔      | Assignee or owner  |
| Change Status | ✔     | ✔      | Assignee or owner  |
| Take Task     | ✔     | ✔      | Task is unassigned |
| Reassign Task | ✔     | ✖      | Owner only         |
| Delete Task   | ✔     | ✖      | Owner only         |
