import { GenericDropdownOption } from "../types/GenericDropdownOption";

const flowrates: GenericDropdownOption[] = [
    { label: "Pay Once", value: 1 },
    { label: "Every Second", value: 1 },
    { label: "Every Minute", value: 60 },
    { label: "Every Hour", value: 3600 },
    { label: "Every Day", value: 3600 * 24 },
    { label: "Every Week", value: 3600 * 24 * 7 },
    { label: "Every Month", value: 3600 * 24 * 30 },
    { label: "Every Year", value: 3600 * 24 * 365 },
];

export default flowrates;