// オブサーバー
function Observer(){
    this.listeners = [];
}

// イベントを通知したい関数を追加する
Observer.prototype.on = function(func){
    this.listeners.push(func);
};

// 指定されたオブサーバーを検索して削除する
Observer.prototype.off = function(func){
    var len = this.listeners.length;

    for(var i = 0; i < len; i++){
        var listeners = this.listeners[i];
        if(listeners === func){
            this.listeners.splice(i,1);
        }
    }
};

// オブサーバーのリスト全体を反復処理し、実効する
Observer.prototype.trigger = function(event){
    var len = this.listeners.length;

    for(var i = 0; i < len; i++){
        var listeners = this.listeners[i];
        listeners();
    }
};

var observer = new Observer();
var greet = function(){
    console.log("Good Morning");
};

observer.on(greet);
observer.trigger();