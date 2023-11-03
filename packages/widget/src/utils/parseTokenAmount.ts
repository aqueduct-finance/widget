import { TokenTypes } from "../types/TokenOption"
import { parseUnits } from 'viem'

interface props {
    token: TokenTypes | undefined;
    amount: string;
}

const parseTokenAmount = ({
    token,
    amount
}: props) => {
    if (!token) return 0;
    return parseUnits(amount, token.decimals);
}

export default parseTokenAmount;