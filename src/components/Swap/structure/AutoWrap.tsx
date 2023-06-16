import React, { useState, useEffect } from "react";
import { daiABI } from "./config";
import { Framework } from "@superfluid-finance/sdk-core";
// TODO: Fix imports - should bootstrap be installed?
import {
    Button,
    Form,
    FormGroup,
    FormControl,
    Spinner,
    Card
} from "react-bootstrap";
import "./batchCall.css";
import { ethers } from "ethers";




/*
 This is an example provided by Superfluid
*/




let account;
//will be used to approve super token contract to spend DAI
async function daiApprove(approveAmount) {
    // TODO: add window.ethereum global type
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();

    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    const sf = await Framework.create({
        chainId: Number(chainId),
        provider: provider
    });

    const superSigner = sf.createSigner({ signer: signer });

    console.log(signer);
    console.log(await superSigner.getAddress());
    const daix = await sf.loadSuperToken("fDAIx");

    console.log(daiABI);

    const DAI = new ethers.Contract(
        "0x88271d333C72e51516B67f5567c728E702b3eeE8",
        daiABI,
        signer
    );

    console.log(DAI);
    try {
        console.log("approving DAI spend");
        await DAI.approve(
            "0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00",
            ethers.utils.parseEther(approveAmount.toString())
        ).then(function (tx) {
            console.log(
                `Congrats, you just approved your DAI spend. You can see this tx at https://goerli.etherscan.io/tx/${tx.hash}`
            );
        });
    } catch (error) {
        console.error(error);
    }
}

//where the Superfluid logic takes place
async function executeBatchCall(upgradeAmt, recipient, flowRate) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();

    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    const sf = await Framework.create({
        chainId: Number(chainId),
        provider: provider
    });

    const superSigner = sf.createSigner({ signer: signer });

    console.log(signer);
    console.log(await superSigner.getAddress());
    const DAIx = await sf.loadSuperToken("fDAIx");

    console.log(DAIx);

    try {
        const amtToUpgrade = ethers.utils.parseEther(upgradeAmt.toString());
        const upgradeOperation = DAIx.upgrade({
            amount: amtToUpgrade.toString()
        });
        //upgrade and create stream at once
        const createFlowOperation = DAIx.createFlow({
            sender: "0xDCB45e4f6762C3D7C61a00e96Fb94ADb7Cf27721",
            receiver: recipient,
            flowRate: flowRate
        });

        console.log("Upgrading tokens and creating stream...");

        await sf
            .batchCall([upgradeOperation, createFlowOperation])
            .exec(signer)
            .then(function (tx) {
                console.log(
                    `Congrats - you've just successfully executed a batch call!
          You have completed 2 operations in a single tx 🤯
          View the tx here:  https://goerli.etherscan.io/tx/${tx.hash}
          View Your Stream At: https://app.superfluid.finance/dashboard/${recipient}
          Network: Goerli
          Super Token: DAIx
          Sender: 0xDCB45e4f6762C3D7C61a00e96Fb94ADb7Cf27721
          Receiver: ${recipient},
          FlowRate: ${flowRate}
          `
                );
            });
    } catch (error) {
        console.log(
            "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
        );
        console.error(error);
    }
}

export const BatchCall = () => {
    const [recipient, setRecipient] = useState("");
    const [isBatchCallButtonLoading, setIsBatchCallButtonLoading] = useState(
        false
    );
    const [upgradeAmount, setUpgradeAmount] = useState("");
    const [flowRate, setFlowRate] = useState("");
    const [flowRateDisplay, setFlowRateDisplay] = useState("");
    const [approveAmount, setApproveAmount] = useState("");
    const [isApproveButtonLoading, setIsApproveButtonLoading] = useState(false);
    const [currentAccount, setCurrentAccount] = useState("");

    const connectWallet = async () => {
        try {
            const { ethereum } = window;

            if (!ethereum) {
                alert("Get MetaMask!");
                return;
            }
            const accounts = await ethereum.request({
                method: "eth_requestAccounts"
            });
            console.log("Connected", accounts[0]);
            setCurrentAccount(accounts[0]);
            account = currentAccount;
            // Setup listener! This is for the case where a user comes to our site
            // and connected their wallet for the first time.
            // setupEventListener()
        } catch (error) {
            console.log(error);
        }
    };

    const checkIfWalletIsConnected = async () => {
        console.log("runs");
        const { ethereum } = window;

        if (!ethereum) {
            console.log("Make sure you have metamask!");
            return;
        } else {
            console.log("We have the ethereum object", ethereum);
        }

        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        const chain = await window.ethereum.request({ method: "eth_chainId" });
        let chainId = chain;
        console.log("chain ID:", chain);
        console.log("global Chain Id:", chainId);
        if (accounts.length !== 0) {
            account = accounts[0];
            console.log("Found an authorized account:", account);
            setCurrentAccount(account);
            // Setup listener! This is for the case where a user comes to our site
            // and ALREADY had their wallet connected + authorized.
            // setupEventListener()
        } else {
            console.log("No authorized account found");
        }
    };

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    function calculateFlowRate(amount) {
        if (typeof Number(amount) !== "number" || isNaN(Number(amount)) === true) {
            alert("You can only calculate a flowRate based on a number");
            return;
        } else if (typeof Number(amount) === "number") {
            if (Number(amount) === 0) {
                return 0;
            }
            const amountInWei = ethers.BigNumber.from(amount);
            const monthlyAmount = ethers.utils.formatEther(amountInWei.toString());
            const calculatedFlowRate = monthlyAmount * 3600 * 24 * 30;
            return calculatedFlowRate;
        }
    }

    function BatchCallButton({ isLoading, children, ...props }) {
        return (
            <Button variant="success" className="batchCallButton" {...props}>
                {isBatchCallButtonLoading ? <Spinner animation="border" /> : children}
            </Button>
        );
    }

    function ApproveButton({ isLoading, children, ...props }) {
        return (
            <Button variant="success" className="approveButton" {...props}>
                {isApproveButtonLoading ? <Spinner animation="border" /> : children}
            </Button>
        );
    }

    const handleRecipientChange = (e) => {
        setRecipient(() => ([e.target.name] = e.target.value));
    };

    const handleApproveAmountChange = (e) => {
        setApproveAmount(() => ([e.target.name] = e.target.value));
    };

    const handleUpgradeAmountChange = (e) => {
        setUpgradeAmount(() => ([e.target.name] = e.target.value));
    };

    const handleFlowRateChange = (e) => {
        setFlowRate(() => ([e.target.name] = e.target.value));
        let newFlowRateDisplay = calculateFlowRate(e.target.value);
        setFlowRateDisplay(newFlowRateDisplay.toString());
    };

    return (
        <div>
            <h2>Batch Calls</h2>
            <h5>
                Upgrade and create a flow in a single tx <span role="img">🤯</span>
            </h5>
            {currentAccount === "" ? (
                <button id="connectWallet" className="button" onClick={connectWallet}>
                    Connect Wallet
                </button>
            ) : (
                <Card className="connectedWallet">
                    {`${currentAccount.substring(0, 4)}...${currentAccount.substring(
                        38
                    )}`}
                </Card>
            )}
            <div>
                <Form>
                    <FormGroup className="mb-3">
                        <FormControl
                            name="approveAmount"
                            value={approveAmount}
                            onChange={handleApproveAmountChange}
                            placeholder="Enter how many tokens to approve first"
                        ></FormControl>
                    </FormGroup>
                    <ApproveButton
                        onClick={() => {
                            setIsApproveButtonLoading(true);
                            daiApprove(approveAmount);
                            setTimeout(() => {
                                setIsApproveButtonLoading(false);
                            }, 1000);
                        }}
                    >
                        Click to approve tokens
                    </ApproveButton>
                </Form>
            </div>
            <div>
                <Form>
                    <FormGroup className="mb-3">
                        <FormControl
                            name="upgradeAmount"
                            value={upgradeAmount}
                            onChange={handleUpgradeAmountChange}
                            placeholder="Enter the dollar amount you'd like to upgrade"
                        ></FormControl>
                    </FormGroup>
                </Form>
            </div>
            <div>
                <Form>
                    <FormGroup className="mb-3">
                        <FormControl
                            name="recipient"
                            value={recipient}
                            onChange={handleRecipientChange}
                            placeholder="Enter your Ethereum address"
                        ></FormControl>
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <FormControl
                            name="flowRate"
                            value={flowRate}
                            onChange={handleFlowRateChange}
                            placeholder="Enter a flowRate in wei/second"
                        ></FormControl>
                    </FormGroup>
                    <BatchCallButton
                        onClick={() => {
                            setIsBatchCallButtonLoading(true);
                            executeBatchCall(upgradeAmount, recipient, flowRate);
                            setTimeout(() => {
                                setIsBatchCallButtonLoading(false);
                            }, 1000);
                        }}
                    >
                        Click to Upgrade Tokens and Create Your Stream
                    </BatchCallButton>
                </Form>
            </div>

            <div className="description">
                <p>
                    Go to the BatchCall.js component and look at the{" "}
                    <b>executeBatchCall() </b>
                    function to see under the hood
                </p>
                <div className="calculation">
                    <p>Your flow will be equal to:</p>
                    <p>
                        <b>${flowRateDisplay !== " " ? flowRateDisplay : 0}</b> DAIx/month
                    </p>
                </div>
            </div>
        </div>
    );
};