import getFactoryContract from "./getFactoryContract";

const getPoolAddress = async (outboundToken: string, inboundToken: string) => {
    const factory = getFactoryContract();

    const pool = (await factory.read.getPair([outboundToken, inboundToken])) as string;

    return pool;
};

export default getPoolAddress;
