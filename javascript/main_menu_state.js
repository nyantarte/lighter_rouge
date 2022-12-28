class MainMenuState extends State{


    init(){
        super.init();
        this.#create_menu();
    }


    #create_menu(){
        var item=document.createElement("input");
        item.type="button";
        item.value="友達"
        document.body.appendChild(item);
        item=document.createElement("input");
        item.type="button";
        item.value="倉庫";
        document.body.appendChild(item);
        item=document.createElement("input");
        item.type="button";
        item.value="ダンジョン";
        item.onclick=this.#move_dungeon_state;
        document.body.appendChild(item);
    }

    #move_dungeon_state(){
        app.set_state(new DungeonState());
    }
}