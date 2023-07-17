import { GenericDropdownOption } from "../types/GenericDropdownOption";

const flowrates: GenericDropdownOption[] = [
    { label: "Pay Once", value: 3600, sublabel: "once" },
    { label: "Every Second", value: 1, sublabel: "sec" },
    { label: "Every Minute", value: 60, sublabel: "min" },
    { label: "Every Hour", value: 3600, sublabel: "hour" },
    { label: "Every Day", value: 3600 * 24, sublabel: "day" },
    { label: "Every Week", value: 3600 * 24 * 7, sublabel: "week" },
    { label: "Every Month", value: 3600 * 24 * 30, sublabel: "mon" },
    { label: "Every Year", value: 3600 * 24 * 365, sublabel: "year" },
];

export default flowrates;
