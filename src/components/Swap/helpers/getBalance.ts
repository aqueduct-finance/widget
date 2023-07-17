import { useAccount, useBalance } from "wagmi";

interface GetBalanceProps {
    tokenOption: `0x${string}` | null;
}

export const useGetBalance = ({ tokenOption }: GetBalanceProps) => {
    const user = useAccount();

    const balance = useBalance({
        address: user.address,
        token: tokenOption,
    });

    return balance;
};
