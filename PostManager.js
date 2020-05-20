'use strict'
class PostManager{
	constructor(){
		// Methods
		this.send = function(url='', postParameters={}, callback=function(data){}, callbackError=error=>console.error(error), readMethod='json', header={}){
			if(header.method === undefined){
				header.method = 'POST';
			}
			if(header.credentials === undefined){
				header.credentials = 'same-origin';
			}
			if(header.headers === undefined){
				header.headers = {};
			}
			if(header.headers['Content-Type'] === undefined){
				header.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
			}

			if(-1 < ['GET', 'HEAD'].findIndex(function(method){return method === header.method.toUpperCase()})){
				delete header.body;
			}else if(header.body === undefined){
				let bodyMessage = '';
				for(const key in postParameters){
					if(postParameters.hasOwnProperty(key)){
						const value = postParameters[key];
						bodyMessage += bodyMessage !== '' ? '&' : '';
						bodyMessage += key + '=' + (typeof value === "string" ? value : JSON.stringify(value));
					}
				}
				header.body = bodyMessage;
			}

			return fetch(new Request(url, header))
			.then(response => response[readMethod]())
			.then(data => callback(data))
			.catch(error => callbackError(error));
		}
	}
}
