import transport from "../../config/nodemailer.js";

const loginEmail = ({name, email}) => {
    transport.sendMail({
        from: "545hamza@gmail.com",
        to: email, //the person logging in

        subject:"Login",
        html: `<h1>We are sending this test email to ${name}</h1>`
    },
    (error,res)=>{
        if(error) console.log(error);
        else console.log(res, "I am the response");
    }
    )

}

export default loginEmail;