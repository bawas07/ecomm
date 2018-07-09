'use strict';

const nodemailer = require('nodemailer');

const emailBody = function(cart, product, total){
    const body = []
    const beginning = `<p><b>Hello there!</b> </p>
    <p>If you seeing this email that means you have some item in your cart that contain:</p>
    <table class="table">
    <thead>
      <tr>
        <th colspan="2">Item</th>
        <th>Price</th>
        <th>Discount</th>
        <th>New Price</th>
      </tr>
    </thead>
    <tbody>`
    let middle = ''
    body.push(beginning)
    cart.item.forEach(function(row){ 
        product.forEach(function(prod){ 
            if (row.product.toString() == prod._id.toString()){ 
                middle = `<tr>
                    <td><img src= ${prod.picture}" alt="${prod.name}" height="50" width="50" class="img-responsive center-block"></td>
                    <td>${prod.name}</td>
                    <td>${row.price}</td>
                    <td>${row.discount}</td>
                    <td>${row.price*((100-row.discount)/100)}</td>
                </tr>`
                body.push(middle)    
            } 
        }) 
    })
    const ending =`<tr>
            <td colspan="4" align="right"><font size="4"><b>Total&nbsp;&nbsp;&nbsp;&nbsp;</b></font>(round)</td>
            <td><font size="4">${Math.floor(total)}</font></td>
        </tr>
        </tbody>
        </table><br><br>
        <Strong><font size="10">Please pay!!!</font></strong>`
    body.push(ending) 
    return body.join('').split('\n').join('<br>')  
}

exports.sendreminder = function(cart, product, total, user){
    console.log('masuk')
    const body = emailBody(cart, product, total)
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
            to: user.email,
            // to: 'maringegem@gmail.com',
    
            // Subject of the message
            subject: 'Hey, there is some item in your cart',
    
            // plaintext body
            // text: 'Hello to myself!',
    
            // HTML body
            html:body,
    
            // An array of attachments
            attachments: [
                // String attachment
                {
                    filename: 'notes.txt',
                    content: 'Some notes about this e-mail',
                    contentType: 'text/plain' // optional, would be detected from the filename
                },
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
}
// Generate SMTP service account from ethereal.email
