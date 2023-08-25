import nodemailer from "nodemailer";

let transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "dddf20f04f0347",
      pass: "ca8788a4179643"
    }
  });

  export default transport; 