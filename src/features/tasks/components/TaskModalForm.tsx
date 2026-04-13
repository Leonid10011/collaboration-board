import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import {
  TASK_PRIORITIES,
  TASK_STATUSES,
  TaskPriority,
  TaskStatus,
} from "@/domain/tasks";

type TaskModalFormProps = {
  description: string;
  onDescription: (v: string) => void;
  status: TaskStatus;
  onStatus: (v: TaskStatus) => void;
  priority: TaskPriority;
  onPriority: (v: TaskPriority) => void;
};

export default function TaskModalForm({
  description,
  onDescription,
  status,
  onStatus,
  priority,
  onPriority,
}: TaskModalFormProps) {
  return (
    <FieldGroup>
      <Field>
        <FieldLabel>Description</FieldLabel>
        <Textarea
          id="input-field-description"
          placeholder="Enter a Description"
          value={description}
          onChange={(e) => onDescription(e.target.value)}
        />
      </Field>
      <Field>
        <FieldLabel>Status</FieldLabel>
        <Select
          defaultValue={status}
          onValueChange={(value) => onStatus(value as TaskStatus)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {TASK_STATUSES.map((s, i) => (
                <SelectItem key={i} value={s}>
                  {s.substring(0, 1).toUpperCase() + s.substring(1)}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
      <Field>
        <FieldLabel>Priority</FieldLabel>
        <Select
          defaultValue={priority}
          onValueChange={(value) => onPriority(value as TaskPriority)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {TASK_PRIORITIES.map((p, i) => (
                <SelectItem key={i} value={p}>
                  {p.substring(0, 1).toUpperCase() + p.substring(1)}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
    </FieldGroup>
  );
}
