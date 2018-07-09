const nodemailer = require('nodemailer');

// Generate SMTP service account from ethereal.email
nodemailer.createTestAccount((err, account) => {
    if (err) {
        console.error('Failed to create a testing account');
        console.error(err);
        return process.exit(1);
    }

    console.log('Credentials obtained, sending message...');

    // NB! Store the account object values somewhere if you want
    // to re-use the same account for future mail deliveries

    // Create a SMTP transporter object
    var transporter = nodemailer.createTransport({
        host: 'mail.gmx.com',
        port: 587,
        tls: {
            ciphers:'SSLv3',
            rejectUnauthorized: false
        },
        debug:true,
            auth: {
            user: 'testing.service123@gmx.com',
            pass: 'service123'
        }
    });

    // Message object
    let message = {
        from:'testing.service123@gmx.com',
            // Comma separated list of recipients
            // to: user.email,
        to: 'maringegem@gmail.com',

        // Subject of the message

        // Subject of the message
        subject: 'Nodemailer is unicode friendly ✔',

        // plaintext body
        text: 'Hello this is text!',

        // HTML body
        html:
            '<p><b>Hello</b> to myself <img src="cid:note@example.com"/></p>' +
            '<p>Here\'s a nyan cat for you as an embedded attachment:<br/></p>',

        // An array of attachments
        attachments: [
            // String attachment
            {
                filename: 'notes.txt',
                content: 'Some notes about this e-mail',
                contentType: 'text/plain' // optional, would be detected from the filename
            }
        ]
    };

    transporter.sendMail(message, (error, info) => {
        if (error) {
            console.log('Error occurred');
            console.log(error.message);
            return process.exit(1);
        }

        console.log('Message sent successfully!');
        console.log(nodemailer.getTestMessageUrl(info));

        // only needed when using pooled connections
        transporter.close();
    });
});
