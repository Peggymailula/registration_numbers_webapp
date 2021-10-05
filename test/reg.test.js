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


it("should take in registration number 'CA-12345' for Cape Town" ,async function(){
    let Reg1 = Registration(pool);
    
    await Reg1.setPlate("CA-12345");
    await Reg1.setID("CA-12345");

        assert.deepEqual([{ "reg_number":"CA-12345"}], await Reg1.getRegList())

});

it("should take in registration number the same registration is smaller case 'cl-12345' " ,async function(){
    let Reg1 = Registration(pool);
    
    await Reg1.setPlate("cl-12345");
        assert.deepEqual([{ "reg_number":"CL-12345"}], await Reg1.getRegList())

});

it("should take in registration number 'CY-123-456' for Bellville" ,async function(){
    let Reg1 = Registration(pool);
    
    await Reg1.setPlate("CY-123-456");
   

        assert.deepEqual([{ "reg_number":"CY-123-456"}], await Reg1.getRegList())

});

it("should take in registration number the same registration is smaller case 'cy-123-456' " ,async function(){
    let Reg1 = Registration(pool);
    await Reg1.setPlate("cy-123-456");
  
        assert.deepEqual([{ "reg_number":"CY-123-456"}], await Reg1.getRegList())

});

})


describe('Registrations Webapp: Filter the correct location for registration plates' ,async function(){


    it("should filter the registrations from Bellville" ,async function(){
        let Reg1 = Registration(pool);

        await Reg1.setPlate("cy-345-456");
        await Reg1.setPlate("cl-12345");
        await Reg1.setPlate("cy-222-456");
        await Reg1.setPlate("cy123456");
        
      await Reg1.setID('CY');
    
    
            assert.deepEqual([
                {
                  reg_number: 'CY-345-456'
                },
                {
                  reg_number: 'CY-222-456'
                }]
              , await Reg1.setTown("CY"));
    
    });

    it("should filter the registrations from Stellenbosch" ,async function(){
        let Reg1 = Registration(pool);

        await Reg1.setPlate("cy-345-456");
        await Reg1.setPlate("cl-12345");
        await Reg1.setPlate("cl-222-456");
        await Reg1.setPlate("cy123456");
        
      await Reg1.setID('CY');
    
    
            assert.deepEqual([
                {
                  reg_number: 'CL-12345'
                },
                {
                  reg_number: 'CL-222-456'
                }]
              , await Reg1.setTown("CL"));
    
    });

    it("should filter the registrations from Cape Town" ,async function(){
        let Reg1 = Registration(pool);

        await Reg1.setPlate("cy-345-456");
        await Reg1.setPlate("cl-12345");
        await Reg1.setPlate("ca-222-456");
        await Reg1.setPlate("cy123456");
        
      await Reg1.setID('CA');
    
    
            assert.deepEqual([
                {
                  reg_number: 'CA-222-456'
                }]
              , await Reg1.setTown("CA"));
    
    });
        
    
    })

    describe('Registrations Webapp: Clear registration webapp' ,async function(){


        it("should filter the registrations from Bellville" ,async function(){
            let Reg1 = Registration(pool);
    
            await Reg1.setPlate("cy-345-456");
            await Reg1.setPlate("cl-12345");
            await Reg1.setPlate("cy-222-456");
            await Reg1.setPlate("cy123456");
            
            await Reg1.clearReg();
        
        
                assert.deepEqual([], await Reg1.getRegList());
        
        });
    
        it("should filter the registrations from Stellenbosch" ,async function(){
            let Reg1 = Registration(pool);
    
            await Reg1.setPlate("cy-345-456");
            await Reg1.setPlate("cl-12345");
            await Reg1.setPlate("cl-222-456");
            await Reg1.setPlate("cy123456");
            
            await Reg1.clearReg();
        
        
            assert.deepEqual([], await Reg1.getRegList());
        
        });
    
        it("should filter the registrations from Cape Town" ,async function(){
            let Reg1 = Registration(pool);
    
            await Reg1.setPlate("cy-345-456");
            await Reg1.setPlate("cl-12345");
            await Reg1.setPlate("ca-222-456");
            await Reg1.setPlate("cy123456");
            
            await Reg1.clearReg();
        
        
            assert.deepEqual([], await Reg1.getRegList());
        
        })
    })



after(function(){
    pool.end();
}) 