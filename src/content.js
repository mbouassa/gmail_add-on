import * as InboxSDK from '@inboxsdk/core';
import { Configuration, OpenAIApi } from "openai";

//envVariables= process.env
//const {API_OPEN} = envVariables
//const apiKey = API_OPEN;
//console.log(apiKey)

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
        showModal();
      }
 

    });
  });
});

function showModal() {
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
  modal.style.height = "400px";
  modal.style.borderRadius = "20px"

  // create the container element
  var container = document.createElement("div");
  //container.style.overflow = "auto";
  container.style.height = "auto";
  modal.appendChild(container);
  

  // create the title element
  var title = document.createElement("h2");
  title.textContent = "Filos";
  title.style.display = "inline-block";

  container.appendChild(title);

  // create the close button
  
  var closeButton = document.createElement("button");
  closeButton.innerHTML = "&times;";
  closeButton.style.position = "absolute";
  closeButton.style.top = "0";
  closeButton.style.right = "0";

  closeButton.style.fontSize = "24px";
  closeButton.style.color = "black";
  closeButton.style.float = "right";

  closeButton.style.display = "inline-block";
  closeButton.style.float = "right";
  closeButton.style.border = "none";
  
  closeButton.style.backgroundColor = "transparent"

  closeButton.addEventListener("click", function() {
    document.body.removeChild(modal);
  });
  container.appendChild(closeButton);

  // create the text element
  var context = document.createElement("p");
  context.textContent = "Email Context:";
  container.appendChild(context);
  
  // create the text input element
  var con_input = document.createElement("input");
  con_input.placeholder = "Enter a summary here..."; 

  con_input.type = "text";
  con_input.style.width = "590px"
  con_input.style.height = "200px"
  con_input.style.borderRadius = "20px"
  con_input.style.backgroundColor = "#f0f0f0";
  //con_input.style.placeholderColor = "lightgrey";
  con_input.style.lineHeight = "200px";







  container.appendChild(con_input);

  // create the checkbox element
var checkbox = document.createElement("input");
checkbox.type = "checkbox";
// create the label element
var label = document.createElement("label");
label.textContent = "Show email summary";
label.style.marginRight = "10px";

container.appendChild(label);
container.appendChild(checkbox);

checkbox.style.marginTop = "20px";

// store the summary and sum_input elements in variables
var summary, sum_input;

checkbox.addEventListener("click", function() {
  if (checkbox.checked) {
    // Adjust the height of the container element
    modal.style.height = "480px"
    // create the text element
    summary = document.createElement("p");
    summary.textContent = "Email Summary:";
    container.appendChild(summary);
  
    // create the text input element
    sum_input = document.createElement("input");
    sum_input.type = "text";
    sum_input.style.width = "590px"
    sum_input.style.height = "50px"
    sum_input.style.borderRadius = "20px"
    sum_input.style.backgroundColor = "#f0f0f0";

    container.appendChild(sum_input);

    // create the number of sentences element
    num_sent = document.createElement("p");
    num_sent.textContent = "Summary detail level:";
    //num_sent.style.display = "inline-block"

  num_sent.style.marginRight = "10px";
  container.appendChild(num_sent);

  // create the dropdown element
  dropdown = document.createElement("select");
  dropdown.style.display = "inline-block";

  // create the options for the dropdown
  var option1 = document.createElement("option");
  option1.textContent = "1 sentence";
  option1.value = "1";
  dropdown.appendChild(option1);

  var option2 = document.createElement("option");
  option2.textContent = "2 sentences";
  option2.value = "2";
  dropdown.appendChild(option2);

  var option3 = document.createElement("option");
  option3.textContent = "5 sentences";
  option3.value = "5";
  dropdown.appendChild(option3);

  container.appendChild(dropdown);
  dropdown = document.createElement("select");

  


  } else {
    // hide the email summary text
    modal.style.height = "400px"

    container.removeChild(summary);
    container.removeChild(sum_input);
    container.removeChild(dropdown);
    container.removeChild(num_sent);
  }
});

container.appendChild(checkbox);

  

  


  


  
  

  

  

  // add the modal to the document
  document.body.appendChild(modal);
}

