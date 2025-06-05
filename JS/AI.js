
const gpt = new GPT({
    apiKey: "YOUR_API_KEY",
    endpoint: "https://api-inference.huggingface.co/models/valhalla/t5-small",
    params: {
        "max_new_tokens": 1024,
        "no_cache": true
    }
});


function getResponse(prompt) {
    return gpt
        .sendMessage(prompt)
        .then(response => {
           
            if (typeof response === 'string') {
                return response;
            } else if (response && response.generated_text) {
                return response.generated_text;
            } else {
                return JSON.stringify(response);
            }
        })
        .catch(error => {
            console.error(error);
            return "Error: Unable to get response from GPT.";
        });
}


function chatUI() {
    const chatContainer = document.getElementById("chat-container");
    const inputField = document.getElementById("input-field");
    const sendButton = document.getElementById("send-button");
    const chatLog = document.getElementById("chat-log");
    let chatHistory = []; 

    
    function renderChat() {
        chatLog.innerHTML = "";
        chatHistory.forEach(item => {
            const messageDiv = document.createElement("div");
            messageDiv.classList.add("message");
            if (item.type === "user") {
                messageDiv.classList.add("user");
            } else if (item.type === "assistant") {
                messageDiv.classList.add("ai");
            }
            messageDiv.textContent = item.text;
            chatLog.appendChild(messageDiv);
        });
        
        chatLog.scrollTop = chatLog.scrollHeight;
    }

    
    sendButton.addEventListener("click", () => {
        const userInput = inputField.value.trim();
        if (userInput) {
            
            chatHistory.push({
                type: "user",
                text: userInput
            });
            renderChat();
            inputField.value = "";
            inputField.disabled = true;
            sendButton.disabled = true;

           
            getResponse(userInput).then(responseText => {
                chatHistory.push({
                    type: "assistant",
                    text: responseText
                });
                renderChat();
                inputField.disabled = false;
                sendButton.disabled = false;
                inputField.focus();
            });
        }
    });

   
    inputField.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendButton.click();
        }
    });
}


document.addEventListener("DOMContentLoaded", () => {
    chatUI();
});
