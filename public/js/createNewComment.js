async function newCommentHandler(event) {
    event.preventDefault();
    const content = document.querySelector('#comment-content').value.trim();

    // Send fetch request to add a new comment
      await fetch(`/api/new-entry/new_comment`, {
      method: 'POST',
      body: JSON.stringify({
        content,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  
document.querySelector('.new-comment-form').addEventListener('submit', newCommentHandler);
