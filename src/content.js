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

  // create the title element
  var title = document.createElement("h2");
  title.textContent = "Filos";
  modal.appendChild(title);

  // create the text element
  var summary = document.createElement("p");
  summary.textContent = "Email Summary:";
  modal.appendChild(summary);
  
  // create the text input element
  var sum_input = document.createElement("input");
  sum_input.type = "text";
  sum_input.style.width = "500px"
  sum_input.style.height = "50px"
  modal.appendChild(sum_input);
  
  

  // create the modal content
  var content = document.createElement("p");
  content.textContent = "This is the modal content";
  modal.appendChild(content);

  // create the close button
  var closeButton = document.createElement("button");
  closeButton.textContent = "Close";
  closeButton.style.marginTop = "20px";
  closeButton.addEventListener("click", function() {
    document.body.removeChild(modal);
  });
  modal.appendChild(closeButton);

  // add the modal to the document
  document.body.appendChild(modal);
}

