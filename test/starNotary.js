const StarNotary = artifacts.require('StarNotary')

let instance;
let accounts;

contract('StarNotary', async (accs) => {
    accounts = accs;

    it('can Create a Star', async () => {
        instance = await StarNotary.deployed();
        const tokenId = 1;
        await instance.createStar('Awesome Star!', tokenId, { from: accounts[0] })
        assert.equal(await instance.tokenIdToStarInfo.call(tokenId), 'Awesome Star!')
    });

    it('lets user1 put up their star for sale', async () => {
        instance = await StarNotary.deployed();
        const user1 = accounts[1]
        const starId = 2;
        let starPrice = web3.utils.toWei(".01".toString(), "ether")
        await instance.createStar('awesome star', starId, { from: user1 })
        await instance.putStarUpForSale(starId, starPrice, { from: user1 })
        assert.equal(await instance.starsForSale.call(starId), starPrice)
    });

    it('lets user1 get the funds after the sale', async () => {
        instance = await StarNotary.deployed();
        const user1 = accounts[1]
        const user2 = accounts[2]
        const starId = 3;
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
        const user1 = accounts[1]
        const user2 = accounts[2]
        const starId = 4
        let starPrice = web3.utils.toWei(".01".toString(), "ether")
        await instance.createStar('awesome star', starId, { from: user1 })
        await instance.putStarUpForSale(starId, starPrice, { from: user1 })
        let balanceOfUser1BeforeTransaction = await web3.eth.getBalance(user2)
        await instance.buyStar(starId, { from: user2, value: starPrice });
        assert.equal(await instance.ownerOf.call(starId), user2);
    });

    it('lets user2 buy a star and decreases its balance in ether', async () => {
        instance = await StarNotary.deployed();
        const user1 = accounts[1];
        const user2 = accounts[2];
        const starId = 5
        let starPrice = web3.utils.toWei(".01".toString(), "ether")
        await instance.createStar('awesome star', starId, { from: user1 })
        await instance.putStarUpForSale(starId, starPrice, { from: user1 })
        const balanceOfUser2BeforeTransaction = web3.utils.toBN(await web3.eth.getBalance(user2));
        await instance.buyStar(starId, { from: user2, value: starPrice, gasPrice: 0 })
        const balanceAfterUser2BuysStar = web3.utils.toBN(await web3.eth.getBalance(user2));
        let starPriceBN = web3.utils.toBN(starPrice);
        assert.equal(balanceOfUser2BeforeTransaction.sub(balanceAfterUser2BuysStar).toString(), starPriceBN.toString());
    });

    it('Verify star lookup works', async () => {
        instance = await StarNotary.deployed();
        const user2 = accounts[2];
        const starId = 7;
        const starName = 'Star 12345';
        await instance.createStar(starName, starId, { from: user2 });
        const starInfo = await instance.lookUptokenIdToStarInfo(starId);
        assert.equal(starInfo, starName);

    });

    it('Verify token name and symbol are correct', async () => {
        instance = await StarNotary.deployed();
        const tokenName = await instance.name.call();
        const tokenSymbol = await instance.symbol.call();
        assert.equal(tokenName, 'Star token');
        assert.equal(tokenSymbol, 'STO');
    });

    it('Verify 2 users can exchange their stars', async () => {
        instance = await StarNotary.deployed();
        const user1 = accounts[1];
        const starId1 = 10;
        await instance.createStar('My Star 1', starId1, { from: user1 });
        const user2 = accounts[2];
        const starId2 = 20;
        await instance.createStar('My Star 2', starId2, { from: user2 });
        await instance.exchangeStars(user1, starId1, user2, starId2);
        const ownerToken1 = await instance.ownerOf(starId1);
        const ownerToken2 = await instance.ownerOf(starId2);
        assert.equal(ownerToken1, user2);
        assert.equal(ownerToken2, user1);
    });

    it('Verify a user can transfer a star to another user ', async () => {
        instance = await StarNotary.deployed();
        const user1 = accounts[1];
        const user2 = accounts[2];
        const starId1 = 30;
        await instance.createStar('My Star 30', starId1, { from: user1 });
        await instance.transferStar(user2, starId1, { from: user1 });
        const ownerToken1 = await instance.ownerOf(starId1);
        assert.equal(ownerToken1, user2);

    });

});


