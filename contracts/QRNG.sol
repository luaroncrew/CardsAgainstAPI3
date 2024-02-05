// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@api3/airnode-protocol/contracts/rrp/requesters/RrpRequesterV0.sol";


contract QRNG is RrpRequesterV0 {

    address public airnode;
    bytes32 public endpointIdUint256;
    address public sponsorWallet;

    uint256 public qrngUint256;

    mapping (bytes32 => bool) public expectingRequestWithIdToBeFullfilled;

    event RequestUint256(bytes32 indexed requestId);
    event ReceivedUint256(bytes32 indexed requestId, uint256 response);

    constructor(address _airnodeRrp) RrpRequesterV0(_airnodeRrp){}

    function setRequestParameters(address _airnode, bytes32 _endpointIdUint256, address _sponsorWallet) external {
        airnode = _airnode;
        endpointIdUint256 = _endpointIdUint256;
        sponsorWallet = _sponsorWallet;
    }

    function makeRequestUint256() external {
        bytes32 requestId = airnodeRrp.makeFullRequest(
            airnode,
            endpointIdUint256,
            address(this),
            sponsorWallet,
            address(this),
            this.fulfillUint256.selector,
            ""
        );
        expectingRequestWithIdToBeFullfilled[requestId] = true;
        emit RequestUint256(requestId);
    }

    function fulfillUint256(bytes32 requestId, bytes calldata data) external onlyAirnodeRrp {
        require(expectingRequestWithIdToBeFullfilled[requestId], "RequestId unknown");
        expectingRequestWithIdToBeFullfilled[requestId] = false;
        qrngUint256 = abi.decode(data, (uint256));
        emit ReceivedUint256(requestId, qrngUint256);
    }
}