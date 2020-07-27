function createWorkerFromRemoteURL(url='', fetchSrc=false){
	let innerContainer = {};
	setTimeout(()=>{URL.revokeObjectURL(innerContainer.urlObject);},10000); // Worker does not work if urlObject is removed to early.
	if(fetchSrc){
		let container = {};
		fetch(url)
		.then(response => response.text())
		.then(text => {
			// Based on http://jsfiddle.net/uqcFM/49/
			window.URL = window.URL || window.webkitURL;
			var blob;
			try{
				blob = new Blob([text], {type: 'application/javascript'});
			}catch(e){
				window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;
				blob = new BlobBuilder();
				blob.append(text);
				blob = blob.getBlob();
			}
			innerContainer.urlObject = URL.createObjectURL(blob);
			container.worker = new Worker(innerContainer.urlObject);
		});
		return container;
	}else{
		innerContainer.urlObject = URL.createObjectURL(new Blob(['importScripts("'+url+'");'], {type: 'application/javascript'}));
		let worker = new Worker(innerContainer.urlObject);
		return worker;
	}
}
