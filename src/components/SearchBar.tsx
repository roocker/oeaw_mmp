import type { SearchFieldProps, ValidationResult } from "react-aria-components";
import { SearchField, Label, Input, Form, Text } from "react-aria-components";

/* const args = {
  isRequired: true
  onChange:{(input) => setSearchTerm(input)}
onSubmit={() => handleSearch(searchTerm, maxResults)}
} */
interface SearchBarProps extends SearchFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}
export default function SearchBar({
  label,
  description,
  ...props
}: SearchBarProps) {
  return (
    <section aria-label="Search Input">
      {/* <SearchIcon /> */}
      <Form>
        <SearchField {...props}>
          <Label>{label}</Label>
          <Input />
          {description && <Text slot="description">{description}</Text>}
        </SearchField>
      </Form>
    </section>
  );
}
