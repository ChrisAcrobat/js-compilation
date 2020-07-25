function createWorkerFromRemoteURL(url=''){
	let urlObject = URL.createObjectURL(new Blob(['importScripts("'+url+'");'], {type: 'application/javascript'}));
	let worker = new Worker(urlObject);
	setTimeout(()=>{URL.revokeObjectURL(urlObject);},10000); // Worker does not work if urlObject is removed to early.
	return worker;
}
