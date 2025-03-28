document.addEventListener('DOMContentLoaded', function() {
    const chatContainer = document.getElementById('chatContainer');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const typingIndicator = document.getElementById('typingIndicator');
    
    // Responses for the chatbot
    const botResponses = [
        "I'm here to help! What would you like to know?",
        "That's an interesting question. Let me think about that.",
        "I'm a simple chatbot for demonstration purposes.",
        "I was created to show how a basic chatbot interface works in a Chrome extension.",
        "You can customize me to respond however you'd like!",
        "I don't have access to external data yet, but my creator can enhance my capabilities.",
        "Is there anything else you'd like to chat about?",
        "That's a great point! Thanks for sharing.",
        "I'm still learning, but I'm doing my best to be helpful.",
        "Feel free to ask me anything else!"
    ];
    
    // Function to scroll to the bottom of chat
    function scrollToBottom() {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
    
    // Function to create a message element
    function createMessage(text, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
        messageDiv.textContent = text;
        return messageDiv;
    }
    
    // Function to show typing indicator
    function showTypingIndicator() {
        typingIndicator.classList.add('show');
        scrollToBottom();
    }
    
    // Function to hide typing indicator
    function hideTypingIndicator() {
        typingIndicator.classList.remove('show');
    }
    
    // Function to generate a bot response
    function getBotResponse(userText) {
        // For demo, just return a random response
        return botResponses[Math.floor(Math.random() * botResponses.length)];
        
        // In a real implementation, you could do something like:
        // return await fetchResponseFromAPI(userText);
    }
    
    // Function to handle sending a message
    function sendMessage() {
        const text = userInput.value.trim();
        if (!text) return;
        
        // Add user message to chat
        chatContainer.appendChild(createMessage(text, true));
        scrollToBottom();
        
        // Clear input
        userInput.value = '';
        userInput.style.height = 'auto';
        
        // Show typing indicator
        showTypingIndicator();
        
        // Simulate bot thinking and then responding
        setTimeout(() => {
            hideTypingIndicator();
            
            // Add bot response
            const botResponse = getBotResponse(text);
            chatContainer.appendChild(createMessage(botResponse, false));
            scrollToBottom();
        }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
    }
    
    // Event listeners
    sendButton.addEventListener('click', sendMessage);
    
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Auto-resize the textarea as user types
    userInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
        
        // Enable/disable send button based on input
        sendButton.disabled = this.value.trim() === '';
    });
    
    // Focus the input when the page loads
    userInput.focus();
});