class DungeonState extends State{
    #rouge=new Rouge();

    init(){
        this.remove_nodes();
        var canvas=document.createElement("canvas");
        canvas.width=CANVAS_WIDTH;
        canvas.height=CANVAS_HEIGHT;
        document.body.appendChild(canvas);
        this.#rouge.init();

    }
    onTimer(){
        var canvas=document.querySelector("canvas");
        var ctx = canvas.getContext('2d');
        ctx.fillStyle="black";
        ctx.fillRect(0,0,640,480);
        this.#rouge.onPaint(ctx);
    }
}