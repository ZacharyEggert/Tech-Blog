document.querySelector('#newCommentSubmit').addEventListener('click', async (e) => {
    e.preventDefault();
    const content = '' + document.querySelector('#newCommentContent').value;
    const post_id =
        1 * document.querySelector('#newComment').getAttribute('data-post');

    if (content === '') {
        return;
    }

    try {
        const response = await fetch('/api/posts/comment', {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content,
                post_id,
            }),
            method: 'POST',
        });

        if (response.ok) {
            document.querySelector('#newCommentContent').value = '';
            alert('Comment posted');
            setTimeout(() => {
                window.location.reload();
            }, 50);
        }
    } catch (err) {
        console.error(err);
        alert('Comment failed to post');
    }
});
