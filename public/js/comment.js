async function commentHandler (event) {
    event.preventDefault();
  
    const commentName = document.querySelector('#comment-name').value.trim();
    const comment = document.querySelector('#comment-text').value.trim();
    const blogPostId = document.querySelector('#post-id').value.trim();
  
    console.log(blogPostId);
  
    if (commentName && comment) {
      const response = await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({
          // post_id: blogPostId,
          commentName,
          comment,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to post comment!');
      }
    }
};
  
document
 .querySelector('.new-comment')
 .addEventListener('submit', commentHandler);