const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config({path: `.env.${process.env.NODE_ENV}`})

const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.NODE_EMAIL,
        pass: process.env.NODE_PASSWORD,
    },
});

async function sendVerificationEmail(newUser) {
    const token = newUser.verification_token;
    const url = `http://${process.env.VPS_SERVER}:${process.env.PORT_SERVER}/v1/api/verify-email?token=${token}`;
    const mailOptions = {
        from: "'Debugging Demon'<no-reply@gmail.com>",
        to: newUser.email,
        subject: 'Verify your email address',
        html: `Please click this link to verify your email address: <a href="${url}">${url}</a>`,
    };
    const info = await transport.sendMail(
        mailOptions
    );
    console.log(`Verification email sent to ${newUser.email}: ${info.messageId}`);
}

async function checkoutOrder(findUser, createOrder) {
    const mailOptions = {
        from: "'Debugging Demon'<no-reply@gmail.com>",
        to: findUser.email,
        subject: 'Checkout Order',
        html: `Halo ${findUser.fullname}, Selesaikan pesananmu :<br> 
        Total Bayar : ${createOrder.total_price}`,
    };
    const info = await transport.sendMail(
        mailOptions
    );
    console.log(`Verification email sent to ${findUser.email}: ${info.messageId}`);
}

async function payOrder(findUser, createOrder) {
    const mailOptions = {
        from: "'Debugging Demon'<no-reply@gmail.com>",
        to: findUser.email,
        subject: 'Pembayaran Terverifikasi',
        html: `Halo ${findUser.fullname}, Pembayaran telah terverifikasi :<br> 
        Total Bayar : ${createOrder.total_price} <br>
        terima kasih telah berbelanja di Bingleshop.`,
    };
    const info = await transport.sendMail(
        mailOptions
    );
}

async function cancelOrder(findUser) {
    const mailOptions = {
        from: "'Debugging Demon'<no-reply@gmail.com>",
        to: findUser.email,
        subject: 'Pesanan dibatalkan',
        html: `Halo ${findUser.fullname}, Pesananmu telah dibatalkan.`,
    };
    const info = await transport.sendMail(
        mailOptions
    );
}

module.exports = {
    sendVerificationEmail,
    checkoutOrder,
    payOrder,
    cancelOrder
};