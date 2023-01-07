import * as InboxSDK from '@inboxsdk/core';
import { Configuration, OpenAIApi } from "openai";

const apiKey = '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';

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
  console.log(json.choices.text)
  console.log(json)
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
        // window.open('about:blank', 'Modal Window', 'height=500,width=500,left=100,top=100');
        
        // const el = document.createElement('div');
        // el.innerHTML = 
        // `<span class="close">&times;</span>
        // <p>Enter some text:</p>
        // <input type="text" id="textInput">
        // <p>Choose an option:</p>
        // <select id="selectBox">
        // <option value="option1">Option 1</option>
        // <option value="option2">Option 2</option>
        // <option value="option3">Option 3</option>
        // </select>
        // <br>
        // <br>
        // <button id="button1">Button 1</button>
        // <button id="button2">Button 2</button>`;

        // sdk.Widget.showModalView({
        //     title: 'Modal Title',
        //     el
        // });
        // Create a form element
        // const form = document.createElement('form');
        // form.innerHTML = `
        //   <label for="prompt">What is the email about?</label><br>
        //   <input type="text" id="prompt" name="prompt"><br>
        //   <input type="submit" value="Generate Email">
        // `;
        // // Add the form to the compose view
        // event.composeView.insertHTMLIntoBodyAtCursor(form);

        // // Add a submit event listener to the form
        // form.addEventListener('submit', async (e) => {
        //   e.preventDefault();
        //   // Get the value of the prompt input field
        //   const prompt = form.querySelector('#prompt').value;

        //   // Declare the response variable
        //   let response;
        //   // Generate the email response
        //   response = await generateText(prompt);
        //   console.log("m")
        //   console.log(response)
        //   console.log("i")

        //   form.remove();
        //   console.log(response)
        //   // Insert the email response into the compose view
        //   event.composeView.insertHTMLIntoBodyAtCursor(`<div>${response}</div>`);

        // });
      // },
   

    });
  });
});

function showModal(){
  InboxSDK.load(2, "Hello World!", { timeout: 30000 }).then((sdk) => {
    const el = document.createElement('div');
    el.innerHTML = 
    `<p>Email Summary:</p>
    <input type="text" id="textInput">
    <p>SHow Email Context:</p>
    <input type="text" id="textInput">
    <p>Tone:</p>
    <select id="selectBox">
    <option value="option1">Default</option>
    <option value="option2">Happy</option>
    <option value="option3">Serious</option>
    </select>
    <p>Length:</p>
    <select id="selectBox">
    <option value="option1">Short</option>
    <option value="option2">Medium</option>
    <option value="option3">Long</option>
    </select>
    <br>
    <br>
    <button id="Generate Email">Generate Response</button>`;
    sdk.Widgets.showModalView({
        title: 'Filos',
        el
    });
  });
}
