import {
  Button,
  Label,
  ListBox,
  ListBoxProps,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
  Switch,
  SwitchProps,
  SelectProps,
} from "react-aria-components";

export const ViewSwitch = (args: SwitchProps) => {
  return (
    <Switch
      className="group flex gap-2 items-center border-r-2 pr-4 border-r-blue"
      {...args}
    >
      Tabellen Ansicht
      <div className="flex h-[26px] w-[44px] shrink-0 cursor-default rounded-full shadow-inner bg-clip-padding border border-solid border-white/30 p-[3px] box-border transition duration-200 ease-in-out bg-cyan group-pressed:bg-cyan group-selected:bg-blue group-selected:group-pressed:bg-blue outline-none group-focus-visible:ring-2 ring-black">
        <span className="h-[18px] w-[18px] transform rounded-full bg-white shadow transition duration-200 ease-in-out translate-x-0 group-selected:translate-x-[100%]" />
      </div>
      Listen Ansicht
    </Switch>
  );
};

export const ColumnFilterList = (
  args: ListBoxProps<{ id: string; name: string }>,
) => {
  const options = [
    { id: "id", name: "Database ID" },
    { id: "authors", name: "Autoren" },
    { id: "title", name: "Titel" },
    { id: "start_date", name: "früh. mögl. Datierung" },
    { id: "end_date", name: "spät. mögl. Datierung" },
  ];
  return (
    <>
      {/* <Label>Filter:</Label> */}
      <ListBox
        aria-label="Column Filter"
        items={options}
        {...args}
        className=" flex flex-row justify-center gap-2 whitespace-nowrap "
      >
        {(item) => (
          <ListBoxItem className="py-2 px-4 data-selected:bg-red-600 aria-selected:bg-blue aria-selected:font-bold aria-selected:text-white hover:font-bold hover:bg-cyan rounded-lg border-2">
            {item.name}
          </ListBoxItem>
        )}
      </ListBox>
    </>
  );
};

export const ListLength = (
  args: SelectProps<ListBoxProps<{ id: number; name: string }>>,
) => {
  const options = [
    { id: 5, name: "5" },
    { id: 10, name: "10" },
    { id: 20, name: "20" },
    { id: 50, name: "50" },
    { id: 100, name: "100" },
    { id: 500, name: "500" },
  ];
  return (
    <Select
      {...args}
      className="border-r-2 pr-4 border-r-blue items-center flex"
    >
      <Label>Maximal Anzahl Ergebnisse pro Seite:</Label>
      <Button className="border-2 ml-2 bg-white  rounded-lg p-2 ">
        <SelectValue />
        <span aria-hidden="true">▼</span>
      </Button>
      <Popover>
        <ListBox
          aria-label="maximum results per page"
          items={options}
          className="bg-white p-2 text-sm text-right border-2 rounded-lg "
        >
          {(item) => (
            <ListBoxItem className="hover:bg-cyan hover:text-white p-2 rounded-lg">
              {item.name}
            </ListBoxItem>
          )}
        </ListBox>
      </Popover>
    </Select>
  );
};

export const ListSortBy = (
  args: SelectProps<ListBoxProps<{ id: number; name: string }>>,
) => {
  const options = [
    { id: "relevance", name: "Relevanz" },
    { id: "-relevance", name: "Relevanz (absteigend)" },
    { id: "display_label", name: "Titel" },
    { id: "-display_label", name: "Titel (absteigend)" },
    // {ordering by key_words yields duplicate items!? https://mmp.acdh-dev.oeaw.ac.at/api/stelle/?limit=20&offset=0&ordering=-key_word&zitat=gentis&zitat_lookup=icontains ==> ids: 2041, 2144, 2251 dup}
    // { id: "key_word", name: "Stichwörter" },
    // { id: "-key_word", name: "Stichwörter (absteigend)" },
    { id: "start_date", name: "Frühest mögl. Datierung" },
    { id: "-start_date", name: "Frühest mögl. Datierung (absteigend)" },
    { id: "end_date", name: "Spätest mögl. Datierung" },
    { id: "-end_date", name: "Spätest mögl. Datierung (absteigend)" },
  ];
  return (
    <Select {...args} className="flex items-center">
      <Label>Ergebnisse Sortieren nach</Label>
      <Button className="border-2 ml-2 bg-white  rounded-lg p-2 ">
        <SelectValue />
        <span aria-hidden="true">▼</span>
      </Button>
      <Popover>
        <ListBox
          aria-label="maximum results per page"
          items={options}
          className="bg-white p-2 text-sm text-right border-2 rounded-lg "
        >
          {(item) => (
            <ListBoxItem className="hover:bg-cyan hover:text-white p-2 rounded-lg">
              {item.name}
            </ListBoxItem>
          )}
        </ListBox>
      </Popover>
    </Select>
  );
};
