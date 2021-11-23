window.onload = function () {
    let likeBtn = document.getElementById('likeBtn')
    let disLikeBtn = document.getElementById('disLikeBtn')

    likeBtn.addEventListener('click',function(e){
        let postId = likeBtn.dataset.post;
        reqLikeDislike('likes',postId)
        .then(res =>res.json())
        .then(data=>{
            let likeText = data.liked ? 'Liked' : 'Like';
            likeText+= `(${data.totalLikes})`;
            let disLikeText = `Dislike (${data.totalDisLikes})` ;
            likeBtn.innerHTML = likeText;
            disLikeBtn.innerHTML = disLikeText;
        })
        .catch(e=>{
            console.log(e);
        })
    })

    disLikeBtn.addEventListener('click',function(e){
        let postId = disLikeBtn.dataset.post;
        reqLikeDislike('dislikes',postId)
        .then(res =>res.json())
        .then(data=>{
            let disLikeText  = data.disliked ? 'Disliked' : 'disLike';
            disLikeText+= `(${data.totalDisLikes})`;
            let likeText = `Like (${data.totalLikes})` ;
            likeBtn.innerHTML = likeText;
            disLikeBtn.innerHTML = disLikeText;
        })
        .catch(e=>{
            console.log(e);
        })
    })



    function reqLikeDislike(types,id){
        let headers = new Headers()
        headers.append('Accept','Application/JSON');
        headers.append('Content-Type','Apllication/JSON');

        let req = new Request(`/api/${types}/${id}`, {
            method : 'GET',
            headers,
            mode:'cors'
        })

        return fetch(req)
       

    }
}

