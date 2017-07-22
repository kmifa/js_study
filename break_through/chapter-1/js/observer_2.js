// オブサーバー 複数イベント
function Observer(){
    this.listeners = {};
}

// イベントを通知したい関数を追加する
Observer.prototype.on = function(event,func){
    if(! this.listeners[event]){
        this.listeners[event] = [];
    }
    this.listeners[event].push(func);
    console.log(this.listeners);
};

// 指定されたオブサーバーを検索して削除する
Observer.prototype.off = function(event,func){
    var ref = this.listeners[event];
    var len = ref.length;

    for(var i = 0; i < len; i++){
        var listener = ref[i];
        if(listener === func){
            ref.splice(i,1);
        }
    }
};

// オブサーバーのリスト全体を反復処理し、実効する
Observer.prototype.trigger = function(event){
    var ref = this.listeners[event];
    console.log(ref);

    for(var i = 0, len = ref.length; i < len; i++){
        var listener = ref[i];
        if(typeof listener === 'function') listener();
    }
};


// 実行
var observer = new Observer();
var greet = function(){
    console.log("Good morning");
};

observer.on("morning",greet);
observer.trigger("morning");

var sayEvening = function(){
    console.log("Good evening");
};

observer.on("evening", sayEvening);
observer.trigger("evening");