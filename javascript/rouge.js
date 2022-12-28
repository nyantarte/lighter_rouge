
const INVALID_GRID=-1;

const ROOM_ROLL_INVALID=-1;
const ROOM_ROLL_START=0;
const ROOM_ROLL_STAIR=1;
const ROOM_MIN_SIZE=2;
class Room{
    rect=Rect.ZERO;
    roll=ROOM_ROLL_INVALID;
    roll_pos=null;
    constructor(_rect){
        this.rect=_rect;
    }
}

class Rouge{
    grids_state=Array(ROUGE_GRID_X_NUM*ROUGE_GRID_Y_NUM);
    room_rect=Array(ROUGE_SPLIT_NUM);
    objects=Array(ROUGE_SPLIT_NUM);
    
    init(){
        this.#init_rooms();
    }

    #init_rooms(){
        for(var i=0;i < ROUGE_GRID_Y_NUM;++i){
            for(var j=0;j < ROUGE_GRID_X_NUM;++j){
                this.grids_state[ROUGE_GRID_X_NUM*i+j]=INVALID_GRID;
            }
        }
        var hRoomNum=(ROUGE_SPLIT_NUM+1)/2;
        var wRoomNum=(ROUGE_SPLIT_NUM+1)/2;
        var baseRoomW=Math.floor(ROUGE_GRID_X_NUM/wRoomNum);
        var baseRoomH=Math.floor(ROUGE_GRID_Y_NUM/hRoomNum);
        for(var i=0; i < (hRoomNum-1);++i){
            for(var j=0;j < wRoomNum;++j){
                var r=this.#create_room_rect(baseRoomW*j,baseRoomH*i,baseRoomW,baseRoomH);
                this.room_rect[wRoomNum*i+j]=new Room(r);
            }
        }
        for(var i=0;i < ROUGE_SPLIT_NUM%2;++i){
            var r=this.#create_room_rect(baseRoomW*i,baseRoomH*(hRoomNum-1),baseRoomW,baseRoomH);
            this.room_rect[(hRoomNum-1)*wRoomNum+i]=new Room(r);
        }

        for(var i=0;i < ROUGE_SPLIT_NUM;++i){
            var r=this.room_rect[i].rect;
            for(var j=r.y;j < (r.y+r.h);++j){
                for(var k=r.x;k <(r.x+r.w);++k){
                    this.grids_state[j*ROUGE_GRID_X_NUM+k]=i;
                }
            }
            console.log(r.toString());
        }
        for(var i=0;i < (ROUGE_SPLIT_NUM-1);++i){
            var r1=this.room_rect[i].rect;
            var r2=this.room_rect[i+1].rect;
            this.#create_route(r1,r2);
        }

        var loop=true;
        while(loop){
            var i=Math.floor(Math.random()*this.room_rect.length);
            var r=this.room_rect[i];
            if(ROOM_ROLL_INVALID==r.roll){

                r.roll=ROOM_ROLL_START;
                var x=r.rect.x+Math.floor(Math.random()*r.rect.w);
                var y=r.rect.y+Math.floor(Math.random()*r.rect.h);
                r.roll_pos=new Point(x,y);
                loop=false;
            }
        }

        loop=true;
        while(loop){
            var i=Math.floor(Math.random()*this.room_rect.length);
            var r=this.room_rect[i];
            if(ROOM_ROLL_INVALID==r.roll){
                r.roll=ROOM_ROLL_STAIR;
                var x=r.rect.x+Math.floor(Math.random()*r.rect.w);
                var y=r.rect.y+Math.floor(Math.random()*r.rect.h);
                r.roll_pos=new Point(x,y);
                loop=false;
            }
        }
        for(var i=0;i < this.objects.length;++i){
            loop=true;
            var r=this.room_rect[i];
            while(loop){
                
                var x=r.rect.x+Math.floor(Math.random()*r.rect.w);
                var y=r.rect.y+Math.floor(Math.random()*r.rect.h);
                if(null==r.roll_pos || (x!=r.roll_pos.x && y!=r.roll_pos.y)){
                    this.objects[i]=CharactorObject.create_from_pos(new Point(x,y));
                    loop=false;
                
                }
            }
    
        }

    }
    #create_room_rect(x,y,w,h){
        var roomW=Math.floor(Math.random()*w);
        roomW=Math.max(roomW,ROOM_MIN_SIZE);
        //console.log(roomW);
        var roomH=Math.floor(Math.random()*h);
        roomH=Math.max(roomH,ROOM_MIN_SIZE);
        var roomX=Math.floor(Math.random()*(w-roomW))+x;
        var roomY=Math.floor(Math.random()*(h-roomH))+y;
        return new Rect(roomX,roomY,roomW,roomH);
    }
    #create_route(r1,r2){
        var _x1 = r1.x +Math.floor( r1.w / 2);
	    var _y1 = r1.y + Math.floor(r1.h / 2);
	    var _x2= r2.x + Math.floor(r2.w / 2);
	    var _y2= r2.y + Math.floor(r2.h / 2);
        console.log("_x1="+_x1.toString()+",_y1="+_y1.toString()+",_x2="+_x2.toString()+",_y2="+_y2.toString());

	    var x1 = _x1 + 0.5;
	    var y1 = _y1 + 0.5;
	    var x2 = _x2 + 0.5;
	    var y2 = _y2 + 0.5;

	    var x = x1;
	    var y = y1;

	    var cell_w = 1.0;
	    var cell_h = 1.0;
	    var step_x = 0 < (x2 - x1)?1:-1;
	    var step_y = 0 < (y2 - y1)?1:-1;
        //console.log("step_x="+step_x.toString()+",step_y="+step_y.toString());
	    var delta_x = cell_w / Math.abs(x2 - x1);
	    var delta_y = cell_h / Math.abs(y2 - y1);
	    var tmp=(x1 / cell_w);
	    var max_x = delta_x ;//* (tmp>=0)?Math.floor(tmp):Math.ceil(tmp);
        //console.log("tmp="+tmp.toString()+",Math.floor(tmp)="+Math.floor(tmp).toString()+",Math.ceil(tmp)"+Math.ceil(tmp).toString());
        //console.log("delta_x="+delta_x.toString()+",max_x="+max_x.toString());
        tmp=(y1 / cell_h);
	    var max_y = delta_y ;//* (tmp>=0)?Math.floor(tmp):Math.ceil(tmp);
        //console.log("tmp="+tmp.toString()+",Math.floor(tmp)="+Math.floor(tmp).toString()+",Math.ceil(tmp)"+Math.ceil(tmp).toString());
        //console.log("delta_y="+delta_y.toString()+",max_y="+max_y.toString());
        var idx=Math.floor(y)*ROUGE_GRID_X_NUM+Math.floor(x);
        if(INVALID_GRID== this.grids_state[idx]){
	        this.grids_state[idx] = ROUGE_SPLIT_NUM;
        }
	    var reached_x = false;
	    var reached_y = false;

	    while( !(reached_x && reached_y)) {

		    if (max_x < max_y){
			    max_x += delta_x;
			    x += step_x ;
                //console.log("x="+x.toString());
		    }
		    else {
			    max_y += delta_y;
			    y += step_y ;
                //console.log("y="+y.toString());
		    }

		    //this.grids_state[Math.floor(y)*ROUGE_GRID_X_NUM+ Math.floor(x)] = ROUGE_SPLIT_NUM;

            idx=Math.floor(y)*ROUGE_GRID_X_NUM+Math.floor(x);
            if(INVALID_GRID== this.grids_state[idx]){
	            this.grids_state[idx] = ROUGE_SPLIT_NUM;
            }
    		if ((step_x > 0 && x >= x2) ||
			    (step_x <= 0 && x <= x2)) {
			    reached_x = true;
		    }
		    if ((step_y > 0 && y >= y2) ||
			    (step_y <= 0 && y <= y2)) {
			    reached_y = true;
		    }
	    }
    }
    onPaint(ctx){

        var clr_tbl=[
            "white",
            "red",
            "green",
            "blue"

        ];
        var roll_clr_tbl=[
            "gray",
            "purple",
            "orange"

        ];
        ctx.fillStyle="white";
        var gridW=Math.floor(CANVAS_WIDTH/ROUGE_GRID_X_NUM);
        var gridH=Math.floor(CANVAS_HEIGHT/ROUGE_GRID_Y_NUM);
       /*for(var i=0;i < this.room_rect.length;++i){
            var r=this.room_rect[i];
            //console.log(r.toString());
            ctx.fillRect(r.x*gridW,r.y*gridH,(r.x+r.w)*gridW,(r.y+r.h)*gridH);
        }*/
        
       for(var i=0;i < ROUGE_GRID_Y_NUM;++i){
        for(var j=0;j < ROUGE_GRID_X_NUM;++j){
            //console.log(i*ROUGE_GRID_X_NUM+j);
            var id=this.grids_state[i*ROUGE_GRID_X_NUM+j];
            //console.log(id);
            if(INVALID_GRID!=id){
                ctx.fillStyle=clr_tbl[id];
                ctx.fillRect(j*gridW,i*gridH,gridW,gridH);
                
            }
        }
       }
        for(var i=0;i < this.room_rect.length;++i){
            var r=this.room_rect[i];
            switch(r.roll){
                case ROOM_ROLL_START:{
                    ctx.fillStyle=roll_clr_tbl[0];
                }break;
                case ROOM_ROLL_STAIR:{
                    ctx.fillStyle=roll_clr_tbl[1];
                }break;
                default:
                    continue;
            }
            ctx.fillRect(r.roll_pos.x*gridW,r.roll_pos.y*gridH,gridW,gridH);
        }

        ctx.fillStyle=roll_clr_tbl[2];
        for(var i=0;i < this.objects.length;++i){
            var o=this.objects[i];
            ctx.fillRect(o.pos.x*gridW,o.pos.y*gridH,gridW,gridH);

        }

    }
}