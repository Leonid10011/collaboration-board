import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type UpdateTaskModalForm = {
  title: string;
  onTitleChange: (text: string) => void;
  description: string;
  onDescriptionChange: (text: string) => void;
};

export default function UpdateTaskModalForm({
  title,
  onTitleChange,
  description,
  onDescriptionChange,
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
    </FieldGroup>
  );
}
