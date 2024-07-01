
const messageBox = document.getElementById('messageBox');
const sendButton = document.getElementById('sendButton');
const voiceButton = document.getElementById('voiceButton');
const inputField = document.getElementById('val');

// Função para enviar mensagem
function enviarMensagem(mensagem, classe) {
  const messageElem = `<div class="message ${classe}">${mensagem}</div>`;
  messageBox.innerHTML += messageElem;
  messageBox.scrollTop = messageBox.scrollHeight; // Scroll para o final
}

// Event listener para enviar mensagem pelo botão "Enviar"
sendButton.addEventListener('click', function() {
  const mensagem = inputField.value.trim();
  if (mensagem === '') return; // Se a mensagem estiver vazia, não faz nada
  enviarMensagem(mensagem, 'sent'); // Adiciona a mensagem à UI como enviada pelo usuário
  inputField.value = ''; // Limpa o campo de entrada
  responder(mensagem); // Chama a função para responder à mensagem
});

// Função para responder à mensagem
function responder(mensagem) {
  // Simulação de resposta do chatbot (pode ser substituído por chamada a API ou lógica de resposta real)
  setTimeout(() => {
    const resposta = `Olá! Você disse: "${mensagem}"`; // Aqui você pode implementar a lógica para a resposta
    enviarMensagem(resposta, 'received'); // Adiciona a resposta à UI como recebida pelo bot
    responsiveVoice.speak(resposta, 'Brazilian Portuguese Female'); // Responde com a voz em português brasileiro
  }, 500);
}

// Event listener para botão de voz (iniciar reconhecimento de fala)
voiceButton.addEventListener('click', function() {
  const recognition = new webkitSpeechRecognition() || SpeechRecognition();
  recognition.lang = 'pt-BR'; // Define o idioma (Português - Brasil)
  recognition.start();

  recognition.onresult = function(event) {
    if (event.results.length > 0) {
      const spokenText = event.results[0][0].transcript;
      inputField.value = spokenText;
      enviarMensagem(spokenText, 'sent'); // Envia a mensagem reconhecida para a interface como enviada pelo usuário
      responder(spokenText); // Chama a função para responder à mensagem reconhecida
    }
  };

  recognition.onerror = function(event) {
    console.error('Erro ao reconhecer voz:', event.error);
  };
});
