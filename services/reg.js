/* eslint-disable no-undef */
module.exports = function registrationFactoryFunction(pool) {
  const registration1 = /^((CA|CY|CL)-([0-9]){5})$/;
  const registration2 = /^((CA|CL|CY)-\d{3}-\d{3})$/;
  const registration3 = /^((CA|CY|CL)\s([0-9]){5})$/;

  let reg;
  let regList = [];
  let sec;

  async function setPlate(plate) {
    // eslint-disable-next-line no-param-reassign
    reg = plate.charAt(0).toUpperCase() + plate.charAt(1).toUpperCase() + plate.slice(2);

    if (reg.match(registration1) || reg.match(registration2) || reg.match(registration3)) {
      // eslint-disable-next-line no-use-before-define
      const id = await setID(reg);
      const getReg = await pool.query('SELECT reg_number FROM regnumber WHERE reg_number = $1', [reg]);

      if (getReg.rowCount === 0) {
        // eslint-disable-next-line quotes
        await pool.query(`INSERT INTO regnumber (town_id,reg_number) VALUES ($1,$2)`, [id, reg]);
      }
    }
  }

  async function getRegList() {
    registNumbers = await pool.query('SELECT reg_number from regnumber');
    return registNumbers.rows;
  }

  async function setTown(num) {
    const town = num;

    // eslint-disable-next-line no-use-before-define
    const townID = await setID(town);
    regList = await pool.query('SELECT reg_number FROM regnumber where town_id = $1', [townID]);
    return regList.rows;
  }
  async function setID(string) {
    sec = string.slice(0, 2);

    const townIdentify = await pool.query('SELECT id FROM towns WHERE town_ref = $1', [sec]);
    // eslint-disable-next-line prefer-destructuring
    const id = townIdentify.rows[0].id;
    return Number(id);
  }

  async function clearReg() {
    await pool.query('DELETE FROM regnumber ');
  }

  return {
    setPlate,
    setID,
    getRegList,
    setTown,
    clearReg,
  };
};
