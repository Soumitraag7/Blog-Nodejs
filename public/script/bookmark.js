// window.onload = ()=>{
const bookmarks = document.getElementsByClassName('bookmarks');
[...bookmarks].forEach(bookmark => {
	bookmark.style.cursor = 'pointer';
	bookmark.addEventListener('click', e => {
		let target = e.target.parentElement;

		let headers = new Headers();
		headers.append('Accept', 'application/JSON');
		let req = new Request(`/api/bookmarks/${target.dataset.post}`, {
			method: 'GET',
			headers,
			mode: 'cors'
		});

		fetch(req)
			.then(res => res.json())
			.then(data => {
				if (data.bookmark) {
					target.innerHTML = ' <i class="fas fa-bookmark"></i>';
				} else {
					target.innerHTML = ' <i class="far fa-bookmark"></i>';
				}
			})
			.catch(err => {
				console.error(e.response.data);
				alert(e.response.data.error);
			});
	});
});
// }
