/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5000/pacientes';

  alert('entrou na funcao de carregar')
  fetch(url, {
    method: 'get',
  })    
    .then((response) => response.json())
    .then((data) => {
      
      data.pacientes.forEach(item => insertList(item.name, 
                                                item.Entubado, 
                                                item.Pneumonia,
                                                item.Hipertenso,
                                                item.Diabetes,
                                                item.Asma,
                                                item.Obesidade,
                                                item.Tabaco,
                                                item.Idade,
                                                item.outcome
                                              ))
    })
    alert(item.outcome)
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList()


/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputPatient, inputEntubado, inputPneumonia,
                        inputHipertenso, inputDiabetes, inputAsma, 
                        inputObesidade, inputTabaco, inputIdade) => {
  alert('post item')
  const formData = new FormData();
  formData.append('name', inputPatient);
  formData.append('Entubado', inputEntubado);
  formData.append('Pneumonia', inputPneumonia);
  formData.append('Hipertenso', inputHipertenso);
  formData.append('Diabetes', inputDiabetes);
  formData.append('Asma', inputAsma);
  formData.append('Obesidade', inputObesidade);
  formData.append('Tabaco', inputTabaco);
  formData.append('Idade', inputIdade);

  let url = 'http://127.0.0.1:5000/paciente';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertDeleteButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}

/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteItem(nomeItem)
        alert("Removido!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/paciente?name='+item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo item com nome, quantidade e valor 
  --------------------------------------------------------------------------------------
*/
const newItem = async () => {

  let inputPatient = document.getElementById("newInput").value;
  let inputEntubado = document.getElementById("newEntubado").value;
  let inputPneumonia = document.getElementById("newPneumonia").value;
  let inputHipertenso = document.getElementById("newHipertenso").value;
  let inputDiabetes = document.getElementById("newDiabetes").value;
  let inputAsma = document.getElementById("newAsma").value;
  let inputObesidade = document.getElementById("newObesidade").value;
  let inputTabaco = document.getElementById("newTabaco").value;
  let inputIdade = document.getElementById("newIdade").value;

  // Verifique se o nome do produto já existe antes de adicionar
  const checkUrl = `http://127.0.0.1:5000/pacientes?nome=${inputPatient}`;
  fetch(checkUrl, {
    method: 'get'
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.pacientes && data.pacientes.some(item => item.name === inputPatient)) {
        alert("O paciente já está cadastrado.\nCadastre o paciente com um nome diferente ou atualize o existente.");
      } else if (inputPatient === '') {
        alert("O nome do paciente não pode ser vazio!");
      } else if (isNaN(inputEntubado) || isNaN(inputPneumonia) || isNaN(inputHipertenso) || isNaN(inputDiabetes) || isNaN(inputAsma) || isNaN(inputObesidade) || isNaN(inputTabaco) || isNaN(inputIdade)) {
        alert("Esse(s) campo(s) precisam ser números!");
      } else {
        insertList(inputPatient, inputEntubado, inputPneumonia, inputHipertenso, inputDiabetes, inputAsma, inputObesidade, inputTabaco, inputIdade);
        postItem(inputPatient, inputEntubado, inputPneumonia, inputHipertenso, inputDiabetes, inputAsma, inputObesidade, inputTabaco, inputIdade);
        alert("Item adicionado!");
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (namePatient, Entubado, Pneumonia,Hipertenso, Diabetes, Asma, Obesidade, Tabaco, Idade, outcome) => {
  var item = [namePatient, Entubado, Pneumonia,Hipertenso, Diabetes, Asma, Obesidade, Tabaco, Idade, outcome];
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cell = row.insertCell(i);
    cell.textContent = item[i];
  }

  var deleteCell = row.insertCell(-1);
  insertDeleteButton(deleteCell);

  document.getElementById("newInput").value = "";
  document.getElementById("newEntubado").value = "";
  document.getElementById("newPneumonia").value = "";
  document.getElementById("newHipertenso").value = "";
  document.getElementById("newDiabetes").value = "";
  document.getElementById("newAsma").value = "";
  document.getElementById("newObesidade").value = "";
  document.getElementById("newTabaco").value = "";
  document.getElementById("newIdade").value = "";

  removeElement();
}