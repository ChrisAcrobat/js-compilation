'use strict'
function setLocalStorageValue(storage='', key='', value)
{
	value = JSON.stringify(value);
	value = encodeURIComponent(value);
	localStorage.setItem(storage + '.' + key, value);
}
function getLocalStorageValue(storage='', key='')
{
	var value = localStorage.getItem(storage + '.' + key);
	value = decodeURIComponent(value);
	value = JSON.parse(value);
	return value === 'null' ? '' : value;
}