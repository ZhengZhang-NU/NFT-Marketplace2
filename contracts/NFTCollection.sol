// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTCollection is ERC721, Ownable {
    uint256 public nextTokenId;
    string public _baseTokenURI;

    constructor(string memory name, string memory symbol, string memory baseTokenURI) ERC721(name, symbol) Ownable(msg.sender) {
        _baseTokenURI = baseTokenURI;
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }

    function mintTo(address recipient) external onlyOwner {
        uint256 tokenId = nextTokenId;
        nextTokenId++;
        _mint(recipient, tokenId);
    }
}
