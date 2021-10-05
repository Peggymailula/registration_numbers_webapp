module.exports=function registrationFactoryFunction(pool) {
  const registration1 = /^((CA|CY|CL)\-([0-9]){5})$/
  const registration2 = /^((CA|CL|CY)\-\d{3}\-\d{3})$/
  const registration3 =  /^((CA|CY|CL)\-([0-9]){6})$/
  
//   var towns = {
    
//     'CY' : 'Bellville',
//     'CL' : 'Stellenbosch',
//     'CA' : 'Cape Town',
    
//   }


  //regNumbers = regStored || []
//

var reg;
var regList=[];
var selected=[];
var sec;

async function setPlate(plate){

    
    plate = plate.charAt(0).toUpperCase()+plate.charAt(1).toUpperCase()+plate.slice(2);
    reg = plate;


    if(reg.match(registration1) || reg.match(registration2) || reg.match(registration3)) {
      
        var id = await setID(reg);
        var getReg = await pool.query(`SELECT reg_number FROM regnumber WHERE reg_number = $1`,[reg]);

        if (getReg.rowCount === 0) {
            await pool.query(`INSERT INTO regnumber (town_id,reg_number) VALUES ($1,$2)`,[id,reg]);
        }
    }          



};



async function getRegList(){
    registNumbers = await pool.query(`SELECT reg_number from regnumber`);
    return  registNumbers.rows;
}

async function setTown(num) {

    var town = num;
   
    var townID = await setID(town);
    regList = await pool.query(`SELECT reg_number FROM regnumber where town_id = $1`, [townID]);
    return regList.rows;
    
};
async function setID(string){
    sec = string.slice(0,2);
    var id;
    var townIdentify = await pool.query(`SELECT id FROM towns WHERE town_ref = $1`, [sec])
    id=townIdentify.rows[0].id;
     return Number(id)
};

  

  async function clearReg() {

    
        await pool.query(`DELETE FROM regnumber `)
       
       
   

    

}

  
  


return{
    setPlate,
    setID,
    getRegList,
    setTown,
    clearReg
}

}

