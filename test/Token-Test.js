var Token = artifacts.require("Token");

contract("Token", function (accounts) {
  it("Total supply set at deployment", function () {
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
      });
  });
});
