function createWorkerFromRemoteURL(url='', fetchSrc=false){
	function createObjectURL(blob){
		let urlObject = URL.createObjectURL(blob);
		setTimeout(()=>{URL.revokeObjectURL(urlObject);},10000); // Worker does not work if urlObject is removed to early.
		return urlObject;
	}
	if(fetchSrc){
		async function asyncFetch(url){
			let worker = undefined;
			await fetch(url)
			.then(response => response.text())
			.then(text => {
				let blob;
				try{
					blob = new Blob([text], {type: 'application/javascript'});
				}catch(e){
					window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;
					blob = new BlobBuilder();
					blob.append(text);
					blob = blob.getBlob();
				}
				worker = new Worker(createObjectURL(blob));
			});
			return worker;
		}
		return asyncFetch(url);
	}else{
		return new Worker(createObjectURL(new Blob(['importScripts("'+url+'");'], {type: 'application/javascript'})));
	}
}
