pragma solidity ^0.5.0;

import "./ERC721.sol";

contract StarNotary is ERC721 {

    string public constant name = "Star token";
    string public constant symbol = "STO";

    mapping(uint256 => string) public tokenIdToStarInfo;
    mapping(uint256 => uint256) public starsForSale;

    function createStar(string memory _name, uint256 _tokenId) public {

        tokenIdToStarInfo[_tokenId] = _name;

        _mint(msg.sender, _tokenId);
    }


    function putStarUpForSale(uint256 _tokenId, uint256 _price) public {
        require(this.ownerOf(_tokenId) == msg.sender, "You have to be the owner of the Start to put it on sale.");

        starsForSale[_tokenId] = _price;
    }

    function buyStar(uint256 _tokenId) public payable returns (bool) {
        uint256 starCost = starsForSale[_tokenId];
        require(starCost > 0, "This star is not for sale.");

        address payable starOwner = address(uint160(this.ownerOf(_tokenId)));
        require(msg.value >= starCost, "Not enough funds to buy this star.");

        starsForSale[_tokenId] = 0;
        _transferFrom(starOwner, msg.sender, _tokenId);
        require(_checkOnERC721Received(starOwner, msg.sender, _tokenId, ""));
        starOwner.transfer(starCost);
        if (msg.value > starCost) {
            msg.sender.transfer(msg.value - starCost);
        }

        return true;
    }

// Add a function called exchangeStars, so 2 users can exchange their star tokens...
//Do not worry about the price, just write code to exchange stars between users.

//

// Write a function to Transfer a Star. The function should transfer a star from the address of the caller.
// The function should accept 2 arguments, the address to transfer the star to, and the token ID of the star.
//

}