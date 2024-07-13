chrome.runtime.onInstalled.addListener((details) => {
  chrome.contextMenus.create({
    title: 'translate',
    id: 'contextMenu1',
    contexts: ['selection'],
  });

  chrome.contextMenus.onClicked.addListener((event) => {
    if (event.menuItemId === 'contextMenu1') {
      console.log(event.selectionText);
      chrome.tabs.create({
        url: `https://translate.google.com/?hl=en&sl=auto&tl=en&text=${event.selectionText}&op=translate`,
      });
    }
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const getResponse = () => {
    const response = fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${message}`
    ).then((res) => {
      res.json().then((data) => {
        console.log(data);
        chrome.storage.local.set({ definitions: data });
      });
    });
  };

  getResponse();

  sendResponse(`the message is ${message}`);
  chrome.tabs.sendMessage(
    sender.tab.id,
    'got your message from background!!!!!!!'
  );
});

console.log('bg script');
