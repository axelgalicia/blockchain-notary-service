
const StarNotary = artifacts.require('StarNotary')

let instance;
let accounts;

contract('StarNotary', async (accs) => {
    accounts = accs;

    it('can Create a Star', async () => {
        instance = await StarNotary.deployed();
        let tokenId = 1;
        await instance.createStar('Awesome Star!', tokenId, { from: accounts[0] })
        assert.equal(await instance.tokenIdToStarInfo.call(tokenId), 'Awesome Star!')
    });

    it('lets user1 put up their star for sale', async () => {
        instance = await StarNotary.deployed();
        let user1 = accounts[1]
        let starId = 2;
        let starPrice = web3.utils.toWei(".01".toString(), "ether")
        await instance.createStar('awesome star', starId, { from: user1 })
        await instance.putStarUpForSale(starId, starPrice, { from: user1 })
        assert.equal(await instance.starsForSale.call(starId), starPrice)
    });

    it('lets user1 get the funds after the sale', async () => {
        instance = await StarNotary.deployed();
        let user1 = accounts[1]
        let user2 = accounts[2]
        let starId = 3
        let starPrice = web3.utils.toWei(".01".toString(), "ether");
        await instance.createStar('awesome star', starId, { from: user1 });
        await instance.putStarUpForSale(starId, starPrice, { from: user1 });
        let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user1);
        balanceOfUser1BeforeTransaction = web3.utils.toBN(balanceOfUser1BeforeTransaction);
        const tx = await instance.buyStar(starId, { from: user2, value: starPrice });
        let balanceOfUser1AfterTransaction = await web3.eth.getBalance(user1);
        balanceOfUser1AfterTransaction = web3.utils.toBN(balanceOfUser1AfterTransaction);
        let starPriceBN = web3.utils.toBN(starPrice);
        let balanceBeforeSellingPlusPrice = balanceOfUser1BeforeTransaction.add(starPriceBN).toString();
        let balanceAfterSelling = balanceOfUser1AfterTransaction.toString();
        assert.equal(balanceBeforeSellingPlusPrice, balanceAfterSelling);
    });

    it('lets user2 buy a star, if it is put up for sale', async () => {
        instance = await StarNotary.deployed();
        let user1 = accounts[1]
        let user2 = accounts[2]
        let starId = 4
        let starPrice = web3.utils.toWei(".01".toString(), "ether")
        await instance.createStar('awesome star', starId, { from: user1 })
        await instance.putStarUpForSale(starId, starPrice, { from: user1 })
        let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user2)
        await instance.buyStar(starId, { from: user2, value: starPrice });
        assert.equal(await instance.ownerOf.call(starId), user2);
    });

    it('lets user2 buy a star and decreases its balance in ether', async () => {
        instance = await StarNotary.deployed();
        let user1 = accounts[1];
        let user2 = accounts[2];
        let starId = 5
        let starPrice = web3.utils.toWei(".01".toString(), "ether")
        await instance.createStar('awesome star', starId, { from: user1 })
        await instance.putStarUpForSale(starId, starPrice, { from: user1 })
        const balanceOfUser2BeforeTransaction = web3.utils.toBN(await web3.eth.getBalance(user2));
        await instance.buyStar(starId, { from: user2, value: starPrice, gasPrice: 0 })
        const balanceAfterUser2BuysStar = web3.utils.toBN(await web3.eth.getBalance(user2));
        let starPriceBN = web3.utils.toBN(starPrice);
        assert.equal(balanceOfUser2BeforeTransaction.sub(balanceAfterUser2BuysStar).toString(), starPriceBN.toString());
    });

});


