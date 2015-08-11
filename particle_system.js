ParticleSystem = function(){
	var particleArr = [];
	this.gravity = new Vector(0, 100);

	this.addParticle = function(particle){
		particleArr.push(particle);
	};

	this.removeParticle = function(dt){
		particleArr = particleArr.map(function(obj){
			obj.age += dt;
			return obj;
		}).filter(function(obj){
			if(obj.age >= obj.life){
				return false;
			}else{
				return true;
			}
		});
	};

	this.applyGravity = function(){
		particleArr = particleArr.map(function(obj){
			obj.acceleration = this.gravity;
		});
	};

	this.calPosition = function(dt){
		particleArr = particleArr.map(function(obj){
			obj.position = obj.position.add(obj.velocity.multiply(dt));
			obj.velocity = obj.velocity.add(obj.acceleration.multiply(dt));
			return obj;
		});
	};

	this.render = function(contex){
		particleArr.forEach(function(obj){
			contex.beginPath();
			contex.fillStyle = "black";
			contex.arc(obj.position.x, obj.position.y, 5, 0, Math.PI*2, true);
			contex.closePath();
			contex.fill();
		});
	};
};