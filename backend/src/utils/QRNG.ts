import Web3 from "web3";

const providerUrl = "https://replicator-01.pegasus.lightlink.io/rpc/v1";
const contractAddress = "0xFaCF1FDf1eE5D0e03AEFdB2511ced41d3F713446";

const contractABI = [
  {
    constant: true,
    inputs: [],
    name: "airnode",
    outputs: [
      {
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "endpointIdUint256",
    outputs: [
      {
        name: "",
        type: "bytes32",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "sponsorWallet",
    outputs: [
      {
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "qrngUint256",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "",
        type: "bytes32",
      },
    ],
    name: "expectingRequestWithIdToBeFullfilled",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "requestId",
        type: "bytes32",
      },
    ],
    name: "RequestUint256",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "requestId",
        type: "bytes32",
      },
      {
        indexed: false,
        name: "response",
        type: "uint256",
      },
    ],
    name: "ReceivedUint256",
    type: "event",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_airnode",
        type: "address",
      },
      {
        name: "_endpointIdUint256",
        type: "bytes32",
      },
      {
        name: "_sponsorWallet",
        type: "address",
      },
    ],
    name: "setRequestParameters",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [],
    name: "makeRequestUint256",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "requestId",
        type: "bytes32",
      },
      {
        name: "data",
        type: "bytes",
      },
    ],
    name: "fulfillUint256",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

const readPublicVariable = async (): Promise<number> => {
  const web3 = new Web3(providerUrl);

  // Create a contract instance
  const contract = new web3.eth.Contract(contractABI, contractAddress);

  // Call the contract function to read the public variable
  if (contract.methods.qrngUint256 === undefined) {
    throw new Error("qrngUint256 is undefined");
  }

  const method = contract.methods.qrngUint256();
  const response = await method.call();

  return Math.round(Number(response)/10e65);
};

export const getRandomNumber = async () => {
  return await readPublicVariable();
};
