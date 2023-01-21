import * as InboxSDK from '@inboxsdk/core';
import { Configuration, OpenAIApi } from "openai";
import "gmail-js";



const {config} = require('./config.js');
const GmailFactory = require("gmail-js");
const gmail = new GmailFactory.Gmail();

function RemoveHTMLTags(html) {
  // var regX = /(<([^>]+)>)/ig;
  // var text =  html.replace(regX, " ").replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&');
  // text = text.replace(/\s+/g,' ').trim();
  // return text;
  html = html.replace(/<br>/g, "$br$");
  html = html.replace(/(?:\r\n|\r|\n)/g, '$br$');
  var tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  html = tmp.textContent || tmp.innerText;
  html = html.replace(/\$br\$/g, '\n');
  html = html.replace(/\n\s*\n\s*\n/g, '\n\n');
  return html.split(/\r?\n/).map(row => row.trim().split(/\s+/).join(' ')).join('\n').trim();
}

async function generateText(msg) {
  

  
  // Make the API request
  const response = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${config.API_KEY}`,
      },
      body: JSON.stringify({
        prompt: msg,
        temperature: 0.5,
        max_tokens:2000,
        model: 'text-davinci-003'
      })
    });
    // .then(response => response.json())
    // .then(data => console.log(data))
    // .catch(error => console.error(error));
    const json = await response.json();
    console.log(json.choices[0].text);
    // Return the generated text
    return json.choices[0].text;

}
async function generateSummary(msg) {
  

  // Make the API request
  const response = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${config.API_KEY}`,
      },
      body: JSON.stringify({
        prompt: msg + "/nGenerate a summary of the above email:",
        temperature: 0.5,
        max_tokens:2000,
        model: 'text-davinci-003'
      })
    });
    // .then(response => response.json())
    // .then(data => console.log(data))
    // .catch(error => console.error(error));
    const json = await response.json();
    console.log(json.choices[0].text);
    // Return the generated text
    return json.choices[0].text;

}



// Create a canvas element
var canvas = document.createElement('canvas');
canvas.width = 30;
canvas.height = 30;

// Create an image element
var img = new Image();

// Set the source of the image
img.src = 'F.png';

// Draw the image on the canvas
var ctx = canvas.getContext('2d');
img.onload = function() {
  ctx.drawImage(img, 0, 0, 30, 30);
  console.log(canvas.toDataURL());
}



InboxSDK.load(2, 'sdk_Filoschat_76494892c2', { timeout: 30000 }).then((sdk) => {
  sdk.Compose.registerComposeViewHandler((composeView) => {
    
    composeView.addButton({
      title: "Generate Email Response",
      iconUrl:
        "https://filoschat.com/F.png",
      onClick: function(event){

        var url = window.location.href;
        var newEmail;
        if(url.indexOf("compose") > -1){
          newEmail = true;
          showModal("", composeView, newEmail)
        }else{
          try{
            var email_id = gmail.new.get.email_id();
            var gmail_dom = gmail.dom.email(email_id);
            var body = gmail_dom.body();

            // Create a regular expression to match the last message
          }catch(e){
            console.log(e);
          }
  
          if(typeof body === 'undefined') {
            newEmail = true;
            showModal("", composeView, newEmail);
          }
          else {
            const bodyText = body.split("On");
            
            var new_bdy = RemoveHTMLTags(body);
            const lastMessageRegex = /(On.*<\S+@\S+>\swrote:|Le.*<\S+@\S+>\sa\sécrit\s:)/g;
            console.log(new_bdy)
            if ((new_bdy.match(lastMessageRegex)) == null) {
              newEmail = false;
              showModal(new_bdy, composeView, newEmail);


            }
            else {

            // Extract the last message
            const lastMessage = new_bdy.match(lastMessageRegex)[0];
            console.log(lastMessage)
            console.log(new_bdy.split(lastMessage))

            console.log(lastMessage);
            newEmail = false;
            showModal(new_bdy.split(lastMessage)[0], composeView,newEmail);
            }
          }
        }
      }
 

    });
  });
});

async function showModal(msg, composeView, newEmail) {
  console.log(msg)
  // create the modal element
  var modal = document.createElement("div");
  modal.style.position = "fixed";
  modal.style.top = "50%";
  modal.style.left = "50%";
  modal.style.transform = "translate(-50%, -50%)";
  modal.style.backgroundColor = "white";
  modal.style.padding = "20px";
  modal.style.boxShadow = "0 0 10px rgba(0,0,0,0.5)";

  modal.style.zIndex = "1000";
  modal.style.width = "600px";
  modal.style.height = "530px";
  modal.style.borderRadius = "20px";

  // create the backdrop element
  var backdrop = document.createElement("div");
  backdrop.style.position = "fixed";
  backdrop.style.top = "0";
  backdrop.style.left = "0";
  backdrop.style.width = "100%";
  backdrop.style.height = "100%";
  backdrop.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  backdrop.style.zIndex = "999";

  // add the modal and backdrop to the document
  document.body.appendChild(backdrop);
  

  // create the container element
  var container = document.createElement("div");
  //container.style.overflow = "auto";
  container.style.height = "auto";
  modal.appendChild(container);
  

  // create the title element
  var title = document.createElement("h2");
  title.textContent = "Filos";
  title.style.display = "block";
  title.style.fontSize = "20px"

  container.appendChild(title);


  // create the close button
  
  var closeButton = document.createElement("button");
  closeButton.innerHTML = "&times;";
  closeButton.style.position = "absolute";
  closeButton.style.top = "10px";
  closeButton.style.right = "10px";

  closeButton.style.fontSize = "24px";
  closeButton.style.color = "black";
  closeButton.style.float = "right";

  closeButton.style.display = "inline-block";
  closeButton.style.float = "right";
  closeButton.style.border = "none";
  
  closeButton.style.backgroundColor = "transparent"
  closeButton.style.cursor = "pointer";


  closeButton.addEventListener("mouseover", function() {
    closeButton.style.transform = "scale(1.05)";

  });
  closeButton.addEventListener("mouseout", function() {
    closeButton.style.transform = "scale(1)";

  });

  closeButton.addEventListener("click", function() {
    document.body.removeChild(modal);
    document.body.removeChild(backdrop);

  });
  container.appendChild(closeButton);

  // create the text element
  var context = document.createElement("p");
  context.textContent = "Previous Email:";
  context.style.fontSize = "15px"
  container.appendChild(context);
  
  // create the text input element
  var con_input = document.createElement("textarea");
  con_input.style.resize = "none";
  con_input.placeholder = "If you want to reply to an email, paste the email you want to respond to here. Otherwise, leave this field empty"; 
  con_input.style.fontSize = "15px"
  con_input.style.padding = "10px"
  


  // con_input.type = "text";
  con_input.style.borderImage = "linear-gradient(to right, #4169E1, #7B68EE) 1";
  con_input.style.width = "585px"
  con_input.style.height = "120px"

  con_input.style.border = "1px solid #4169E1";
  con_input.style.borderRadius = "20px";
  con_input.style.backgroundColor = "#f0f0f0";
  //con_input.style.placeholderColor = "lightgrey";
  con_input.style.lineHeight = "20px";
  con_input.value = msg;
  container.appendChild(con_input);

  // create the checkbox element
  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  // create the label element
  var label = document.createElement("label");
  label.textContent = "Show email summary";
  label.style.marginRight = "10px";
  label.style.fontSize = "15px"


  container.appendChild(label);
  container.appendChild(checkbox);

  checkbox.style.marginTop = "20px";
  checkbox.style.marginBottom = "20px";


  // store the summary and sum_input elements in variables
  var summary, num_sent, dropdown, to_hide;

  // create the number of sentences element
  var message = document.createElement("p");

  // create the text input element
  var sum_input = document.createElement("textarea");
  // sum_input.type = "textarea";
  sum_input.style.width = "585px"
  sum_input.style.resize = "none";
  sum_input.style.fontSize = "25px"


  sum_input.style.height = "50px"
  sum_input.style.border = "1px solid #4169E1";
  sum_input.style.borderRadius = "20px"
  sum_input.style.backgroundColor = "#f0f0f0";
  sum_input.style.padding = "10px"
  sum_input.readOnly = true;
  sum_input.disabled = true;
  sum_input.value = '.';
  var sum = 0;

  var dotCount = 0;
  var dotInterval = setInterval(function(){
      if(dotCount === 4) {
          dotCount = 0;
      }
      var dots = '.'.repeat(dotCount);
      sum_input.value = dots;
      dotCount++;
  }, 500);




  message.textContent = "Email is currently generating...";
  message.style.fontSize = "15px"
  message.style.marginRight = "10px";


  // create the text input element
  var generated_email = document.createElement("textarea");
  // generated_email.type = "text";
  generated_email.style.padding = "10px"
  generated_email.style.width = "585px"
  generated_email.style.height = "100px"
  generated_email.style.border = "1px solid #4169E1";
  generated_email.style.fontSize = "15px";
  generated_email.style.resize = "none";
  generated_email.style.display = "block"

  generated_email.style.borderRadius = "20px"
  generated_email.style.backgroundColor = "#f0f0f0";

  


  var tick = 0

  checkbox.addEventListener("click", async function() {
  
  if (checkbox.checked) {
    tick = 1

    if (but_act == 1) {

      modal.style.height = "760px"

      container.removeChild(details);
      container.removeChild(desc_input);
      container.removeChild(tone_p);
      container.removeChild(tone);
      container.removeChild(message)
      container.removeChild(generated_email)
      container.appendChild(sum_input);
      container.appendChild(details);
      container.appendChild(desc_input);
      container.appendChild(tone_p);
      container.appendChild(tone);
      container.appendChild(num_sent);
      container.appendChild(dropdown)
      container.appendChild(message)
      container.appendChild(generated_email)
    }else {

      // Adjust the height of the container element
      modal.style.height = "580px"

      to_hide = 1

      container.removeChild(details);
      container.removeChild(desc_input);
      container.removeChild(tone_p);
      container.removeChild(tone);
      container.appendChild(sum_input)
      container.appendChild(details);
      container.appendChild(desc_input)
      container.appendChild(tone_p)
      container.appendChild(tone)
      container.appendChild(num_sent);
      container.appendChild(dropdown)
    }
    
  } else {
    tick = 0


    if (but_act == 1) {
      modal.style.height = "690px"
      // hide the email summary text
      to_hide = 0
      container.removeChild(sum_input);
      //container.removeChild(dropdown);
      //container.removeChild(num_sent);
    }

    else {
        // hide the email summary text
        to_hide = 0
        modal.style.height = "530px";

      container.removeChild(sum_input);
    }
  }
  //if(sum_input.value == ""){
    if (sum == 0){
    var summary = await generateSummary(msg);
    clearInterval(dotInterval);
    sum_input.style.fontSize = "15px"



    sum_input.value = summary.trim();
    sum = 1
  }

  
  });

  container.appendChild(checkbox);
  // create the email
  var details = document.createElement("p");
  details.textContent = "Give a brief description of the reply you want:";
  details.style.fontSize = "15px"

  container.appendChild(details);


  // create the text input element
  var desc_input = document.createElement("input");
  desc_input.type = "text";
  desc_input.style.width = "590px"
  desc_input.style.height = "40px"
  desc_input.style.fontSize = "15px"
  desc_input.style.paddingLeft = "10px"


  desc_input.style.border = "1px solid #4169E1";

  desc_input.style.borderRadius = "20px"
  desc_input.style.backgroundColor = "#f0f0f0";
  desc_input.style.marginBottom = "10px";

  if(newEmail == true){
    desc_input.value = "Write an email saying...";
  }else{
    desc_input.value = "Write a response email saying...";
  }


  container.appendChild(desc_input);


  // create the number of sentences element
  var tone_p = document.createElement("p");
  tone_p.textContent = "Tone:";
  tone_p.style.display = "inline-block"
  tone_p.style.fontSize = "15px"


  tone_p.style.marginRight = "10px";
  container.appendChild(tone_p);

  // create the tone element
  var tone = document.createElement("select");
  tone.style.display = "inline-block";
  tone.style.fontSize = "15px";
  //tone.style.padding = "2px"
  tone.style.backgroundColor = '#f5f5f5';
  tone.style.borderRadius = '15px';
  tone.style.height = "25px";

  // create the options for the dropdown
  var opt0 = document.createElement("option");
  opt0.textContent = "";
  opt0.style.fontSize = "15px"

  opt0.value = "0";
  tone.appendChild(opt0);

  // create the options for the dropdown
  var opt1 = document.createElement("option");
  opt1.textContent = "Formal";
  opt1.style.fontSize = "15px"

  opt1.value = "1";
  tone.appendChild(opt1);

  var opt2 = document.createElement("option");
  opt2.textContent = "Semi-Formal";
  opt2.style.fontSize = "15px"

  opt2.value = "2";
  tone.appendChild(opt2);

  var opt3 = document.createElement("option");
  opt3.style.fontSize = "15px"

  opt3.textContent = "Informal";
  opt3.value = "5";
  tone.appendChild(opt3);

  container.appendChild(tone);

  tone.addEventListener("change", function(event) {
    var selectedOption = event.target.value;
    console.log("Selected option: ", selectedOption);
  });

  // create the number of sentences element
  var line = document.createElement("p");
  line.textContent = "";
  line.style.display = "block";
  line.style.marginTop = "0px";
  line.style.marginBottom = "0px";



  // create the number of sentences element
  var num_sent = document.createElement("p");
  num_sent.textContent = "Email length:";
  num_sent.style.fontSize = "15px"
  num_sent.style.display = "inline-block";



  num_sent.style.marginRight = "10px";
  num_sent.style.marginLeft = "20px";

  container.appendChild(num_sent);

  // create the dropdown element
  var dropdown = document.createElement("select");
  dropdown.style.display = "inline-block";
  dropdown.style.fontSize = "15px";
  //dropdown.style.padding = '2px';
  dropdown.style.backgroundColor = '#f5f5f5';
  dropdown.style.borderRadius = '15px';
  dropdown.style.height = "25px";




  // create the options for the dropdown
  var option0 = document.createElement("option");
  option0.textContent = "";
  option0.style.fontSize = "15px"

  option0.value = "0";
  dropdown.appendChild(option0);
  // create the options for the dropdown
  var option1 = document.createElement("option");
  option1.textContent = "Short";
  option1.style.fontSize = "15px"

  option1.value = "1";
  dropdown.appendChild(option1);

  var option2 = document.createElement("option");
  option2.textContent = "Medium";
  option2.style.fontSize = "15px"

  option2.value = "2";
  dropdown.appendChild(option2);

  var option3 = document.createElement("option");
  option3.textContent = "Long";
  option3.style.fontSize = "15px"

  option3.value = "5";
  dropdown.appendChild(option3);

  container.append(dropdown)




  var generateButton = document.createElement("button");
  generateButton.textContent = "Generate Email";
  generateButton.style.padding = "10px 20px";
  generateButton.style.border = "none";
  generateButton.style.borderRadius = "10px";
  generateButton.style.background = "linear-gradient(to right, #4169E1, #7B68EE)";
  generateButton.style.color = "white";
  generateButton.style.position = "absolute";
  generateButton.style.bottom = "20px";
  generateButton.style.right = "20px";
  generateButton.style.cursor = "pointer";
  generateButton.style.width = "150px" // Add this line


  generateButton.addEventListener("mouseover", function() {
      generateButton.style.backgroundColor = "#005d99";
      generateButton.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
      generateButton.style.transform = "scale(1.05)";

  });
  generateButton.addEventListener("mouseout", function() {
      generateButton.style.backgroundColor = "#007bff";
      generateButton.style.boxShadow = "none";
      generateButton.style.transform = "scale(1)";

  });

  container.appendChild(generateButton);

  


  // create the insert email button
  var insertButton = document.createElement("button");
  insertButton.textContent = "Insert Email";
  insertButton.style.display = "inline-block";
  insertButton.style.float = "left";
  insertButton.style.position = "absolute";
  insertButton.style.color = "white";
  insertButton.style.background = "linear-gradient(to right, #ff0000, #7B68EE)";



  insertButton.style.width = "150px" // Add this line



  insertButton.style.marginRight = "10px";
  insertButton.style.padding = "10px 20px";
  insertButton.style.border = "none";
  insertButton.style.borderRadius = "10px";
  insertButton.style.bottom = "20px";
  insertButton.style.left = "20px";
  insertButton.style.cursor = "pointer";
  insertButton.addEventListener("mouseover", function() {
    insertButton.style.backgroundColor = "#005d99";
    insertButton.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
    insertButton.style.transform = "scale(1.05)";
    
    });
    insertButton.addEventListener("mouseout", function() {
    insertButton.style.backgroundColor = "#007bff";
    insertButton.style.boxShadow = "none";
    insertButton.style.transform = "scale(1)";
    
    });
    insertButton.addEventListener("click", function() {
      // Close the modal
      modal.remove();
      backdrop.remove();
    
      var formattedEmail = generated_email.value.replace(/\n/g, "<br>");
      composeView.setBodyHTML(formattedEmail);
    });
    

 

  var but_act = 0;

  

//Create the loading spinner
var spinner = document.createElement("div");
spinner.className = "spinner-border text-primary";
spinner.style.display = "none";
spinner.style.position = "absolute";
spinner.style.bottom = "20px";
spinner.style.right = "20px";
spinner.style.border = "8px solid #f3f3f3"; 
spinner.style.borderTop = "8px solid #28a745"; 
spinner.style.borderRight = "8px solid #28a745"; 
spinner.style.borderBottom = "8px solid #28a745"; 
spinner.style.borderRadius = "50%"
spinner.style.width= "20px";
spinner.style.height = "20px";
spinner.style.animation = "spin 2s linear infinite";
container.appendChild(spinner);

var insert = 0




// Add the spinner to the button

  generateButton.addEventListener("click", async function() {
    if (insert == 1) {
      container.removeChild(insertButton)
      insert = 0
    }
    generated_email.value = ""; //Add this line

    generated_email.readOnly = true;


    generateButton.style.display = "none";

    spinner.style.display = "block";







    if (tick == 1) {
      modal.style.height = "740px"
      but_act = 1
      container.appendChild(message)
      container.appendChild(generated_email)
    }
    else {
    modal.style.height = "680px"
    but_act = 1
    container.appendChild(message)
    container.appendChild(generated_email)
    }
    console.log(con_input.value);
    console.log(con_input.value + '\n' + desc_input.value)
    console.log("mmmmmmmmm")
    console.log(tone.options[tone.selectedIndex].text)

    if (dropdown.options[dropdown.selectedIndex].text == "" && tone.options[tone.selectedIndex].text == "") {
      var response = await generateText(con_input.value + '\n' + desc_input.value + ". Make it medium:");
      console.log(con_input.value + '\n' + desc_input.value)
      generated_email.value = response.trim();
      container.appendChild(insertButton);
      insert = 1



    }
    else if (dropdown.options[dropdown.selectedIndex].text == "" ){
      var response = await generateText(con_input.value + '\n' + desc_input.value + ". Make it " + tone.options[tone.selectedIndex].text + ":");
      generated_email.value = response.trim();
      container.appendChild(insertButton);
      insert = 1



    }
    else if (tone.options[tone.selectedIndex].text == "") {
      var response = await generateText(con_input.value + '\n' + desc_input.value + ". Make it " + dropdown.options[dropdown.selectedIndex].text + ":");
      console.log(con_input.value + '\n' + desc_input.value + ". Make it" + dropdown.options[dropdown.selectedIndex].text)
      generated_email.value = response.trim();
      container.appendChild(insertButton);
      insert = 1






    }
    else {

    var response = await generateText(con_input.value + '\n' + desc_input.value + ". Make it " + dropdown.options[dropdown.selectedIndex].text + ". Make it " + tone.options[tone.selectedIndex].text + ":");
    generated_email.value = response.trim();

    container.appendChild(insertButton);
    insert = 1


    }
    generateButton.style.display = "block";

    spinner.style.display = "none";
    generated_email.readOnly = false;


  });
  // add the modal to the document
  document.body.appendChild(modal);
}

