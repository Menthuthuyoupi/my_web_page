const databaseError = {
    "22P02": {
      code: 400,
      message: "Invalid params value",
    },
    23502: {
      code: 400,
      message: "Bad request",
    },
    22032: {
        code: 500,
        message: "invalid_json_text"
    },
    23000: {
        code: 400,
        message: "integrity_constraint_violation"
    },
    23001: {
        code: 400,
        message: "restrict_violation"
    },
    23503: {
        code: 400,
        message: "foreign_key_violation"
    },
    23505: {
        code: 400,
        message: "unique_violation"
    },
    23514: {
        code: 400,
        message: "check_violation"
    },
    "23P01": {
        code: 400,
        message: "exclusion_violation"
    }
    // códigos en: https://www.postgresql.org/docs/current/errcodes-appendix.html
};
  
const getDatabaseError = (code) => {
    return databaseError[code] || { code: 500, message: "Internal server error" };
};

module.exports = {
    getDatabaseError
}