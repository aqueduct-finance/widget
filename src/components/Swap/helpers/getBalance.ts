import { TokenTypes } from "../../../types/TokenOption";
import { useAccount, useBalance } from 'wagmi'

// some bs here with not assignable because wagmi is stupid,
// will make better no cap

interface GetBalanceProps {
    tokenOption: `0x${string}` | null;
}

export const useGetBalance = ({ tokenOption }: GetBalanceProps) => {

    const user = useAccount()

    const balance = useBalance({
        address: user.address,
        token: tokenOption,
    })

    return balance;
}