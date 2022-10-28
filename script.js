let userName; ///variavel para definir o nome de usuário que será mostrado
userName = "a";
let dataServer; ///variavel para definir os dados enviados para a API
let promise; ///promessa para saber códigos de retorno da API
let currentDate;

//setInterval(() => {
// console.log((currentDate = new Date().toJSON().slice(11, 19)));
//}, 1000);

///enquanto o nome de usuário estiver vazio ou for '' então ele ficara em looping
while (userName === undefined || userName === "") {
  userName = prompt("Entre com o seu nome de usuário: ");
  if (userName === "") {
    alert("Entre com um nome de usuário corretamente.");
  }
}

///data server você usa para mandar os dados do prompt para a api
dataServer = {
  name: `${userName}`
};

///posta o que foi digitado. no caso o prompt de inicio.
axios.post(
  "https://mock-api.driven.com.br/api/v6/uol/participants",
  dataServer
);

axios.get("https://mock-api.driven.com.br/api/v6/uol/participants");

///dicas:
/*
usar ${userName} para pegar o nome do usuário
*/
