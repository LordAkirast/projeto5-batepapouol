let userName; ///variavel para definir o nome de usuário que será mostrado
///userName = "a";
let dataServer; ///variavel para definir os dados enviados para a API
let promise; ///promessa para saber códigos de retorno da API
let currentDate; ///variavel usada para saber a data atual e ir atualizando
let elemento; ///variavel para usar de elemento nos queryselector
let hour; ///variavel para poder trabalhar com as horas locais
let charCount; ///variavel para contar quantos caracteres foram digitados
let count; ///variavel para me deixar alterar o innerhtml do P classe count
let getMsg; ///variavel pra pegar mensagem do servidor
const elementoQueQueroQueApareca = document.querySelector(".footer"); ////variavel pra scrollar para baixo
let urlGet = "https://mock-api.driven.com.br/api/v6/uol/messages"; ///variavel para amazenar a url
setInterval(() => {
  currentDate = new Date().toJSON().slice(11, 19);
}, 1000);

///enquanto o nome de usuário estiver vazio ou for '' então ele ficara em looping
while (userName === undefined || userName === "") {
  userName = prompt("Entre com o seu nome de usuário: ");
  if (userName === "") {
    alert("Entre com um nome de usuário corretamente.");
  }

  ///data server você usa para mandar os dados do prompt para a api
  dataServer = {
    name: `${userName}`
  };

  ///posta o que foi digitado. no caso o prompt de inicio.
  promise = axios.post(
    "https://mock-api.driven.com.br/api/v6/uol/participants",
    dataServer
  );

  ////função para tratar e erros. printa o status e os dados do erro
  function Failure(erro) {
    console.log(erro.response.status);
    console.log(erro.response.date);

    ///se ocorrer qualquer erro, um alerta aparecerá e a página irá ser recarregada
    if (erro.response.status != undefined) {
      alert(
        "Há um problema com esse nome de usuário. Por favor, tente novamente."
      );
      window.location.reload();
    }
  }
  promise.catch(Failure);
}
///a data atual estava pegando 3 horas no futuro então criei uma var hora para pegar a hora da var, transformar em numero, subtrair 3 e transformar em string e concatenar com a hora atual
currentDate = new Date().toJSON().slice(11, 19);
hour = currentDate.slice(0, 2);
hour = Number(hour);
hour = hour - 3;
hour = hour.toString();
currentDate = hour + new Date().toJSON().slice(13, 19);
accessGranted();
////coloquei tudo dentro do while e do if para aparecer pedir para trocar o nome do usuário se caso der erro
axios.get("https://mock-api.driven.com.br/api/v6/uol/participants");

///função para o que fazer ao conseguir entrar na sala.
function accessGranted() {
  elemento = document.querySelector("section");
  elemento.innerHTML += `<p class="enterRoom">( ${currentDate} ) ${userName} entrou na sala</p>`;
}

///função para o que fazer ao sair da sala
function leaveRoom() {
  elemento = document.querySelector("section");
  elemento.innerHTML += `<p class="enterRoom">( ${currentDate} ) ${userName}saiu da sala</p>`;
}

///BUG ESTÁ OCORRENDO E NÃO REGISTRA QUANDO SAI DA SALA
///verificar se o cara tá logado ainda
//while (userName != undefined) {
//setInterval(() => {
//axios.post("https://mock-api.driven.com.br/api/v6/uol/status", dataServer);
//}, 5000);

//function Failurestatus(erro) {
//console.log(erro.response.status);
//console.log(erro.response.date);

//if (erro.response.status != undefined) {
//   leaveRoom();
// }
//  }
//  promise.catch(Failurestatus);
//}

////contador de caracteres do input
setInterval(() => {
  charCount = document.querySelector("input").value;
  count = document.getElementById("count");
  count.innerHTML = charCount.length;
  if (charCount.length < 125) {
    count.classList.add("black");
    count.classList.remove("red");
    count.classList.remove("orange");
  }
  if (charCount.length > 125 && charCount.length < 140) {
    count.classList.add("orange");
    count.classList.remove("black");
    count.classList.remove("red");
  }
  if (charCount.length > 125 && charCount.length < 139) {
    count.classList.add("orange");
    count.classList.remove("black");
    count.classList.remove("red");
  } else if (charCount.length === 140) {
    count.classList.add("red");
    count.classList.remove("black");
    count.classList.remove("orange");
  }
}, 100);

function send() {
  hour = currentDate.slice(0, 2);
  hour = Number(hour);
  hour = hour - 3;
  hour = hour.toString();
  currentDate = hour + new Date().toJSON().slice(13, 19);
  elemento = document.querySelector("section");
  let wroteMsg = (elemento.innerHTML += `<p class="message">( ${currentDate} ) ${charCount}</p>`);
  document.querySelector("input").value = "";
  let msg = wroteMsg.replace('<p class="message>', "");
  msg = wroteMsg.replace("</p>", "");

  let wroteMsgr = {
    from: `${userName}`,
    to: "Todos",
    text: `${msg}`,
    type: "message" // ou "private_message" para o bônus
  };
  axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", wroteMsgr);
  elementoQueQueroQueApareca.scrollIntoView();
}

function getMessages() {
  getMsg = axios.get(urlGet);
  elemento.innerHTML += `<p class="message">( ${currentDate} ) ${getMsg}</p>`;
  elementoQueQueroQueApareca.scrollIntoView();

  const promessa = axios.get(urlGet);
  promessa.then(processarResposta);

  function processarResposta(resposta) {
    console.log(resposta.data);
  }
}

////parte que fica verificando se a pessoa ainda tá na sala
setInterval(() => {
  manterConexao();
}, 5000);

function manterConexao() {
  let aliexpress = {
    name: `${userName}`
  };
  axios.get("https://mock-api.driven.com.br/api/v6/uol/status", aliexpress);
}

//	type: "message" // ou "private_message" para o bônus
//}

///dicas:
/*
usar ${userName} para pegar o nome do usuário
usar ${currentDate} para pegar a hora atual
*/
