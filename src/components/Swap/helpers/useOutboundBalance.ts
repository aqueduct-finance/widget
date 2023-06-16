import { useEffect, useState } from "react";
import { useBalance } from "wagmi"

interface UseOutboundBalanceProps {
    address: `0x${string}`;
    token: `0x${string}`;
}

const useOutboundBalance = ({ address, token }: UseOutboundBalanceProps) => {
    const [outboundBalance, setOutboundBalance] = useState<number>(
    );

    const balanceQuery = useBalance({
        address: address,
        token: token
    });

    useEffect(() => {
        if (balanceQuery.isSuccess && balanceQuery.data) {
            const balance = balanceQuery.data?.formatted;
            setOutboundBalance(parseInt(balance));
        }
    }, [balanceQuery.isSuccess, balanceQuery.data]);

    return outboundBalance;
};

export default useOutboundBalance;


