import { BigNumber, ethers } from "ethers";
import React, {
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useState,
} from "react";
import { useAccount, useBalance } from "wagmi";
import { publicClient } from '../../../providers/wagmiConfig';
import { TokenTypes } from "../../../types/TokenOption";

const ANIMATION_MINIMUM_STEP_TIME = 100;
const REFRESH_INTERVAL = 300; // 300 * 100 = 30000 ms = 30 s

interface RealTimeBalanceProps {
    token: TokenTypes;
    setBalance: Dispatch<SetStateAction<BigNumber>>;
    balance: BigNumber | null;
    setunWrapped: Dispatch<SetStateAction<number>>;
    setIsNew: (value: boolean) => void;
    isNew: boolean;
}

const RealTimeBalance = ({ token, setBalance, balance, setunWrapped, setIsNew, isNew }: RealTimeBalanceProps) => {

    const [flowRate, setFlowRate] = useState<BigNumber>(
        ethers.BigNumber.from(0)
    );

    const [isNotSuper, setIsNotSuper] = useState(false)

    const { address } = useAccount();

    const outboundBalance = useBalance({
        address: address,
        token: token?.underlyingToken?.address,
    })

    const updateRealTimeBalanceCallback = useCallback(async () => {
        async function updateRealTimeBalance() {
            if (!token || !address) {
                setBalance(null);
                return;
            }

            try {
                const tokenABI = [
                    {
                        name: "realtimeBalanceOf",
                        inputs: [
                            { name: "account", type: "address" },
                            { name: "timestamp", type: "uint256" }
                        ],
                        outputs: [
                            { name: "availableBalance", type: "int256" },
                            { name: "deposit", type: "uint256" },
                            { name: "owedDeposit", type: "uint256" }
                        ],
                        stateMutability: "view",
                        type: "function"
                    }
                ];

                if (address) {
                    const currentTimestampBigNumber = ethers.BigNumber.from(
                        new Date().valueOf()
                    );

                    // set token state
                    const initialResult = await publicClient.readContract({
                        address: token.address,
                        abi: tokenABI,
                        functionName: 'realtimeBalanceOf',
                        args: [address, currentTimestampBigNumber.div(1000).toString()]
                    })


                    const initialBalance = initialResult[0];

                    const futureResult = await publicClient.readContract({
                        address: token.address,
                        abi: tokenABI,
                        functionName: 'realtimeBalanceOf',
                        args: [address, currentTimestampBigNumber.div(1000).add((REFRESH_INTERVAL * ANIMATION_MINIMUM_STEP_TIME) / 1000).toString()]
                    })

                    const futureBalance = futureResult[0];

                    const futureBalanceBN = ethers.BigNumber.from(futureBalance);

                    setIsNotSuper(false)
                    setBalance(initialBalance);
                    setunWrapped(parseFloat(ethers.utils.formatEther(initialBalance)) + parseFloat(outboundBalance.data?.formatted))
                    setFlowRate(
                        futureBalanceBN.sub(initialBalance).div(REFRESH_INTERVAL)
                    );
                    setIsNew(false)
                }
            } catch (err) {
                setIsNotSuper(true)
                setBalance(null)
                console.log(err)
            }
        }

        updateRealTimeBalance();
    }, [address, publicClient, setBalance, token?.address]);

    const updateRealTime = () => {
        const checkBalance = balance ? parseFloat(ethers.utils.formatEther(balance)) : 0;

        if (isNotSuper) {
            setunWrapped(parseFloat(outboundBalance.data?.formatted) || 0);
        } else {
            setunWrapped(checkBalance + parseFloat(outboundBalance.data?.formatted));
        }
    };


    // REFRESH(in milliseconds) = REFRESH_INTERVAL * ANIMATION_MINIMUM_STEP_TIME
    const [time, setTime] = useState(REFRESH_INTERVAL);
    useEffect(() => {
        const timer = setTimeout(() => {
            setTime(time + 1);
            if (time >= REFRESH_INTERVAL) {
                setTime(0);
                updateRealTimeBalanceCallback();
            }

            if (isNew) {
                setunWrapped(0)
                return;
            }

            // animate frame
            setBalance((c) => (c ? ethers.BigNumber.from(c).add(flowRate) : flowRate));
            updateRealTime()

        }, ANIMATION_MINIMUM_STEP_TIME);
        return () => {
            clearTimeout(timer);
        };
    }, [flowRate, setBalance, time, updateRealTimeBalanceCallback, isNew]);

    useEffect(() => {
        updateRealTimeBalanceCallback();
    }, [address, token, updateRealTimeBalanceCallback]);

    return <div />;
};

export default RealTimeBalance; 