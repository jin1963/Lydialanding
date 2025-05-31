
async function connectWallet() {
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            alert("Wallet connected!");
        } catch (error) {
            console.error("User rejected connection");
        }
    } else {
        alert("Please install MetaMask!");
    }
}
