const nodemailer = require('nodemailer');

exports.send_Email = async (options) => {



    // var transport = nodemailer.createTransport({
    //     host: "smtp.mailtrap.io",
    //     port: 2525,
    //     auth: {
    //       user: "3ad7a4708f024e",
    //       pass: "6be4786683af01"
    //     }
    //   }); 

    const transport = nodemailer.createTransport({
        
        host :  process.env.SMTP_HOST,
        port : process.env.SMTP_PORT,
        auth : {
            user : process.env.SMTP_EMAIL,
            pass : process.env.SMTP_PASSWORD,
        },
        service :  process.env.SMTP_SERVICE,
    });

    const mailOptions = {
        from : process.env.SMTP_EMAIL,
        to : options.email,
        subject : options.subject,
        text : options.message
    }

    await transport.sendMail(mailOptions);

}