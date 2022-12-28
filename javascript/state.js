class State{

    init(){
        this.remove_nodes();
    }

    remove_nodes(){
        //現在の画面を削除
        while(0 < document.body.childNodes.length){
            document.body.childNodes[0].remove();
        }

    }

    onTimer(){}
}