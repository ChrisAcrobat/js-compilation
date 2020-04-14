'use strict'
class Color
{
	constructor(r=0, g=0, b=0, a=255)
	{
		if(r instanceof Color)
		{
			let colorOrigin = r;
			r = colorOrigin.R;
			g = colorOrigin.G;
			b = colorOrigin.B;
			a = colorOrigin.A;
		}
		else if(typeof r === 'string')
		{
			let colorString = r;

			if(colorString[0] === '#')
			{
				colorString = colorString.substr(1);
			}

			if(6 <= colorString.length)
			{
				r = parseInt(colorString.substr(0, 2), 16);
				g = parseInt(colorString.substr(2, 2), 16);
				b = parseInt(colorString.substr(4, 2), 16);
			}
			else if(3 <= colorString.length)
			{
				r = parseInt(colorString[0], 16)*16;
				g = parseInt(colorString[1], 16)*16;
				b = parseInt(colorString[2], 16)*16;
			}
			
			if(8 <= colorString.length)
			{
				a = parseInt(colorString.substr(6, 2), 16);
			}
		}

		this.R = r;
		this.G = g;
		this.B = b;
		this.A = a;

		// Methods
		this.toRGBAString = function()
		{
			var red = 	Math.floor(Math.max(Math.min(this.R, 255), 0));
			var green = Math.floor(Math.max(Math.min(this.G, 255), 0));
			var blue = 	Math.floor(Math.max(Math.min(this.B, 255), 0));
			var alpha = Math.floor(Math.max(Math.min(this.A, 255), 0))/255;

			return 'rgba(' + red + ',' + green + ',' + blue + ',' + alpha + ')';
		}

		this.toString = function()
		{
			return this.A < 255 ? this.toHexStringRGBA() : this.toHexStringRGB();
		}

		this.toHexStringRGB = function()
		{
			var red = 	Math.floor(Math.max(Math.min(this.R, 255), 0)).toString(16);
			var green = Math.floor(Math.max(Math.min(this.G, 255), 0)).toString(16);
			var blue = 	Math.floor(Math.max(Math.min(this.B, 255), 0)).toString(16);

			red = 1 < red.length ? red : '0' + red;
			green = 1 < green.length ? green : '0' + green;
			blue = 1 < blue.length ? blue : '0' + blue;

			return '#' + red + green + blue;
		}

		this.toHexStringRGBA = function()
		{
			var alpha = Math.floor(Math.max(Math.min(this.A, 255), 0)).toString(16);
			alpha = 1 < alpha.length ? alpha : '0' + alpha;

			return this.toHexStringRGB() + alpha;
		}

		/** Source (modified): https://gist.github.com/mjackson/5311256
		* Converts an HSL color value to RGB. Conversion formula
		* adapted from http://en.wikipedia.org/wiki/HSL_color_space.
		* Assumes h, s, and l are contained in the set [0, 1] and
		* returns r, g, and b in the set [0, 255].
		*
		* @param   Number  h       The hue
		* @param   Number  s       The saturation
		* @param   Number  l       The lightness
		* @return  Array           The RGB representation
		*/
		this.hslToRgb = function(h, s, l)
		{
			var r, g, b;

			if(s == 0)
			{
				r = g = b = l; // achromatic
			}
			else
			{
				function hue2rgb(p, q, t)
				{
					if (t < 0) t += 1;
					if (t > 1) t -= 1;
					if (t < 1/6) return p + (q - p) * 6 * t;
					if (t < 1/2) return q;
					if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
					return p;
				}

				var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
				var p = 2 * l - q;

				r = hue2rgb(p, q, h + 1/3);
				g = hue2rgb(p, q, h);
				b = hue2rgb(p, q, h - 1/3);
			}

			return new Color(r * 255, g * 255, b * 255);
		}
	}
}