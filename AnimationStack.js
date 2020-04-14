'use strict'
class AnimationStack
{
	constructor()
	{
		let ANIMATION_STACK = Array();

		// Methods
		this.add = function(callback, payload)
		{
			if(-1 === ANIMATION_STACK.indexOf(callback))
			{
				ANIMATION_STACK.push(callback);
				window.requestAnimationFrame(function(timespan)
				{
					ANIMATION_STACK = ANIMATION_STACK.filter(item => item !== callback);
					callback(timespan, payload);
				});
			}
		}
	}
}