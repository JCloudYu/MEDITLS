function Init(state) {
    this.state = state;
    console.log(state);
    
  }
  
  function Food(state) {
    Init.call(this);
    this.category = 'food';
    this.state = 2;
  }
  
  function Toy(state) {
    Init.call(this, state);
    this.category = 'toy';

  }
  
  const cheese = new Food(1, 5);
  const fun = new Toy('robot', 40);

  console.log(cheese, fun, Init());
  