import Address from "../../../types/Address";
import {
    ETHxpfDAIxpPool,
    fDAIxpETHxpPool,
    fDAIxpfUSDCxpPool,
} from "../../../utils/constants";

const getPoolAddress = (outboundToken: string, inboundToken: string) => {
    let pool: string;

    switch (true) {
        case inboundToken === Address.ETHxp && outboundToken === Address.fDAIxp:
            pool = ETHxpfDAIxpPool;
            break;
        case inboundToken === Address.fDAIxp && outboundToken === Address.ETHxp:
            pool = fDAIxpETHxpPool;
            break;
        case inboundToken === Address.fDAIxp && outboundToken === Address.fUSDCxp:
            pool = fDAIxpfUSDCxpPool;
            break;
        case inboundToken === Address.fUSDCxp && outboundToken === Address.fDAIxp:
            pool = fDAIxpfUSDCxpPool;
            break;
        default:
            throw new Error(
                `Pool not found for tokens "${outboundToken}" and "${inboundToken}"`
            );
    }

    return pool;
};

export default getPoolAddress;