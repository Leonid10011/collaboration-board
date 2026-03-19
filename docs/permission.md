## Permission Matrix

| Resource          | Operation                | Allowed For        | Condition                                     |
| ----------------- | ------------------------ | ------------------ | --------------------------------------------- |
| Task              | select                   | admin, member      | user is project member                        |
| Task              | insert                   | admin, member      | user is project member                        |
| Task              | delete                   | admin              | user has admin role in current project        |
| Task              | take task                | admin, member      | task is unassigned and user is project member |
| Task              | reassign task            | admin              | user has admin role in current project        |
| Task              | update title/description | admin, member      | user is project member                        |
| Task              | change status            | admin, member      | admin always; member only if assigned to task |
| Task              | change priority          | admin              | user has admin role in current project        |
| Project           | select                   | admin, member      | user is project member                        |
| Project           | insert                   | authenticated user | user is authenticated                         |
| Project           | delete                   | admin              | user has admin role in current project        |
| Project           | add member               | admin              | user has admin role in current project        |
| Project           | change title             | admin              | user has admin role in current project        |
| ProjectMembership | select                   | admin, member      | user is project member                        |
| ProjectMembership | delete                   | admin              | user has admin role in current project        |
| ProjectMembership | insert                   | admin              | user has admin role in current project        |
