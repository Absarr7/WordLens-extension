chrome.storage.local.get('definitions', (data) => {
  showDefinition(data);
});

const defList = document.getElementById('definitionList');
const defP = document.getElementById('def');
const wordName = document.getElementById('word');

const showDefinition = (data) => {
  wordName.innerText = data.definitions[0].word;
  const definitions = data.definitions[0].meanings[0].definitions;

  for (let i = 0; i < definitions.length; i++) {
    const def = document.createElement('li');
    def.innerText = definitions[i].definition;
    defList.appendChild(def);
  }
};
