export default function toLocale(num: number) {
    return num.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 5});
}