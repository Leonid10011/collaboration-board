import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

type TextareaFieldProps = {
  label: string;
  description: string;
  placeholder: string;
  text: string;
  onTextChange: (value: string) => void;
};

export function TextareaField({
  label,
  description,
  placeholder,
  text,
  onTextChange,
}: TextareaFieldProps) {
  return (
    <Field>
      <FieldLabel htmlFor="textarea-message">{label}</FieldLabel>
      <FieldDescription>{description}</FieldDescription>
      <Textarea
        id="textarea-message"
        placeholder={placeholder}
        value={text}
        onChange={(e) => onTextChange(e.currentTarget.value)}
      />
    </Field>
  );
}
