async function newPostHandler(event) {
    event.preventDefault();
    const post_title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();

    // Send fetch request to add a new post
    await fetch(`/api/new-entry/new_post`, {
      method: 'POST',
      body: JSON.stringify({
        post_title,
        content,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  
  document.querySelector('.new-post-form').addEventListener('submit', newPostHandler);
    