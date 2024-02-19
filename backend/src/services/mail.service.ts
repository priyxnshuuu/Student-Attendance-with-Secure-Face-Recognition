import nodemailer from "nodemailer";
import { Config } from "../config/Config";

const config = new Config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: config.environmentVariable.senderEmail,
    pass: config.environmentVariable.senderPassword,
  },
});

interface TSendMail {
  to: string;
  subject: string;
  html: string;
}
export const SendMail = async (data: TSendMail) => {
  transporter.sendMail(data, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent: " + info.response);
      return true;
    }
  } 
  );
  
};
