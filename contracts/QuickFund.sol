// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract QuickCrowdFund {

    struct Campaign {
        // Account that initiated campaign
        address creator;
        // Amount of Eth in wei to  raise
        uint256 goal;
        // Amount of Eth in wei raised so far
        uint256 amountPledged;
        // Timestamp when campaign was created
        uint256 createdAt;
        // Timestamp when campaign should end
        uint256 endAt;
    }

    mapping(unit256 => Campaign) public campaigns;

    function start_campaign(uint25 _id) public {}
}
