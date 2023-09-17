interface UseOutboundBalanceProps {
    address: `0x${string}`;
    token: `0x${string}`;
}
declare const useInboundBalance: ({ address, token }: UseOutboundBalanceProps) => number;
export default useInboundBalance;
