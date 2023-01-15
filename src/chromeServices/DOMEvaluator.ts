import { DOMMessage, DOMMessageResponse } from '../types';

// Function called when a new message is received
const messagesFromReactAppListener = (
  // request: any,
  msg: DOMMessage,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: DOMMessageResponse) => void
) => {
  if (msg.type === 'GET_DOM') {
    console.log('[content.js]. Message received', msg);

    const headlines = Array.from(document.getElementsByTagName<'h1'>('h1')).map(
      (h1) => h1.innerText
    );

    // Prepare the response object with information about the site
    const response: DOMMessageResponse = {
      title: document.title,
      headlines,
    };

    sendResponse(response);
  } else {
    console.log(
      sender.tab
        ? 'from a content script:' + sender.tab.url
        : 'from the extension'
    );
    const response: DOMMessageResponse = {
      title: 'error receiver not set [DOMEvaluator.ts: 30]',
      headlines: ['Error receiver not set!!!'],
    };
    sendResponse(response);
  }
};

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
