console.log('content.js running');

function extractComments() {
  if (!document.body || !document.documentElement) {
    console.log('No HTML content, script skipped.');
    return;
  }

  let comments = [];

  try {
    // JavaScript comments
    document.querySelectorAll('script').forEach(script => {
      const matches = script.textContent.match(/\/\*[\s\S]*?\*\/|\/\/.*/g);
      if (matches) {
        comments = comments.concat(matches.map(match => ({ type: 'JS', comment: match })));
      }
    });

    // HTML comments
    const htmlComments = document.documentElement.innerHTML.match(/<!--[\s\S]*?-->/g);
    if (htmlComments) {
      comments = comments.concat(htmlComments.map(match => ({ type: 'HTML', comment: match })));
    }

    console.log('Comments extracted:', comments.length);
  } catch (error) {
    console.error('Error extracting comments:', error);
    return;
  }

  chrome.storage.local.set({ comments }, () => console.log('Comments saved to storage.'));
}

window.addEventListener('load', extractComments);
