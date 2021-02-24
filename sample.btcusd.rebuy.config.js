const apiKeys = require("./api.keys");
module.exports = {
  apps: [
    {
      name: "cpbb_btcusd",
      script: ".",
      watch: ["*.js", "coinbase", "lib"],
      env: {
        NODE_ENV: "production",
        CPBB_APIPASS: apiKeys.CPBB_APIPASS,
        CPBB_APIKEY: apiKeys.CPBB_APIKEY,
        CPBB_APISEC: apiKeys.CPBB_APISEC,
        // VERBOSE: true,
        CPBB_FREQ: "28 */2 * * *",
        CPBB_TICKER: "BTC",
        CPBB_CURRENCY: "USD",
        CPBB_VOL: 10,
        CPBB_APY: 10, // sell if over 10% APY

        // MAKER REBUY CONFIG
        // The below section will create the following maker orders after a sell
        // .0001 BTC @ price -4% (as long as bitcoin is under $100K)
        // .0001 BTC @ price -6% (but only if this doesn't bust the $10 max)
        // .0002 BTC @ price -8% (but only if this doesn't bust the $10 max)
        // .0002 BTC @ price -10% (but only if this doesn't bust the $10 max)
        // .0003 BTC @ price -12% (but only if this doesn't bust the $10 max)
        // etc...

        // maximum dollar value consumed by limit order placements
        CPBB_REBUY_MAX: 10,
        // minimum order is in BTC (.0001, which is $5 at $50K)
        // rebuy logic will place up to  orders at this size until CPBB_REBUY_MAX is reached
        CPBB_REBUY_SIZE: ".0001,.0001,.0002,.0002,.0003,.0003,.0004,.0004,.0005,.0005",
        // rebuy at these percentage drop targets
        // note: you have to define at least the number of points in CPBB_REBUY_SIZE
        CPBB_REBUY_AT: "-4,-6,-8,-10,-12,-14,-16,-20,-50,-80",
      },
    },
  ],
};