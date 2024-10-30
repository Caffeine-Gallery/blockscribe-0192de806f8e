import { backend } from 'declarations/backend';

let quill;

document.addEventListener('DOMContentLoaded', async () => {
    feather.replace();

    quill = new Quill('#editor', {
        theme: 'snow'
    });

    const newPostBtn = document.getElementById('newPostBtn');
    const newPostForm = document.getElementById('newPostForm');
    const postForm = document.getElementById('postForm');
    const postsSection = document.getElementById('posts');

    newPostBtn.addEventListener('click', () => {
        newPostForm.style.display = 'block';
    });

    postForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('postTitle').value;
        const author = document.getElementById('postAuthor').value;
        const body = quill.root.innerHTML;

        showSpinner();
        await backend.addPost(title, body, author);
        hideSpinner();

        newPostForm.style.display = 'none';
        postForm.reset();
        quill.setContents([]);
        await displayPosts();
    });

    await displayPosts();
});

async function displayPosts() {
    showSpinner();
    const posts = await backend.getPosts();
    hideSpinner();

    const postsSection = document.getElementById('posts');
    postsSection.innerHTML = '';

    posts.reverse().forEach(post => {
        const postElement = document.createElement('article');
        postElement.className = 'post';
        postElement.innerHTML = `
            <h2>${post.title}</h2>
            <p class="author">By ${post.author}</p>
            <div class="post-content">${post.body}</div>
            <p class="timestamp">${new Date(Number(post.timestamp) / 1000000).toLocaleString()}</p>
        `;
        postsSection.appendChild(postElement);
    });
}

function showSpinner() {
    document.getElementById('loadingSpinner').style.display = 'flex';
}

function hideSpinner() {
    document.getElementById('loadingSpinner').style.display = 'none';
}
