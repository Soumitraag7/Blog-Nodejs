window.onload = function () {
    console.log('ok');
    const comment = document.getElementById('comment');
    const commentHolder = document.getElementById('comment-holder');

    comment.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            console.log('working');
            if (e.target.value) {
                let postId = comment.dataset.post;
                let req = genretedRequest(`/api/comments/${postId}`, 'POST', { body: e.target.value });
                fetch(req)
                    .then(res => res.json())
                    .then(data => {
                        let commentElement = createComment(data);
                        commentHolder.insertBefore(commentElement, commentHolder.children[0]);
                        e.target.value = ''

                    })
                    .catch(e => {
                        console.log(e);
                        alert(e.message);
                    })

            } else {
                alert('Please Enter A Valid Comment!');
            }
        }
    });

    commentHolder.addEventListener('keypress', (e) => {
        if (commentHolder.hasChildNodes(e.target)) {
            if (e.key === 'Enter') {
                let commentId = e.target.dataset.comment;
                console.log('commentId',commentId);
                let value = e.target.value;
                if (value) {
                    let req = genretedRequest(`/api/comments/replys/${commentId}`,'POST',{ body:e.target.value})
                    fetch(req)
                    .then(req => req.json())
                    .then(data=>{
                        let replyElement = createReplyElement(data.commentsJSON);
                        let parent = e.target.parentElement
                        parent.previousElementSibling.appendChild(replyElement)
                        e.target.value = ''
                    })
                    .catch(e=>{
                        console.log(e);
                        alert(e.message)
                    })

                } else {
                    alert('Please Enter A Valid Reply');
                }


            }

        }
    })
}

function genretedRequest(url, method, body) {
    let headers = new Headers()
    // headers.append('Accept','apllication/json');
    headers.append('Content-Type', 'application/json');
    console.log(body);
    let req = new Request(url, {
        method,
        headers,
        mode: 'cors',
        body: JSON.stringify(body)
    })

    return req;
}

function createComment(comment) {
    let text = `<img src="${comment.user.profilePics}" class="rounded-circle mx-3 my-3" style="width:40px;">
    <div class="media-body mt-4">
        <p> ${comment.user.name}  </p>
        <p>${comment.body}</p>
        <div class="my-3">
            <input style="background-color: rgb(5, 5, 5);color:white" type="text" class="form-control"
                placeholder="Press Enter to Reply" name="reply" data-comment="<%= comment._id %> ">
        </div>
    </div>`

    let div = document.createElement('div')
    div.className = 'media border'
    div.innerHTML = text

    return div
}

function createReplyElement(reply){
    console.log(reply.user.name);
    let {body} = reply.replies[reply.replies.length-1]
    let text = `
    <img  src="${reply.user.profilePics}"
    class="align-self-staret mr-3 rounded-circle" style="width:40px">
    <div class="media-body mt-2">
        <p>${reply.user.name}</P>
        <p>${body}</p>
    </div>
    `
   
    let div  = document.createElement('div');
    div.className = 'media mt-3';
    div.innerHTML = text

    return div
}