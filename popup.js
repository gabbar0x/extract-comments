document.addEventListener('DOMContentLoaded', function() {
  const commentsList = document.getElementById('commentsList');
  commentsList.textContent = 'Loading comments...';

  chrome.storage.local.get(['comments'], function(result) {
    if (chrome.runtime.lastError) {
      commentsList.textContent = 'Failed to load comments.';
      console.error('Error retrieving comments:', chrome.runtime.lastError);
      return;
    }

    const comments = result.comments || [];
    commentsList.innerHTML = ''; // Clear loading message

    if (comments.length === 0) {
      commentsList.textContent = 'No comments found on this page.';
    } else {
      comments.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}: [${item.type}] ${item.comment}`;
        commentsList.appendChild(li);
      });
    }
  });
});
