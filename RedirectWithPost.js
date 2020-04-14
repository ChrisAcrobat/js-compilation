'use strict'

class RedirectWithPost
{
	constructor(url='', parameters={})
	{
		let _url = url;
		let _parameters = parameters;

		// Methods
		this.setURL = function(url=''){_url = url;}
		this.setParameter = function(key='', value=''){_parameters[key] = value;}
		this.removeParameter = function(key='', value=''){delete _parameters[key];}
		this.send = function()
		{
			var form = document.createElement('form');
			form.setAttribute('method', 'POST');
			form.setAttribute('action', url);

			var input = document.createElement('input');
			for(const key in _parameters)
			{
				input.setAttribute(key, _parameters[key]);
				form.appendChild(input);
			}

			document.body.appendChild(form);
			form.submit();
		}
	}
}