ParticleSystem = function(){
	particleArr = [];
	this.gravity = new Vector(0, 100);
	var limit = 0;

	this.setLimit = function(num){
		limit = num;
	};

	this.addParticle = function(particle){
		if(limit <= 0 || particleArr.length < limit){
			particleArr.push(particle);
		}
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
				contex.fillStyle = obj.color;
				contex.arc(obj.position.x, obj.position.y, obj.size, 0, Math.PI*2, true);
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
			if(obj.position.x - obj.size < x1 || obj.position.x + obj.size > x2){
				obj.velocity.x = -obj.velocity.x;
			}
			if(obj.position.y - obj.size < y1 || obj.position.y + obj.size > y2){
				obj.velocity.y = -obj.velocity.y;
			}
			return obj;
		});
	};


	this.fadeOutByAge = function(){
		particleArr = particleArr.map(function(obj){
			var alpha = 1 - (obj.age / obj.life);
			//console.log(alpha);
			obj.color = obj.color.replace(/[-+]?[0-9]*\.?[0-9]*\)/, alpha + ")");
			return obj;
		});
	};

	//for wave
	this.applyWave = function(timer, waveLevel){
		particleArr = particleArr.map(function(obj, index){
			var theta = index/3 + timer;
			var frequency = 50;

			obj.position.x = index + obj.age;
			obj.position.y = Math.sin((theta/frequency))*waveLevel + 150;
			return obj;
		});
	}

	this.renderWave = function(contex, size, color, canvasHeight){
		particleArr.forEach(function(obj){
			var gradient=contex.createLinearGradient(obj.position.x ,obj.position.y, obj.position.x, 500);			
			gradient.addColorStop(0, color);
			gradient.addColorStop(1, "white");

			contex.fillStyle = gradient;
			contex.fillRect(obj.position.x, obj.position.y, size, 500);
		});
	};
};