function createEnterFunc(path){
  return function enter($el, action, prev, next) {
    return $.ajax({
        url: path,
        dataType: "html"
      }).then( function( d ){

        var content = $( d ).filter("article").find(".inner");
        $el.html( content );

        return action();
      });
  }
}

myRouter.add( "1", $(".page1").detach() );
myRouter.add( "2", $("<section class='page page2'/>"), createEnterFunc("./page2.html") );
myRouter.add( "3", $("<section class='page page3'/>"), createEnterFunc("./page3.html") );
myRouter.add( "4", $("<section class='page page4'/>"), createEnterFunc("./page4.html") );

myRouter.start();
