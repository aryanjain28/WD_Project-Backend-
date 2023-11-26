const sql = require("./db");

// constructor
const Meeting = function (meeting) {
  meeting.title && (this.title = meeting.title);
  meeting.description && (this.description = meeting.description);
  meeting.time && (this.time = meeting.time);
};

Meeting.getAll = (result) => {
  const query = "CALL get_meetings()";
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, res[0]);
  });
};

Meeting.create = (newMeeting, hostId, staffId, result) => {
  console.log(newMeeting);
  sql.query(
    "CALL create_meeting(?, ?, ?, ?, ?)",
    [
      newMeeting.time || null,
      newMeeting.title || null,
      newMeeting.description || null,
      hostId || null,
      staffId || null,
    ],
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }

      console.log("Created Meeting: ", { id: res.insertId, ...newMeeting });
      result(null, { id: res.insertId, ...newMeeting });
    },
  );
};

Meeting.update = (meetingId, staffId, description, result) => {
  sql.query(
    "CALL update_meeting(?, ?, ?)",
    [staffId, meetingId, description],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        // not found meeting with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Updated meeting: ", { meetingId, description });
      result(null, { meetingId, description });
    },
  );
};

Meeting.delete = (meetingId, hostId, result) => {
  sql.query("CALL delete_meeting(?, ?)", [hostId, meetingId], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // not found meeting with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Deleted meeting with id: ", meetingId);
    result(null, res);
  });
};

Meeting.getStaffMember = (meetingId, result) => {
  sql.query("CALL get_staff_in_meeting(?)", [meetingId], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // not found meeting with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Getting staff member");
    result(null, res);
  });
};

Meeting.getClientMember = (meetingId, result) => {
  sql.query("CALL get_client_in_meeting(?)", [meetingId], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // not found meeting with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Getting clients in meeting");
    result(null, res);
  });
};

Meeting.addStaffMember = (meetingId, staffId, result) => {
  sql.query(
    "CALL add_staff_in_meeting(?, ?)",
    [meetingId, staffId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        // not found meeting with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Adding staff member");
      result(null, res);
    },
  );
};

Meeting.addClientMember = (meetingId, clientId, result) => {
  sql.query(
    "CALL add_client_in_meeting(?, ?)",
    [meetingId, clientId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        // not found meeting with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Adding client");
      result(null, res);
    },
  );
};

Meeting.removeStaffMember = (meetingId, staffId, result) => {
  sql.query(
    "CALL remove_staff_from_meeting(?, ?)",
    [meetingId, staffId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        // not found meeting with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Removing staff member");
      result(null, res);
    },
  );
};

Meeting.removeClientMember = (meetingId, clientId, result) => {
  sql.query(
    "CALL remove_client_from_meeting(?, ?)",
    [meetingId, clientId],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        // not found meeting with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Removing client");
      result(null, res);
    },
  );
};

module.exports = Meeting;
