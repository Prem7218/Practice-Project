const API_URL = 'http://localhost:4000/post';

const postForm = document.getElementById('postForm');
const imgUrl = document.getElementById('imgUrl');
const imgDisc = document.getElementById('imgDisc');

const postsContainer = document.getElementById('postsContainer');
const submitBtn = document.getElementById('submitBtn');
const refreshBtn = document.getElementById('refreshBtn');
const message = document.getElementById('message');

// Show Message
function showMessage(text, type) {
    message.innerText = text;
    message.className = `message ${type}`;
    message.style.display = 'block';
}

// Fetch All Posts
async function getAllPosts() {

    postsContainer.innerHTML =
        '<div class="empty">Loading posts...</div>';

    try {

        const response = await axios.get(`${API_URL}`);
        const posts = response.data.data || [];

        displayPosts(posts);

    } catch (error) {
        console.error('Get Posts Error:', error);

        postsContainer.innerHTML = `
            <div class="empty">
                Unable to load posts. Please try again.
            </div>
        `;
    }
}

// Display Posts

function displayPosts(posts) {

    postsContainer.innerHTML = '';

    if (posts.length === 0) {
        postsContainer.innerHTML = `
            <div class="empty">
                <h3>No Posts Yet!</h3>
                <p>Create your first post.</p>
            </div>
        `;
        return;
    }

    posts.forEach(post => {

        const postElement = document.createElement('div');
        postElement.className = 'post';

        const image = document.createElement('img');
        image.src = post.imgUrl;
        image.alt = 'Post Image';
        image.loading = 'lazy';

        image.onerror = () => {
            image.alt = 'Unable to load image';
            image.removeAttribute('src');
        };

        const content = document.createElement('div');
        content.className = 'post-content';

        const postId = document.createElement('span');
        postId.className = 'post-id';
        postId.textContent = `Post #${post.socailId}`;

        const description = document.createElement('p');
        description.textContent = post.imgDisc;

        const commentCount = document.createElement('p');
        commentCount.textContent =
            `💬 ${post.comments?.length || 0} Comments`;

        content.append(postId, description, commentCount);

        // Display Existing Comments
        if (post.comments && post.comments.length > 0) {

            const commentSection = document.createElement('div');

            post.comments.forEach(item => {

                const comment = document.createElement('span');
                comment.textContent = `💬 ${item.comment}`;

                commentSection.appendChild(comment);

                const br = document.createElement('br');
                commentSection.appendChild(br);
            });

            content.appendChild(commentSection);
        }

        // Comment Input
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'comment-input';
        input.placeholder = 'Write your comment...';

        // Comment Button
        const btn = document.createElement('button');
        btn.classList.add('post-comment');
        btn.textContent = 'Comment It!';

        // Add Comment Event
        btn.addEventListener('click', async () => {

            const comment = input.value.trim();

            if (!comment) {
                alert('Please enter a comment!');
                return;
            }

            btn.disabled = true;
            btn.textContent = 'Posting...';

            try {

                await axios.post(`${API_URL}/${post.socailId}`,{ comment });

                input.value = '';

                // Reload posts with updated comments
                await getAllPosts();

            } catch (error) {

                console.error('Comment Error:', error);
                alert(error.message);

            } finally {

                btn.disabled = false;
                btn.textContent = 'Comment It!';

            }
        });

        content.append(input, btn);

        postElement.append(image, content);

        postsContainer.appendChild(postElement);

    });
}

// Create New Post
postForm.addEventListener('submit', async (e) => {

    e.preventDefault();

    const postData = {
        imgUrl: imgUrl.value.trim(),
        imgDisc: imgDisc.value.trim()
    };

    if (!postData.imgUrl || !postData.imgDisc) {
        showMessage('Please fill all fields.', 'error');
        return;
    }

    submitBtn.disabled = true;
    submitBtn.innerText = 'Creating...';

    try {
        
        await axios.post(`${API_URL}/`, postData);

        showMessage('Post created successfully!', 'success');
        
        postForm.reset();

        // Fetch latest posts from database
        await getAllPosts();

    } catch (error) {
        
        console.error('Create Post Error:', error);
        showMessage(error.message, 'error');

    } finally {
        
        submitBtn.disabled = false;
        submitBtn.innerText = 'Create Post';
    }
});

// Refresh Posts
refreshBtn.addEventListener('click', getAllPosts);

document.addEventListener('DOMContentLoaded', getAllPosts);

getAllPosts();