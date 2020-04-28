const sgMail = require('@sendgrid/mail');
sgMail.setApiKey("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");
const msg = {
    to: 'alexelite979@gmail.com',
    from: 'BuySomeFood@bsf.com',
    subject: 'Sending with Twilio SendGrid is Fun',
    text: 'fraiere',
    html: '<strong>fraiere</strong>',
};
//ES6
sgMail
    .send(msg)
    .then(() => {
    }, error => {
        console.error(error);

        if (error.response) {
            console.error(error.response.body)
        }
    });
//ES8
// (async () => {
//     try {
//         await sgMail.send(msg);
//     } catch (error) {
//         console.error(error);
//
//         if (error.response) {
//             console.error(error.response.body)
//         }
//     }
// })();