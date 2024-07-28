// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC721, Ownable {
    string public myTokenURI = "https://ipfs.io/ipfs/QmPYKeyoe4cTSbdP4J7XkV7XuM96YkgNsCaMzBLHGrpNdW";
    constructor(address initialOwner)
        ERC721("ZK Passport NFT", "ZKNFT")
    {}

    function safeMint(address to, uint256 tokenId) public {
        _safeMint(to, tokenId);
    }
    
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721)
        returns (string memory)
    {
        return myTokenURI;
    }
}
