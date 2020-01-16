var test1 = {};
var test2 = new Object();
var test3 = Object.create(Object.prototype);
var test4 = Object.create(null); console.log(test4.__proto__) //=>undefined 没有继承原型属性和方法
console.log(test1.__proto__ === test2.__proto__);//true
console.log(test1.__proto__ === test3.__proto__);//true
console.log(test2.__proto__ === test3.__proto__);//true
console.log(test1.__proto__ === test4.__proto__);//false
console.log(test2.__proto__ === test4.__proto__);//false
console.log(test3.__proto__ === test4.__proto__);//false
console.log(test1.a=5 , test4.a =5, test1.a ===test4.a);




// var o = Object.create(Object.prototype, {
//     // foo会成为所创建对象的数据属性
//     foo: { 
//       writable:true,
//       configurable:true,
//       value: "hello" 
//     },
//     // bar会成为所创建对象的访问器属性
//     bar: {
//       configurable: false,
//       get: function() { return 10 },
//       set: function(value) {
//         console.log("Setting `o.bar` to", value);
//       }
//     }
//   });
//   console.log(Object.prototype, o.bar);//{foo:'hello'}

//   const bbbb = function (params) {
//    return {}   
//   }
//   console.log(Object.prototype == bbbb);
  

//   const aaa = {
//     // foo会成为所创建对象的数据属性
//     foo: { 
//       writable:true,
//       configurable:true,
//       value: "hello" 
//     },
//     // bar会成为所创建对象的访问器属性
//     bar: {
//       configurable: false,
//       get: function() { return 10 },
//       set: function(value) {
//         console.log("Setting `o.bar` to", value);
//       }
//     }
//   }

//   console.log(new aaa);
  