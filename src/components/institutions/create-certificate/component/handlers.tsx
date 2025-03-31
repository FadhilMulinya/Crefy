import axios from "axios";


const FetchImageIpfsFromJson = async(ipfsCid: string) => {
    if (!ipfsCid.startsWith("ipfs://")) {
        throw new Error("Invalid IPFS CID format");
    }
    ipfsCid = ipfsCid.split("ipfs://")[1]
    console.log("fetch image from cid: ", ipfsCid)
    const response = await FetchFromIPFS(ipfsCid)
    console.log(response)
    return response
};

const FetchFromIPFS = async (ipfsUrl: string) => {
    console.log("fetch from ipfs: ", ipfsUrl)
    try{
        const response = await axios.get(`/api/files?ipfsUrl=${ipfsUrl}`)
        if (response.status === 200) {
            console.log("fetch from ipfs success: ", response.data.imageCid)
            const imageCid = `https://gateway.pinata.cloud/ipfs/${response.data.imageCid.split("ipfs://")[1]}`
            return imageCid;
        } else {
            console.error("Error fetching from IPFS: ", response)
            return null
        }
    } catch (error) {
        console.error("Error fetching from IPFS: ", error)
        return null
    }
}


export { FetchImageIpfsFromJson, FetchFromIPFS }