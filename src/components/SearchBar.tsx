import type { SearchFieldProps, ValidationResult } from "react-aria-components";
import { SearchField, Label, Input, Form } from "react-aria-components";

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
        <SearchField {...props} className="relative w-full">
          <Label className="absolute bg-white top-[-0.75em] left-5 px-2">
            {label}
          </Label>
          <Input
            className="bg-cyan w-full h-24 text-2xl text-white p-3 indent-8  border-2 border-black bg-clip-content rounded-[1em] focus:outline-0 placeholder:text-white placeholder:opacity-35 "
            placeholder={description ? description : "Suche"}
          />
          {/* {description && (
            <Text
              slot="description"
              className="text-xs text-gray-600 relative ml-4 top-2 "
            >
              {description}
            </Text>
          )} */}
        </SearchField>
      </Form>
    </section>
  );
}
