//init
const nodemailer = require("nodemailer");
var readlineSync = require('readline-sync');
const fs = require('fs-extra');

let scama = fs.readFileSync("./put-ur-scama/scama.html");
let smtp = fs.readFileSync("./configuration.json")
    smtp = fs.JSON.parse(smtp);
let victim = fs.readFileSync("./victims.txt")
    victim = victim.split(" ");
    
console.log(victim); 

//infos
var version = "2";
console.log("Kenoor - SpamMailer " + version);

// sending script
async function main() {
    let transport = nodemailer.createTransport({
      host: smtp.host,
      port: 587,
      secure: false,
      auth: {
        user: smtp.user,
        pass: smtp.password,
      },
    });
    for(i=0; i < victim.length; i++){
        setTimeout(function(){
            let info = await transport.sendMail({
      from: smtp.sender,
      to: victim["i"],
      subject: smtp.subject,
      text: smtp.description,
      html: scama,
            });
        }, smtp.delay)
    }
    console.log("Preview : %s", nodemailer.getTestMessageUrl(info));
  }
  
  main().catch(console.error);