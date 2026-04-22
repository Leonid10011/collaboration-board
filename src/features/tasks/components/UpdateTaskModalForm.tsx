import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { toUpper } from "@/lib/utils";
import { TASK_PRIORITIES, TASK_STATUSES, TaskStatus } from "../types";

type UpdateTaskModalForm = {
  title: string;
  onTitleChange: (text: string) => void;
  description: string;
  onDescriptionChange: (text: string) => void;
  priority: TaskPriority;
  onPriorityChange: (value: TaskPriority) => void;
  status: TaskStatus;
  onStatusChange: (value: TaskStatus) => void;
};

export default function UpdateTaskModalForm({
  title,
  onTitleChange,
  description,
  onDescriptionChange,
  priority,
  onPriorityChange,
  status,
  onStatusChange,
}: UpdateTaskModalForm) {
  return (
    <FieldGroup>
      <Field>
        <FieldLabel>Title</FieldLabel>
        <Input
          value={title}
          onChange={(e) => onTitleChange(e.currentTarget.value)}
        />
      </Field>
      <Field>
        <FieldLabel>Description</FieldLabel>
        <Textarea
          value={description}
          onChange={(e) => onDescriptionChange(e.currentTarget.value)}
        />
      </Field>
      <Field>
        <FieldLabel>Priority</FieldLabel>
        <Select value={priority} onValueChange={onPriorityChange}>
          <SelectTrigger className="w-full max-w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent position="popper">
            {TASK_PRIORITIES.map((p) => (
              <SelectItem key={p} value={p}>
                {toUpper(p)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
      <Field>
        <FieldLabel>Status</FieldLabel>
        <Select value={status} onValueChange={onStatusChange}>
          <SelectTrigger className="w-full max-w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent position="popper">
            {TASK_STATUSES.map((s) => (
              <SelectItem key={s} value={s}>
                {toUpper(s)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
    </FieldGroup>
  );
}
