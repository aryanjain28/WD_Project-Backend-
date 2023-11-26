const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sql = require("./db");

// constructor
const Staff = function (staff) {
  staff.name && (this.name = staff.name);
  staff.mobile && (this.mobile = staff.mobile);
  staff.email && (this.email = staff.email);
  staff.password && (this.password = staff.password);
  staff.address && (this.address = staff.address);
  staff.dob && (this.dob = staff.dob);
  staff.sex && (this.sex = staff.sex);
  staff.role && (this.role = staff.role);
};

Staff.getAll = (result) => {
  const query = "SELECT * FROM Staff";
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

Staff.create = (hostId, newStaffMember, result) => {
  sql.query(
    "CALL add_staff(?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      hostId,
      newStaffMember.name,
      newStaffMember.mobile,
      newStaffMember.email,
      newStaffMember.password,
      newStaffMember.address,
      newStaffMember.dob,
      newStaffMember.sex,
      newStaffMember.role,
    ],
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      console.log("Created Staff Member: ", {
        id: res.insertId,
        ...newStaffMember,
      });
      result(null, { id: res.insertId, ...newStaffMember });
    },
  );
};

Staff.update = (hostId, staffId, staff, result) => {
  sql.query(
    `CALL update_staff(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      hostId,
      staffId,
      staff.name || null,
      staff.mobile || null,
      staff.email || null,
      staff.password || null,
      staff.address || null,
      staff.dob || null,
      staff.sex || null,
      staff.role || null,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        // not found staff with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Updated staff member: ", { staffId, ...staff });
      result(null, { staffId, ...staff });
    },
  );
};

Staff.delete = (hostId, staffId, result) => {
  sql.query("CALL delete_staff(?, ?)", [hostId, staffId], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // not found staff member with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Deleted staff member with id: ", staffId);
    result(null, res);
  });
};

Staff.login = (staffMember, result) => {
  sql.query(
    `SELECT * FROM Staff WHERE email = "${staffMember.email}"`,
    async (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      if (res.length === 0) {
        // not found staff with the id
        result({ kind: "not_found" }, null);
        return;
      }

      //  bcrypt compare
      const { staffId, email, role, password: hashedPassword } = res[0];
      const compare = await bcrypt.compare(
        staffMember.password,
        hashedPassword,
      );
      if (compare) {
        result(null, {
          id: staffId,
          email,
          role,
          token: generateToken(staffId),
        });
      } else result({ message: "Incorrect Password" }, null);
    },
  );
};

// Generate JWT
const generateToken = (id) => {
  const JWT_SECRET = "hJ8$^uWzUlfkPr&E";
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: "30d" });
};

module.exports = Staff;
