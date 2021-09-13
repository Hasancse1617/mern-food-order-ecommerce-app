require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports.payment = async(req,res) =>{
    try {
        const amount = req.params.amount * 100;
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "USD",
            payment_method_types: ["card"],
            metadata:{
                name: 'Hasan'
            }
        })
        const clientSecret = paymentIntent.client_secret;
        res.status(200).json({clientSecret});
    } catch (error) {
        
    }
}