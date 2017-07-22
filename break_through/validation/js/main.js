// Modelの作成(オブサーバー)
function AppModel(attrs){
    this.val = "";
    // 各データー属性ががなかったら各初期値を代入
    this.attrs = {
        required : attrs.required || false,
        maxlength : attrs.maxlength || 8,
        minlength : attrs.minlength || 4
    };
    // オブサーバーの機能
    this.listeners = {
        valid : [],
        invalid : []
    };
}

AppModel.prototype.set = function(val){
    // 比較した後に、this.valにvalを代入
    if(this.val === val) return;
    this.val = val;
    this.validate();
}

AppModel.prototype.validate = function(){
    var val;
    this.errors = [];


    for(var key in this.attrs){
        // keyを取得
        val = this.attrs[key];

        // AppModelの各メソッドを取り出し,valの引数を渡して実行
        if(!this[key](val)) this.errors.push(key);
    }

    //errorの中身が空であればvalidイベントを通知する
    this.trigger(!this.errors.length ? "valid" : "invalid");
}

AppModel.prototype.on = function(event, func){
    this.listeners[event].push(func);
}

AppModel.prototype.trigger = function(event){
    $.each(this.listeners[event],function(){
        // eventを実行(validかinvaidが入ってくる)
        this();
    });
}


// 値が空かどうかを判定
AppModel.prototype.required = function(){
    return this.val !== "";
}

// 値の文字数が引数num以下かどうかの判定
AppModel.prototype.maxlength = function(num){
    return num >= this.val.length;
}

AppModel.prototype.minlength = function(num){
    return num <= this.val.length;
}

// viewを作成
function AppView(el){
    //AppViewが呼び出された時
    this.initialize(el);
    this.handleEvents();
}

AppView.prototype.initialize = function(el){
    //inputタグ
    this.$el = $(el);

    // inputタグに付随するerror文の取得
    this.$list = this.$el.next().children();

    // inputタグに付与されているデータ属性の取得
    var obj = this.$el.data();

    // required属性があったら,requiredをtrueにする(objにrequiredのkeyを付与する)
    if(this.$el.prop("required")){
        obj["required"] = true;
    }

    // objを引数にしてAppModelをインスタンス化する
    this.model = new AppModel(obj);
}

AppView.prototype.handleEvents = function(){
    var self = this;

    this.$el.on("keyup", function(e){
        self.onKeyup(e);
    });

    this.model.on("valid",function(){
        self.onValid();
    });

    this.model.on("invalid", function(){
        self.onInvalid();
    });
}

AppView.prototype.onKeyup = function(e){
    var $target = $(e.currentTarget);

    // フォームに入った文字をAppModel.setの引数として与える
    this.model.set($target.val());
}

AppView.prototype.onValid = function(){
    this.$el.removeClass("error");
    this.$list.hide();
}

AppView.prototype.onInvalid = function(){
    var self = this;
    this.$el.addClass("error");
    this.$list.hide();

    $.each(this.model.errors, function(index, val){
        self.$list.filter("[data-error=\"" + val + "\"]").show();
    });
}


$("input").each(function(){
    //inputタグの数だけループしてAPPViewをインスタンス化させる
    new AppView(this);
})