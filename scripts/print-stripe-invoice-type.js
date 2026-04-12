const Stripe = require('stripe');
const stripe = new Stripe('sk_test_xxx');
console.log(Object.keys(stripe.invoices.create));

