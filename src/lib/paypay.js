import PAYPAY from '@paypayopa/paypayopa-sdk-node';

PAYPAY.Configure({
  env: 'STAGING', // ← Sandbox は STAGING
  clientId: process.env.PAYPAY_API_KEY,
  clientSecret: process.env.PAYPAY_API_SECRET,
  merchantId: process.env.PAYPAY_MERCHANT_ID, // 任意
});

export default PAYPAY;
