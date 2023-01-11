import * as InboxSDK from '@inboxsdk/core';
import { Configuration, OpenAIApi } from "openai";
import "gmail-js";

//envVariables= process.env
//const {API_OPEN} = envVariables
//const apiKey = API_OPEN;
//console.log(apiKey)
const GmailFactory = require("gmail-js");
const gmail = new GmailFactory.Gmail();

function RemoveHTMLTags(html) {
  var regX = /(<([^>]+)>)/ig;
  var text =  html.replace(regX, "").replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&');
  text = text.replace(/\s+/g,' ').trim();
  return text;
}

async function generateText(prompt) {
  

  // Make the API request
  const response = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${apiKey}`,
       'Access-Control-Allow-Origin': '*'
     },
     body: JSON.stringify({
       "model": "text-davinci-002",
       "prompt": prompt,
       "max_tokens": 2048
     })
  });
  const json = await response.json();
  console.log(json)
  console.log(json.choices.text)

  console.log(json.choices)
  console.log(json.choices["0"].text)


  return json.choices["0"].text;

}

InboxSDK.load(2, "Hello World!", { timeout: 30000 }).then((sdk) => {
  sdk.Compose.registerComposeViewHandler((composeView) => {
    composeView.addButton({
      title: "Generate Email Response",
      iconUrl:
        "https://lh5.googleusercontent.com/itq66nh65lfCick8cJ-OPuqZ8OUDTIxjCc25dkc4WUT1JG8XG3z6-eboCu63_uDXSqMnLRdlvQ=s128-h128-e365",
      onClick: function(event){

        try{
          var email_id = gmail.new.get.email_id();

          var gmail_dom = gmail.dom.email(email_id);
          var body = gmail_dom.body();
          console.log(body);
        }catch(e){
          console.log(e);
        }
        var new_bdy = RemoveHTMLTags(body);
        console.log(new_bdy)
        showModal(new_bdy);
      }
 

    });
  });
});

function showModal(msg) {
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
  modal.style.height = "550px";
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
  context.textContent = "Email Context:";
  context.style.fontSize = "15px"
  container.appendChild(context);
  
  // create the text input element
  var con_input = document.createElement("input");
  con_input.placeholder = "Enter a summary here..."; 
  con_input.style.fontSize = "15px"
  


  con_input.type = "text";
  con_input.style.borderImage = "linear-gradient(to right, #4169E1, #7B68EE) 1";
  con_input.style.width = "590px"
  con_input.style.height = "150px"

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
sum_input.style.width = "590px"
sum_input.style.height = "50px"
sum_input.style.border = "1px solid #4169E1";

sum_input.style.borderRadius = "20px"
sum_input.style.backgroundColor = "#f0f0f0";


message.textContent = "Email is currently generating...";
message.style.fontSize = "15px"


message.style.marginRight = "10px";


// create the text input element
var generated_email = document.createElement("input");
generated_email.type = "text";
generated_email.style.width = "590px"
generated_email.style.height = "100px"
generated_email.style.borderRadius = "20px"
generated_email.style.backgroundColor = "#f0f0f0";


checkbox.addEventListener("click", function() {
  
  if (checkbox.checked) {

    if (but_act == 1) {

      modal.style.height = "750px"


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
      container.appendChild(line)

      container.appendChild(num_sent);
      container.appendChild(dropdown)


      container.appendChild(message)
      container.appendChild(generated_email)




    }

    else {


      
      // Adjust the height of the container element

      modal.style.height = "620px"

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
      container.appendChild(line)

      container.appendChild(num_sent);
      container.appendChild(dropdown)




    }
    



  
    
  } else {

    if (but_act == 1) {
      modal.style.height = "720px"
      // hide the email summary text
      to_hide = 0

    

      container.removeChild(sum_input);
      container.removeChild(dropdown);
      container.removeChild(num_sent);

    }

    else {
        // hide the email summary text
        to_hide = 0
        modal.style.height = "550px";

      
    
      container.removeChild(sum_input);
    }
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
desc_input.style.height = "50px"
desc_input.style.border = "1px solid #4169E1";

desc_input.style.borderRadius = "20px"
desc_input.style.backgroundColor = "#f0f0f0";
desc_input.style.marginBottom = "10px";


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

// create the number of sentences element
var line = document.createElement("p");
line.textContent = "";
line.style.display = "block";
line.style.marginTop = "0px";
line.style.marginBottom = "0px";


container.append(line)

// create the number of sentences element
var num_sent = document.createElement("p");
num_sent.textContent = "Email length:";
num_sent.style.fontSize = "15px"
num_sent.style.display = "inline-block";



num_sent.style.marginRight = "10px";
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
var option1 = document.createElement("option");
option1.textContent = "short";
option1.style.fontSize = "15px"

option1.value = "1";
dropdown.appendChild(option1);

var option2 = document.createElement("option");
option2.textContent = "medium";
option2.style.fontSize = "15px"

option2.value = "2";
dropdown.appendChild(option2);

var option3 = document.createElement("option");
option3.textContent = "long";
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

var but_act = 0;

generateButton.addEventListener("click", function() {

  modal.style.height = "720px"
  but_act = 1
  container.appendChild(message)
  container.appendChild(generated_email)
  


});

  

  


  


  
  

  

  

  // add the modal to the document
  document.body.appendChild(modal);
}

