

class DungeonObject{
    pos=Point.ZERO;
    image=new QuadObject();
}

class CharactorSpec{

}
class CharactorObject extends DungeonObject{
    name="";
    cur_spec=new CharactorSpec();


    static create_from_pos(pos){
        var r=new CharactorObject();
        r.pos=pos;
        return r;
    }
}
