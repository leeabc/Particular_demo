Vector = function(x, y) { this.x = x; this.y = y; };
 
Vector.prototype = {
    length : function() { return Math.sqrt(this.x * this.x + this.y * this.y); },
    add : function(v) { return new Vector(this.x + v.x, this.y + v.y); },
    subtract : function(v) { return new Vector(this.x - v.x, this.y - v.y); },
    multiply : function(f) { return new Vector(this.x * f, this.y * f); },
};