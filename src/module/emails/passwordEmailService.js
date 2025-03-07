const nodemailer = require('nodemailer');
const resetPasswordTemplate = require('./resetPasswordTemplate');
const resetPasswordSuccessTemplate = require('./resetPasswordSuccessTemplate');

// Create a transporter using your SMTP service provider
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use Gmail SMTP or configure another service like SendGrid
  auth: {
    user: 'infokashifali786@gmail.com',  // Your email address
    pass: 'cuzvsgeevkwsltcz',  // Your email password or an app-specific password
  },
});

// Send the reset password email with the HTML template
const sendForgotPasswordEmail = async (email, resetPasswordToken) => {
  const resetPasswordUrl = `https://www.mhbstore.com/reset-password?token=${resetPasswordToken}`;
  const mailOptions = {
    from: 'infokashifali786@gmail.com',
    to: email,
    subject: 'Password Reset Request',
    html: resetPasswordTemplate(resetPasswordToken),  // Use the HTML template
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Password reset email sent successfully");
  } catch (error) {
    console.error("Error sending forgot password email:", error);
    throw new Error("Failed to send reset password email");
  }
};

// Send the reset password confirmation email with the success template
const sendResetPasswordConfirmationEmail = async (email) => {
  const mailOptions = {
    from: 'infokashifali786@gmail.com',
    to: email,
    subject: 'Password Reset Successfully',
    html: resetPasswordSuccessTemplate(),  // Use the success HTML template
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Reset password confirmation email sent successfully");
  } catch (error) {
    console.error("Error sending reset password confirmation email:", error);
    throw new Error("Failed to send reset password confirmation email");
  }
};

module.exports = {
  sendForgotPasswordEmail,
  sendResetPasswordConfirmationEmail,
};
