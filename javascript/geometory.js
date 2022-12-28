class Point{
    x=0;
    y=0;

    static ZERO=new Point(0,0);
    constructor(_x,_y){
        this.x=_x;
        this.y=_y;
    }
}
class Rect{
    x=0;
    y=0;
    w=0;
    h=0;

    static ZERO=new Rect(0,0,0,0);
    constructor(_x,_y,_w,_h){
        this.x=_x;
        this.y=_y;
        this.w=_w;
        this.h=_h;
    }
    toString(){
        return "Rect{x="+this.x.toString()+",y="+this.y.toString()+",w="+this.w.toString()+",h="+this.h.toString()+"}";

    }
}