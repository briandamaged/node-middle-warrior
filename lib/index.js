
const zelda = require('zelda-lists');


function compose(middleware) {
  return _compose(zelda(middleware));
}


function _compose(mw) {
  return function(ctx) {
    return mw.value(ctx, _compose(mw.next));
  };
}



function foo(ctx, next) {
  console.log(ctx);
  next(ctx + 1);
  console.log(ctx);
}


function bar(ctx) {
  console.log("BAR!");
}



const f = compose([foo, foo, foo, bar]);

f(0);


Object.assign(exports, {
  compose, _compose,
});
