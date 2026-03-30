import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "../combobox";

/**
 * Generic items array input.
 * Requires an identifire and a text value as arguments.
 */
type SearchInputFieldProp<T> = {
  items: T[] | null;
  getId: (item: T) => string;
  getTextField: (item: T) => string;
  onSelect: (item: T) => void;
};

export default function SearchInputField<T>({
  items,
  getId,
  getTextField,
  onSelect,
}: SearchInputFieldProp<T>) {
  return (
    <Combobox items={items ? items : []}>
      <ComboboxInput placeholder="Select a framework" />
      <ComboboxContent>
        <ComboboxEmpty>No profiles found.</ComboboxEmpty>
        <ComboboxList>
          {(item: T) => (
            <ComboboxItem
              key={getId(item)}
              value={getTextField(item)}
              onClick={() => {
                onSelect(item);
              }}
            >
              {getTextField(item)}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
