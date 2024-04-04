const inputTest = document.querySelector('.input-new-test');
const btnTest = document.querySelector('.btn-add-test');
const tests = document.querySelector('.tests');

function createLi(){ //função para criar a linha dentro da ul
  const li = document.createElement('li');
  return li;
}

inputTest.addEventListener('keypress', function(e){ //função que pressiona o botão quando aperta ENTER
  if(e.keyCode === 13){
    if(!inputTest.value) return;
    createTest(inputTest.value);
  }
});

function clearInput(){ //função que limpa o input e deixa o cursor no lugar
  inputTest.value = '';
  inputTest.focus();
}

function createButtonDelete(li){
  li.innerText += ' ';
  const btnDelete = document.createElement('button');
  btnDelete.innerText = 'Apagar';
  // btnDelete.classList.add('delete'); pode adicionar uma classe no botão apagar assim
  btnDelete.setAttribute('class', 'delete'); //ou assim
  btnDelete.setAttribute('title', 'Apagar esta tarefa'); 
  li.appendChild(btnDelete);

}

function createTest(textInput){ //função que chama a função de criar linha e adiciona no HTML
  const li = createLi();
  li.innerText = textInput;
  tests.appendChild(li);
  clearInput();
  createButtonDelete(li)
  saveTests();
}

btnTest.addEventListener('click', function(){
  if(!inputTest.value) return;
  createTest(inputTest.value);
});

document.addEventListener('click', function(e){
  const el = e.target;
  if(el.classList.contains('delete')){
    el.parentElement.remove();
    saveTests();
  }
});

function saveTests(){ //função que salva as tarefas
  const liTests = tests.querySelectorAll('li'); //seleciona todos as linhas dentro da lista
  const listOfTests = []; 

  for(let test of liTests){ 
    let testText = test.innerText;
    testText = testText.replace('Apagar', '').trim();
    listOfTests.push(testText);
  }
  const testJSON = JSON.stringify(listOfTests); //converte um elemento Javascript em uma string em formato JSON.
  localStorage.setItem('tests', testJSON); //no localStorage só é possível salvar strings, por isso foi convertido em JSON
}

function addTestsSaved(){  //função que salva as tarefas em no localStorage.
  const tests = localStorage.getItem('tests');
  const listOfTests = JSON.parse(tests); //converte o JSON em string
  
  for(let test of listOfTests){
    createTest(test);
  }
}
addTestsSaved();