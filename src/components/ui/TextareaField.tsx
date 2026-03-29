import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

type TextareaFieldProps = {
  label: string;
  description: string;
  placeholder: string;
};

export function TextareaField({
  label,
  description,
  placeholder,
}: TextareaFieldProps) {
  return (
    <Field>
      <FieldLabel htmlFor="textarea-message">{label}</FieldLabel>
      <FieldDescription>{description}</FieldDescription>
      <Textarea id="textarea-message" placeholder={placeholder} />
    </Field>
  );
}
