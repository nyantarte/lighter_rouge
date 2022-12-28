
const CANVAS_WIDTH=640;
const CANVAS_HEIGHT=480;
const FPS_NUM=15;
const TIME_PER_FRAME=1000/FPS_NUM;
const ROUGE_GRID_X_NUM=17;
const ROUGE_GRID_Y_NUM=13;
const ROUGE_SPLIT_NUM=3;
class App{

    state_stack=[new MainMenuState()];/*!遷移状態を管理するスタック*/
     /**
     * 
     * @returns 現在のアプリケーションの状態を返す
     */
    get_state(){
        return this.state_stack[this.state_stack.length-1];
    }
    set_state(new_state){
        new_state.init();
        this.state_stack.push(new_state);
    }

    is_state_exist(){
        return 0 < this.state_stack.length;
    }
    update(){
        this.get_state().onTimer();
     
    }
}
var app=new App();
function app_onTimeout(){
    app.update();
    setTimeout(app_onTimeout,TIME_PER_FRAME);

}
setTimeout(app_onTimeout,TIME_PER_FRAME);
