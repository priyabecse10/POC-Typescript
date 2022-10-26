import nodemailer from 'nodemailer';
import nodemailerSendgrid from 'nodemailer-sendgrid';
import { UserInstance } from '../types';

const options = {
    apiKey: process.env.SENDGRID_API_KEY||""
  };
const emailClient = nodemailer.createTransport(nodemailerSendgrid(options)

);

const bookCreated = (user: UserInstance) => {
    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to: user.email,
      subject: 'Book created',
      html: '<p>The book hasbeen created in the database</p>'
    };
    emailClient.sendMail(mailOptions);
  };

  const bookDeleted = (user: UserInstance) => {
    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to: user.email,
      subject: 'Book Deleted',
      html: `Book deleted from the database successfully`
    };
    emailClient.sendMail(mailOptions);
  };
  export {
    bookCreated,
    bookDeleted
  };