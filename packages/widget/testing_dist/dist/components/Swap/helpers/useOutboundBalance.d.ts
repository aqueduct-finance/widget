interface UseOutboundBalanceProps {
    address: `0x${string}`;
    token: `0x${string}`;
}
declare const useOutboundBalance: ({ address, token }: UseOutboundBalanceProps) => number;
export default useOutboundBalance;
