'use strict'
class Line
{
	constructor(pos_1=new Position(), pos_2=new Position(), color=new Color(), layer=0)
	{
		this.pos_1 = pos_1;
		this.pos_2 = pos_2;
		this.color = color;
		this.layer = layer;

		// Methods
		this.getAngle = function()
		{
			return undefined;
		}

		this.getLength = function()
		{
			return this.pos_1.getDistance(this.pos_2);
		}
	}
}