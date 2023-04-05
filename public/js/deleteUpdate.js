async function deleteHandler(event) {
    event.preventDefault();
    post_id = document.querySelector('.dash_delete_btn').value
    // Send fetch request to delete post
    await fetch(`/dashboard/`+post_id, {
      method: 'DELETE',
      });
  }
  
  deletbuton = document.getElementsByClassName('dash_delete_btn');
    for (i = 0; i < deletbuton.length; i++) {
        deletbuton[i].addEventListener('click', deleteHandler)
    }
    