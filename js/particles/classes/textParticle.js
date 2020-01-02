function textParticle (x,y, sx, sy) {
    
        var mouse = {}
        var radius = Math.max((window.innerWidth / 20), 60)
    
        this.x = sx ? sx : Math.random() * window.innerWidth
        this.y = sy ? sy : Math.random() * window.innerHeight
        this.r = Math.min(Math.max(Math.round(window.innerWidth / 200),3),30)
    
        this.dest = {
            x: Math.random() > 0.5 ? x + Math.random() * (this.r / 2) : x - Math.random() * (this.r / 2),
            y: Math.random() > 0.5 ? y + Math.random() * (this.r / 2) : y - Math.random() * (this.r / 2)
        }
    
        this.vx = (Math.random()-0.5)*50
        this.vy = (Math.random()-0.5)*50
        this.accX = 0
        this.accY = 0
        this.friction = Math.random()*0.005 + 0.94
    
        this.color = window.random(COLORS.particleColorArray)
    
        this.update = (dt) => {
            this.accX = (this.dest.x - this.x)/800;
            this.accY = (this.dest.y - this.y)/800;
            this.vx += this.accX;
            this.vy += this.accY;
            this.vx *= this.friction;
            this.vy *= this.friction;
        
            this.x += this.vx;
            this.y += this.vy;
                
            var a = this.x - mouse.x;
            var b = this.y - mouse.y;
        
            var distance = Math.sqrt( a*a + b*b );
            if(distance<(radius)){
                this.accX = (this.x - mouse.x)/70;
                this.accY = (this.y - mouse.y)/70;
                this.vx += this.accX;
                this.vy += this.accY;
            }
        
        }
    
        this.draw = (ctx) => {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
            ctx.fill();
        }
    
        this.mouseMove = (x,y) => {
            mouse.x = x
            mouse.y = y
        }
    
        this.setStartPos = (x,y) => {
            this.x = x
            this.y = y
        }
    }
    