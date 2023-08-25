import transport from "../../config/nodemailer.js";

const otpEmail = ({email, otp}) => {

    transport.sendMail({
        from: "545hamza@gmail.com",
        to: email, //the person logging in

        subject:"OTP",
        html: `<h1>Dear User, your OTP is: ${otp}</h1>`
    },
    (error,res)=>{
        if(error) console.log(error);
        else console.log(res, "I am the response");
    }
    )

}

export default otpEmail;