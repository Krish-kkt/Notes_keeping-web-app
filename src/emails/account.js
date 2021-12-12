const sgMail= require('@sendgrid/mail');

const sendgridApiKey =process.env.SENDGRID_API_KEY ;

sgMail.setApiKey(sendgridApiKey);

const sendVerificationEmail = async (email, name, link)=>{
    return (sgMail.send({
        to: email,
        from: 'krish.20.sinha@gmail.com',
        subject: 'To-do-list email verification',
        text: `Welcome ${name} to app. Please click the link to verify ${link} `
    }))
};

module.exports={
    sendVerificationEmail,
}

