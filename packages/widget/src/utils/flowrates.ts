import { GenericDropdownOption } from "../types/GenericDropdownOption";

const flowrates: GenericDropdownOption[] = [
    { label: "Total Amount", value: 3600, sublabel: "once" },
    { label: "Per Second", value: 1, sublabel: "sec" },
    { label: "Per Minute", value: 60, sublabel: "min" },
    { label: "Per Hour", value: 3600, sublabel: "hour" },
    { label: "Per Day", value: 3600 * 24, sublabel: "day" },
    { label: "Per Week", value: 3600 * 24 * 7, sublabel: "week" },
    { label: "Per Month", value: 3600 * 24 * 30, sublabel: "mon" },
    { label: "Per Year", value: 3600 * 24 * 365, sublabel: "year" },
];

export default flowrates;
