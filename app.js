let connectButton = document.getElementById("connectButton");
let walletInfo = document.getElementById("walletInfo");
let walletAddressDisplay = document.getElementById("walletAddress");
let stakedAmountDisplay = document.getElementById("stakedAmount");
let earnedDisplay = document.getElementById("earned");

const contractAddress = "0x6e9E4FBEeEd3DDb0B932a7dAc6A725e0497a63Ff";
const abi = [...]; // Replace with your actual ABI

let provider, signer, contract;

connectButton.onclick = async () => {
    if (typeof window.ethereum !== "undefined") {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        const address = await signer.getAddress();
        walletAddressDisplay.innerText = address;
        walletInfo.style.display = "block";

        contract = new ethers.Contract(contractAddress, abi, signer);
        updateUI();
    }
};

async function updateUI() {
    let staked = await contract.balanceOf(await signer.getAddress());
    let earned = await contract.earned(await signer.getAddress());

    stakedAmountDisplay.innerText = ethers.utils.formatUnits(staked, 18);
    earnedDisplay.innerText = ethers.utils.formatUnits(earned, 18);
}

document.getElementById("claimButton").onclick = async () => {
    const tx = await contract.getReward();
    await tx.wait();
    updateUI();
};
