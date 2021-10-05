const assert = require('assert');
const Registration = require('../services/reg');
//const greets = require('../routes/greeting-service');
const pg = require("pg");
const Pool = pg.Pool;


const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/registration';


const pool = new Pool({
    connectionString
});

beforeEach(async function(){
    console.log("*****");
    await pool.query("delete from regnumber;");
});





describe('Registrations Webapp: Setting registration plates format' ,async function(){


it("should take in registration number 'CA-12345' " ,async function(){
    let Reg1 = Registration(pool);
    
    await Reg1.setPlate("CA12345")

        assert.deepEqual([{ "reg_number": 'CA12345' }], await Reg1.getRegList())

});
// it('should take in the name Penny and use isiXhosa language to greet her' ,async function(){
//     let greet1 =greetings(pool);
//     await greet1.greetNow('isiXhosa','Penny')


//      assert.equal("Molo, Penny!",greet1.getGreet());


// });
})



// describe('Greet exercise:Counter setting' ,async function(){
//     it('should take in one name and return counter as one' , async function(){
//         var greet1 = greetings(pool);
       

       

//         await greet1.greetNow('English','Amy');
        


//          assert.equal(1,await greet1.getCounter());

// });

// it('should take in five different names and return counter as 5' , async function(){
   
//     var greet2 = greetings(pool);


    
//     await greet2.greetNow('English','Amy');
//     await greet2.greetNow('English','Peggy');
//     await greet2.greetNow('Afrikaans','Penny');
//     await greet2.greetNow('isiXhosa','Enhle');
//     await greet2.greetNow('isiXhosa','Mbali');



//      assert.equal(5,await greet2.getCounter());


// });

// it('should take in five  names with two duplicates and return counter as 3' , async function(){
  
//     var greet2 = greetings(pool);


//     await greet2.greetNow('English','Amy');
//     await greet2.greetNow('English','Amy');
//     await greet2.greetNow('Afrikaans','Penny');
//     await greet2.greetNow('isiXhosa','Penny');
//     await greet2.greetNow('isiXhosa','Mbali');



//      assert.equal(3,await greet2.getCounter());

// });


// })

// describe('Greet exercise:List of greeted names' ,async function(){
//     it('should take in one name and return that name in list' , async function(){
//         var greet2 = greetings(pool);

//         await greet2.greetNow('English','Amy');



//          assert.deepEqual([ {count: 1,name:'Amy'}] ,await greet2.getList());

// });

//  it('should take in five different names and return object list with all of them' , async function(){
//     var greet2 = greetings(pool);

//     await greet2.greetNow('English','Amy');
//     await greet2.greetNow('English','Peggy');
//     await greet2.greetNow('Afrikaans','Penny');
//     await greet2.greetNow('isiXhosa','Enhle');
//     await greet2.greetNow('isiXhosa','Mbali');



//     assert.deepEqual([ {count: 1,name:'Amy'}, {count: 1,name:'Peggy'}, {count: 1,name:'Penny'}, {count: 1,name:'Enhle'},{count: 1,name:'Mbali'}] ,await greet2.getList());

//  });

// it('should take in five  names with two duplicates and return list' , async function(){
//     var greet2 = greetings(pool);

//     await greet2.greetNow('English','Amy');
//     await greet2.greetNow('English','Amy');
//     await greet2.greetNow('Afrikaans','Penny');
//     await greet2.greetNow('isiXhosa','Penny');
//     await greet2.greetNow('isiXhosa','Mbali');



//     assert.deepEqual([ {count: 2,name:'Amy'},{count: 2,name:'Penny'},{count: 1,name:'Mbali'}] ,await greet2.getList());
// });




// })


after(function(){
    pool.end();
}) 