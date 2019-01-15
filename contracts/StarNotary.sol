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

    function lookUptokenIdToStarInfo(uint256 _tokenId) public view returns(string memory) {
        return tokenIdToStarInfo[_tokenId];
    }

    function exchangeStars(address user1, uint256 _tokenId1, address user2, uint256 _tokenId2) public returns (bool) {
        _transferFrom(user1, user2, _tokenId1);
        _transferFrom(user2, user1, _tokenId2);
        return true;
    } 

    function transfer(address _to, uint256 _tokenId) public returns (bool) {
        safeTransferFrom(msg.sender, _to, _tokenId, "");
        return true;
    } 

}