tinymce.init({
    selector: 'textarea',
    plugins: 'a11ychecker advcode casechange export formatpainter linkchecker autolink lists checklist media mediaembed pageembed permanentpen powerpaste table advtable tinycomments tinymcespellchecker image imagetools emoticons',
    toolbar: 'bold italic underline | alignleft aligncenter alignright alignjustify| bullist numlist outdent indent | link image media | code forcolor backcolor emoticons | preview',
    toolbar_mode: 'floating',
    tinycomments_mode: 'embedded',
    tinycomments_author: 'Author name',
    height:200,
    automatic_uploads:true,
    images_uoload_url:'/uploads/postimage',
    relative_urls:false,
    images_upload_handler : function(blobInfo,success,failure){

      let headers = new Headers()
      headers.append('Accept', 'application/json');
      let formData = new FormData();
      formData.append('post-image',blobInfo.blob(),blobInfo.filename());

      let req = new Request('/uploads/postimage',{
          method: 'POST',
          headers,
          mode:'cors',
          body:formData
      })

      fetch(req)
      .then(response => response.json())
      .then(data=> success(data.imgUrl))
      .catch(()=>failure('HTTP Error'))


    }
 });