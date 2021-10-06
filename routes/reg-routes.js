module.exports = function registrationRoutes(registration) {
  let list = [];
  const registration1 = /^((CA|CY|CL)-([0-9]){5})$/;
  const registration2 = /^((CA|CL|CY)-\d{3}-\d{3})$/;
  const registration3 = /^((CA|CY|CL)\s([0-9]){5})$/;

  async function home(req, res) {
    list = await registration.getRegList();

    res.render('index', {
      list,
    });
  }

  async function setReg(req, res) {
    const reg = req.body.regInput;
    if (!reg) {
      req.flash('error', 'Please enter a h a valid registration');
    }
    if (reg) {
      if (reg.match(registration1) || reg.match(registration2) || reg.match(registration3)) {
        await registration.setPlate(req.body.regInput);
      } else {
        req.flash('error', 'Please use correct format when entering registration');
      }
    }
    res.redirect('/');
  }

  async function filterReg(req, res) {
    res.render('index', {
      list,
    });
  }

  async function viewReg(req, res) {
    if (req.body.town) {
      list = await registration.setTown(req.body.town);
    } else {
      req.flash('error', 'Please select a town before proceeding');
    }

    res.redirect('/reg_numbers');
  }

  async function allReg(req, res) {
    res.redirect('/');
  }

  async function resetReg(req, res) {
    req.flash('success', 'Application has succesfully been reset!');
    await registration.clearReg();

    res.redirect('/');
  }

  return {
    home,
    setReg,
    filterReg,
    viewReg,
    allReg,
    resetReg,
  };
};
