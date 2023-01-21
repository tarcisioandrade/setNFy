require("dotenv").config();
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (receiver, source, subject, link) => {
  try {
    const data = {
      to: receiver,
      from: source,
      subject,
      templateId: "d-3768735573d24b6aa32ce6999675add2",
      dynamic_template_data: {
        subject,
        link,
      },
    };
    return sgMail.send(data);
  } catch (error) {
    return new Error(error);
  }
};

module.exports = sendEmail;
