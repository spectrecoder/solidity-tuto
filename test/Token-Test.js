var Token = artifacts.require("Token");

contract("Token", function (accounts) {
  var initialTokens;

  it("Initialize contract with correct values", function () {
    return Token.deployed()
      .then(function (initial) {
        initialTokens = initial;
        return initialTokens.name();
      })
      .then(function (name) {
        assert.equal(name, "Penny Token", "has correct name");
        return initialTokens.symbol();
      })
      .then(function (symbol) {
        assert.equal(symbol, "PENT", "has correct symbol");
        return initialTokens.standard();
      })
      .then(function (standard) {
        assert.equal(standard, "Penny Token v1.0", "has the correct standard");
      });
  });
  it("Initial supply set at deployment", function () {
    return Token.deployed()
      .then(function (initial) {
        initialTokens = initial;
        return initialTokens.totalSupply();
      })
      .then(function (totalSupply) {
        assert.equal(
          totalSupply.toNumber(),
          1000000,
          "Supply set at 1,000,000"
        );
        return initialTokens.balanceOf(accounts[0]);
      })
      .then(function (adminBalance) {
        assert.equal(
          adminBalance.toNumber(),
          1000000,
          "Initial supply allocated to the admin account"
        );
      });
  });

  it("transfer token ownership", function () {
    return Token.deployed()
      .then(function (initial) {
        initialTokens = initial;
        return initialTokens.transfer.call(accounts[1], 99999999999);
      })
      .then(assert.fail)
      .catch(function (error) {
        assert(
          error.message.indexOf("revert") >= 0,
          "message must contain revert"
        );
        return initialTokens.transfer.call(accounts[1], 250000, {
          from: accounts[0],
        });
      })
      .then(function (success) {
        assert.equal(success, true, "returns true");
        return initialTokens.transfer(accounts[1], 250000, {
          from: accounts[0],
        });
      })
      .then(function (receipt) {
        assert.equal(receipt.logs.length, 1, "one event triggered");
        assert.equal(receipt.logs[0].event, 1, "one event triggered");
        assert.equal(
          receipt.logs[0].args._from,
          accounts[0],
          "one event triggered"
        );
        assert.equal(
          receipt.logs[0].args._to,
          accounts[1],
          "one event triggered"
        );
        assert.equal(
          receipt.logs[0].args._value,
          250000,
          1,
          "one event triggered"
        );
        return initialTokens.balanceOf(accounts[1]);
      })
      .then(function (balance) {
        assert.equal(balance.toNumber(), 250000, "Add to recieving account");
        return initialTokens.balanceOf(accounts[0]);
      })
      .then(function (balance) {
        assert.equal(balance.toNumber(), 750000, "deducts the amount");
      });
  });
});
