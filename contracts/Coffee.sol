// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Coffee is ERC20 {
  constructor() ERC20("ERC20 Token Sample1", "Sample 1") {
      _mint(msg.sender, 100_000_000_000 * 10**18 );
  }

  function someTestFn() public view returns (uint8) {
      return 10;
  }
}