module.exports = function registrationRoutes(registration) {

    var list=[];

    async function home (req, res){
 
        list= await registration.getRegList();
         
         res.render('index', {
          list 
       })
           
       }

       async function setReg(req, res) {
        if(!req.body.regInput){
          req.flash('error', 'Please enter a registration with a valid registration');
        }
        
        else{
         await registration.setPlate(req.body.regInput);
          
      
        }
      
          res.redirect("/reg_number");
        }

        async function filterReg (req, res){
 
            res.render('index', {
             list 
          })
              
          }

          async function viewReg(req,res){

            if(req.body.town){
            list =  await registration.setTown(req.body.town);
              console.log( list);
        
            }
            else{
              req.flash('error', 'Please select a town before proceeding');
        
            }
        
          
        
            res.redirect("/reg_numbers")
          }

          async function allReg(req,res){
            res.redirect("/reg_number");
        
          }

          async function resetReg(req,res){
            req.flash('success','Application has succesfully been reset!')
            await registration.clearReg();
        
            res.redirect("/reg_number");
          }


       return{
           home,
           setReg,
           filterReg,
           viewReg,
           allReg,
           resetReg
       }
}
    