document.querySelector('#newPostBtn').addEventListener('click', (e) => {
    e.preventDefault();

    document.querySelector('#newPostBtn').classList.add('hidden');
    document.querySelector('#newPostForm').classList.remove('hidden');
});

document
    .querySelector('#newPostSubmit')
    .addEventListener('click', async (e) => {
        e.preventDefault();
        const titleEl = document.querySelector('#newPostTitle');
        const contentEl = document.querySelector('#newPostContent');

        title = '' + titleEl.value;
        content = '' + contentEl.value;

        try {
            const response = await fetch('/api/posts/', {
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    content,
                }),
                method: 'POST',
            });
            if (response.ok) {
                document
                    .querySelector('#newPostBtn')
                    .classList.remove('hidden');
                document.querySelector('#newPostForm').classList.add('hidden');
                titleEl.value = '';
                contentEl.value = '';
                alert('Post submitted successfully');
                setTimeout(() => {
                    window.location.reload();
                }, 50);
            }
        } catch (err) {
            console.error(err);
        }
    });

const postCards = document.querySelectorAll('.post-card');

postCards.forEach((element) => {
    const listener = element.addEventListener('click', (e) => {
        const card = e.currentTarget;
        // console.log(card);
        const title = card.children[0].children[1].innerHTML;
        // console.log(title);
        const content = card.children[1].innerHTML.trim();
        // console.log(content);

        const titleField = document.createElement('input');
        titleField.setAttribute(
            'class',
            'w-10/12 px-4 py-1 my-2 text-2xl rounded-md focus:outline-none'
        );
        titleField.setAttribute('id', 'editedTitle');
        titleField.value = title;

        const contentField = document.createElement('textarea');
        contentField.setAttribute(
            'class',
            'w-full my-2 rounded-md resize-y focus:outline-none'
        );
        contentField.setAttribute('id', 'editedContent');
        contentField.value = content;

        const subButton = document.createElement('button');
        subButton.setAttribute(
            'class',
            'my-2 text-xl bg-blue-200 border-2 border-black border-solid btn'
        );
        subButton.setAttribute('id', 'editedSubmit');
        subButton.innerText = 'Submit';
        subButton.addEventListener('click', async (e) => {
            const response = await fetch('/api/posts/', {
                method: 'PUT',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                    title: card.querySelector('#editedTitle').value + '',
                    content: card.querySelector('#editedContent').value + '',
                    id: card.getAttribute('data-post')*1,
                })
            }) 
            if(response.ok){
                alert('Post updated')
                window.location.reload();
            }else{
                console.error(response);
                alert('Update Failed')
            }
        })

        const delButton = document.createElement('button');
        delButton.setAttribute(
            'class',
            'my-2 text-xl bg-red-600 border-2 border-black border-solid btn'
        );
        delButton.setAttribute('id', '');
        delButton.innerText = 'Delete';
        delButton.addEventListener('click', async (e) => {
            const response = await fetch('/api/posts', {
                method: 'DELETE',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                    id:card.getAttribute('data-post')*1
                })
            })
            if(response.ok){
                alert('Post Deleted');
                window.location.reload();
            }else{
                console.error(response);
                alert('Delete Failed')
            }
        })

        // -------- //

        const h2 = card.querySelector('h2');
        const p = card.querySelector('p');

        h2?.parentNode.replaceChild(titleField, h2);
        p?.parentNode.replaceChild(contentField, p);

        removeEventListener('click', listener);

        // console.log(card.children[card.children.length-1])

        if (card.children[card.children.length - 1].innerText === 'Submit') {
        } else {
            card.appendChild(delButton);
            card.appendChild(subButton);
        }

    });
});
