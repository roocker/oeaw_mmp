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
    <Switch className="group flex gap-2 items-center" {...args}>
      Listen Ansicht
      <div className="flex h-[26px] w-[44px] shrink-0 cursor-default rounded-full shadow-inner bg-clip-padding border border-solid border-white/30 p-[3px] box-border transition duration-200 ease-in-out bg-cyan group-pressed:bg-cyan group-selected:bg-blue group-selected:group-pressed:bg-blue outline-none group-focus-visible:ring-2 ring-black">
        <span className="h-[18px] w-[18px] transform rounded-full bg-white shadow transition duration-200 ease-in-out translate-x-0 group-selected:translate-x-[100%]" />
      </div>
      Tabellen Ansicht
    </Switch>
  );
};

export const ColumnFilterList = (
  args: ListBoxProps<{ id: string; name: string }>,
) => {
  const options = [
    { id: "authors", name: "Autoren" },
    { id: "title", name: "Titel" },
    { id: "start_date", name: "früheste mögliche Datierung" },
    { id: "end_date", name: "spätest mögliche Datierung" },
  ];
  return (
    <>
      <Label>Filter:</Label>
      <ListBox aria-label="Column Filter" items={options} {...args}>
        {(item) => <ListBoxItem>{item.name}</ListBoxItem>}
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
    <Select {...args}>
      <Label>Maximal Anzahl Ergebnisse pro Seite:</Label>
      <Button>
        <SelectValue />
        <span aria-hidden="true">▼</span>
      </Button>
      <Popover>
        <ListBox aria-label="maximum results per page" items={options}>
          {(item) => <ListBoxItem>{item.name}</ListBoxItem>}
        </ListBox>
      </Popover>
    </Select>
  );
};
