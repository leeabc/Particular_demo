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

	this.render = function(contex, imageObj){
		if(!imageObj){
			particleArr.forEach(function(obj){
				contex.beginPath();
				contex.fillStyle = "black";
				contex.arc(obj.position.x, obj.position.y, 5, 0, Math.PI*2, true);
				contex.closePath();
				contex.fill();
			});
		}else{
			particleArr.forEach(function(obj){
				contex.drawImage(imageObj, obj.position.x, obj.position.y ,160 , 120)
			});
		}
	};

	this.collision = function(x1, y1, x2, y2){
		particleArr = particleArr.map(function(obj){
			if(obj.position.x < x1 || obj.position.x > x2){
				obj.velocity.x = -obj.velocity.x;
			}
			if(obj.position.y < y1 || obj.position.y > y2){
				obj.velocity.y = -obj.velocity.y;
			}
			return obj;
		});
	};
};