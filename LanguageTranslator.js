'use strict'
/**
 * Documentation: https://www.i18next.com/overview/
 * 
 * <element class="LanguageString">%LANGUAGE_STRING%</element>
 * <element class="LanguageString" value="%LANGUAGE_STRING%"/>
*/
if(typeof i18next_packages === 'undefined'){
	var i18next_packages = ['https://unpkg.com/i18next/i18next.min.js', 'https://unpkg.com/i18next-xhr-backend/i18nextXHRBackend.js'];
}
class LanguageTranslator
{
	constructor(namespaces=Array(), callbackWhenDone)
	{
		if(typeof i18next === 'undefined')
		{
			hideScreen(true);
			i18next_packages.forEach(url => {
				let scriptDoesNotExist = 0 === Array.from(document.getElementsByTagName('script')).filter(script => script.src === url).length;
				if(scriptDoesNotExist)
				{
					var script = document.createElement('script');
					script.src = url;
					document.getElementsByTagName('head')[0].appendChild(script);
					script.type = 'text/javascript';

					if(script.readyState)
					{	//IE
						script.onreadystatechange = function()
						{
							if(script.readyState === 'loaded' || script.readyState === 'complete')
							{
								script.onreadystatechange = null;
								init(url);
							}
						};
					}
					else
					{	//Others
						script.onload = function(){init(url);};
						script.error = function(){console.log('i18next is not loaded.');};
					}
				}
				else
				{
					postInitAdd(function(){hideScreen(false);});
				}
			});
		}
		function init(url)
		{
			i18next_packages = i18next_packages.filter(package_sub => package_sub !== url);
			if(0 < i18next_packages.length){return;}
			else if(!!i18next._isInitialized)
			{
				if(0 < namespaces.length)
				{
					loadNamespaces(namespaces);
				}
			}
			else
			{
				if(-1 === namespaces.findIndex(item => item === '_common'))
				{
					namespaces.push('_common');
				}

				i18next
					.use(i18nextXHRBackend)
					.init(
						{
							fallbackLng: 'en',
							debug: true,
							ns: namespaces,
							defaultNS: '_common',
							backend: {
								loadPath: '/res/languageStrings/{{lng}}/{{ns}}.json',
								crossDomain: false
							}
						},
						function(error, t)	// t is equelliant i18next.t
						{
							if(!error in [null, undefined]){
								console.error(error);
							}

							i18next.on('languageChanged', function(language){
								translateAll();
								if(!i18next._isInitialized){
									hideScreen(false);
									i18next._isInitialized = true;
								}
							});
							setLanguage(getLanguage());
						}
					);
			}
		}
		function hideScreen(doHide)
		{
			if(callbackWhenDone === undefined)
			{
				if(doHide)
				{
					let loadingScreen_background = document.createElement('iframe');
					loadingScreen_background.className = 'LanguageTranslator-LoadingScreen';
					loadingScreen_background.srcdoc = '<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="mobile-web-app-capable" content="yes"><style>.center{position: absolute;left: 50%;top: 50%;transform: translate(-50%, -50%);}/* Source: http://css-spinners.com/css/spinner/spinner.css */@-moz-keyframes spinner-loader{0%{-moz-transform: rotate(0deg);transform: rotate(0deg);}100%{-moz-transform: rotate(360deg);transform: rotate(360deg);}}@-webkit-keyframes spinner-loader{0%{-webkit-transform: rotate(0deg);transform: rotate(0deg);}100%{-webkit-transform: rotate(360deg);transform: rotate(360deg);}}@keyframes spinner-loader{0%{-moz-transform: rotate(0deg);-ms-transform: rotate(0deg);-webkit-transform: rotate(0deg);transform: rotate(0deg);}100%{-moz-transform: rotate(360deg);-ms-transform: rotate(360deg);-webkit-transform: rotate(360deg);transform: rotate(360deg);}}/* :not(:required) hides this rule from IE9 and below */.spinner-loader:not(:required){-moz-animation: spinner-loader 1500ms infinite linear;-webkit-animation: spinner-loader 1500ms infinite linear;animation: spinner-loader 1500ms infinite linear;-moz-border-radius: 0.5em;-webkit-border-radius: 0.5em;border-radius: 0.5em;-moz-box-shadow: rgba(0, 0, 51, 0.3) 1.5em 0 0 0, rgba(0, 0, 51, 0.3) 1.1em 1.1em 0 0, rgba(0, 0, 51, 0.3) 0 1.5em 0 0, rgba(0, 0, 51, 0.3) -1.1em 1.1em 0 0, rgba(0, 0, 51, 0.3) -1.5em 0 0 0, rgba(0, 0, 51, 0.3) -1.1em -1.1em 0 0, rgba(0, 0, 51, 0.3) 0 -1.5em 0 0, rgba(0, 0, 51, 0.3) 1.1em -1.1em 0 0;-webkit-box-shadow: rgba(0, 0, 51, 0.3) 1.5em 0 0 0, rgba(0, 0, 51, 0.3) 1.1em 1.1em 0 0, rgba(0, 0, 51, 0.3) 0 1.5em 0 0, rgba(0, 0, 51, 0.3) -1.1em 1.1em 0 0, rgba(0, 0, 51, 0.3) -1.5em 0 0 0, rgba(0, 0, 51, 0.3) -1.1em -1.1em 0 0, rgba(0, 0, 51, 0.3) 0 -1.5em 0 0, rgba(0, 0, 51, 0.3) 1.1em -1.1em 0 0;box-shadow: rgba(0, 0, 51, 0.3) 1.5em 0 0 0, rgba(0, 0, 51, 0.3) 1.1em 1.1em 0 0, rgba(0, 0, 51, 0.3) 0 1.5em 0 0, rgba(0, 0, 51, 0.3) -1.1em 1.1em 0 0, rgba(0, 0, 51, 0.3) -1.5em 0 0 0, rgba(0, 0, 51, 0.3) -1.1em -1.1em 0 0, rgba(0, 0, 51, 0.3) 0 -1.5em 0 0, rgba(0, 0, 51, 0.3) 1.1em -1.1em 0 0;display: inline-block;font-size: 32px;width: 1em;height: 1em;margin: 1.5em;overflow: hidden;text-indent: 100%;}</style></head><body><div class="center"><div class="spinner-loader"></div></div></body></html>';
					loadingScreen_background.style.position = 'fixed';
					loadingScreen_background.style.width = '100%';
					loadingScreen_background.style.height = '100%';
					loadingScreen_background.style.border = 0;
					loadingScreen_background.style.margin = 0;
					loadingScreen_background.style.left = 0;
					loadingScreen_background.style.top = 0;
					loadingScreen_background.style.zIndex = '100000';
					loadingScreen_background.style.backdropFilter = 'blur(10px)';

					window.requestAnimationFrame(function(){
						let body = document.getElementsByTagName('body')[0];
						body.appendChild(loadingScreen_background);
					});
				}
				else
				{
					Array.from(document.getElementsByClassName('LanguageTranslator-LoadingScreen')).forEach(element => {
						element.parentElement.removeChild(element);
					});
				}
			}
			else if(!doHide)
			{
				callbackWhenDone();
			}
		}
		function postInitAdd(callback=function(){})	// Not in use, maybe not needed? (Keep if in case of code crash on some page.)
		{
			setTimeout(function()
			{
				if(typeof i18next !== 'undefined' && i18next.isInitialized)
				{
					callback();
				}
				else
				{
					postInitAdd(callback);
				}
			}, 1);
		}

		// Methods
		this.translateAll = function(){translateAll();}
		function translateAll()
		{
			let properties = ['innerHTML', 'value'];
			let elements = document.getElementsByClassName('LanguageString');
			let length = elements.length;
			for(let index = 0; index < length; index++)
			{
				const element = elements[index];
				let storedLanguageStrings = element.dataset.languageStrings;
				storedLanguageStrings = storedLanguageStrings === undefined ? {} : JSON.parse(storedLanguageStrings);

				properties.forEach(property => {
					const storedLanguageString = storedLanguageStrings[property];
					if(storedLanguageString === undefined)
					{
						let languageString = element[property];
						let firstAndLastCharIsPercentSign = /^(%).*\1$/.test(languageString);
						if(firstAndLastCharIsPercentSign && 2 < languageString.length)
						{
							let unescapedLanguageString = languageString.substring(1, languageString.length-1);
							element[property] = translate(unescapedLanguageString);

							storedLanguageStrings[property] = unescapedLanguageString;
							element.dataset.languageStrings = JSON.stringify(storedLanguageStrings);
						}
					}
					else
					{
						element[property] = translate(storedLanguageString);
					}
				});
			}
		}
		this.translate = function(languageString='', language=''){return translate(languageString, language);}
		function translate(languageString='', language='')
		{
			let previousLanguage = undefined;
			if(language !== ''){
				previousLanguage = getLanguage();
				setLanguage(language);
			}
			let returnString = i18next.t(languageString);
			if(previousLanguage !== undefined){
				setLanguage(previousLanguage);
			}
			return returnString;
		}
		this.getLanguage = function(){return getLanguage();}
		function getLanguage()
		{
			var value = localStorage.getItem('LanguageTranslator.LanguageString');
			return value === null ? navigator.language || navigator.userLanguage : value;
		}
		this.setLanguage = function(language=''){setLanguage(language);}
		function setLanguage(language='')
		{
			localStorage.setItem('LanguageTranslator.Language', language);
			i18next.changeLanguage(language);
		}
		this.setLanguage = function(language=''){setLanguage(language);}
		function setLanguage(language='')
		{
			localStorage.setItem('LanguageTranslator.Language', language);
			i18next.changeLanguage(language);
		}
		this.loadNamespaces = function(namespaces=Array()){loadNamespaces(namespaces);}
		function loadNamespaces(namespaces=Array())
		{
			i18next.loadNamespaces(
				namespaces,
				function(error, t)	// t is equelliant i18next.t
				{
					if(!error in [null, undefined]){
						console.error(error);
					}

					translateAll();
				}
			);
		}
	}
}