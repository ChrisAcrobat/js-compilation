'use strict'
class Position
{
	constructor(x=0, y=0)
	{
		this.X = x;
		this.Y = y;

		// Methods
		this.getDistance = function(position)
		{
			return Math.sqrt(Math.pow(this.X - position.X, 2) + Math.pow(this.Y - position.Y, 2));
		}
	}
}