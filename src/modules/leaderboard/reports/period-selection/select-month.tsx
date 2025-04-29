import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectMonth({
  defaultValue,
  onSelect,
}: {
  onSelect: (value: string) => void;
  defaultValue: string
}) {
  return (
    <Select onValueChange={(value) => onSelect(value)} defaultValue={defaultValue}>
      <SelectTrigger className="w-[180px] text-white">
        <SelectValue placeholder="Select month" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Month</SelectLabel>
          <SelectItem value="0">January</SelectItem>
          <SelectItem value="1">Feburary</SelectItem>
          <SelectItem value="2">March</SelectItem>
          <SelectItem value="3">April</SelectItem>
          <SelectItem value="4">May</SelectItem>
          <SelectItem value="5">June</SelectItem>
          <SelectItem value="6">July</SelectItem>
          <SelectItem value="7">August</SelectItem>
          <SelectItem value="8">Septemeber</SelectItem>
          <SelectItem value="9">October</SelectItem>
          <SelectItem value="10">November</SelectItem>
          <SelectItem value="11">December</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
