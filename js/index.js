let form;

let status;

let attempt;

let result;

//função chamada no final do html, chama setValue e cria um eventlistener
function onInit(){
    setValue();
    document.getElementById('form').addEventListener('submit', handleSubmit);
}

//atribui os valores do html para as variaveis do js
function setValue(){ 
    
        form = document.getElementById('form');
        result = document.getElementById('result');
        attempt = document.getElementById('attempt');
        status = document.getElementById('status');
}

//objeto que guarda o limite de valor por tentativa, quantidade de tentativas e gera um numero aleatorio
const Guess = {
    max: 10,
    attemptsNumber: 0,
    numerDraw: function randomValue(){
        return Math.round(Math.random() * this.max);
    }
}

//atribui o numero criado pelo Guess a numberDraw
let numberDraw = Guess.numerDraw();

//atualiza a quantidade de tentativas feitas até o momento
function updateAttempt(attempt, value){
    attempt.innerHTML = 'Tentativa: ' + value;
}

//funcao principal, responsavel por fazer as verificações de dados durante o submit
function handleSubmit(event){
    event.preventDefault();

    let kick = document.getElementById('kick').value;

    if(!kick){
        alert('Digite algum valor!');
        return;
    }

    updateAttempt(attempt, ++Guess.attemptsNumber)
    
    if(numberDraw == kick){
        playAgain();
        disableKicker();
        status.innerHTML = 'Parabéns, você acertou!!';
        result.style.transition = '0.4s';
        result.style.backgroundColor = '#37c978';
        result.style.color = '#fff';
        status.style.color = '#fff';
        clear();
    }else if(numberDraw > kick){
        status.innerHTML = 'Você errou, tente um valor mais alto.';
        status.style.color = '#de4251';
        clear();
    }else if(numberDraw < kick){
        status.innerHTML = 'Você errou, tente um valor mais baixo.';
        status.style.color = '#de4251';
        clear();
    }
}

//desabilita o botão de chute quando o jogador ganha
function disableKicker(){
    document.getElementById('kicker').disabled = true;
}

//o botao de jogar novamente fica disponivel após o jogador acertar o numberDraw
function playAgain(){
    document.getElementById('btn-restart').style.display = 'flex';
}

//reinicia a pagina quando aperta o botão de jogar novamente
function restart(){
    document.location.reload(true);
}

//limpa a caixa de input do kick
function clear(){
    document.getElementById('kick').value = '';
}