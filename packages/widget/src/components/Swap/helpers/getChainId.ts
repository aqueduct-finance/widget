import { getNetwork } from '@wagmi/core'

const getChainId = (): number | undefined => {
    
    const { chain } = getNetwork();
    return chain?.id
}

export default getChainId;