const jwt = require("jsonwebtoken");
const moment = require("moment");
const tokenRepository = require("../repository/tokenRepository");
const PrestadorRepository = require("../repository/PrestadorRepository");
const { generateRoles } = require("../services/AuthService");
const { sequelize } = require("../models");

const key = "authenticatejwt0123";

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  // return next();
  if (!authHeader) {
    return res.status(401).send({
      error: true,
      message: "No token provided",
      message_debug: "No token provided",
    });
  }

  const parts = authHeader.split(" ");

  if (!parts.length === 2) {
    return res.status(401).send({
      error: true,
      message: "Token error",
      message_debug: "Token error",
    });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({
      error: true,
      message: "Token malformated",
      message_debug: "Token malformated",
    });
  }

  const result = await tokenRepository.findByToken(token);

  if (result) {
    if (result.dlogout) {
      return res.status(401).send({
        error: true,
        message: "Token inválido",
        message_debug: "Token inválido",
      });
    }
  }

  jwt.verify(token, key, async (err, decoded) => {
    if (err) {
      let dlogout = "";
      switch (err.name) {
        case "TokenExpiredError":
          dlogout = moment()
            .tz("America/Fortaleza")
            .format("YYYY-MM-DD HH:mm:ss");
          await sequelize.query(
            "UPDATE liv_token SET action_ = ?, dlogout = ? WHERE ttokenusua = ?",
            {
              replacements: [err.name, dlogout, token],
              type: sequelize.QueryTypes.UPDATE,
            }
          );
          return res.status(401).send({
            error: true,
            message: "Token Expired",
            message_debug: "TokenExpiredError",
          });
        default:
          dlogout = moment()
            .tz("America/Fortaleza")
            .format("YYYY-MM-DD HH:mm:ss");
          await sequelize.query(
            "UPDATE liv_token SET action_ = ?, dlogout = ? WHERE ttokenusua = ?",
            {
              replacements: [err.name, dlogout, token],
              type: sequelize.QueryTypes.UPDATE,
            }
          );
          return res.status(401).send({
            error: true,
            message: "Token invalid",
            message_debug: "Token invalid",
          });
      }
    }

    const userToken = await tokenRepository.findByToken(token);
    if (!userToken) {
      return res.status(401).send({
        error: true,
        message: "Usuário não autenticado",
        message_debug: "Usuário não autenticado",
      });
    }

    const qDireitosUsuario = `
            SELECT SEGFORM.*
            FROM SEGDIRE, SEGFORM
            WHERE SEGDIRE.NNUMEFORM = SEGFORM.NNUMEFORM
                AND NNUMEUSUA = ${decoded.id}
                AND CTIPOFORM = 'O'
                    UNION ALL
                SELECT SEGFORM.* FROM SEGUSUA, SEGDIRE, SEGFORM
                    WHERE SEGUSUA.NNUMEUSUA = ${decoded.id}
                    AND CSTATUSUA = 'A'
                AND SEGUSUA.NNUMEPERF = SEGDIRE.NNUMEPERF
                AND SEGDIRE.NNUMEFORM = SEGFORM.NNUMEFORM
                AND CTIPOFORM = 'O'
        `;
    const rDireitosUsuario = await sequelize.query(qDireitosUsuario, {
      type: sequelize.QueryTypes.SELECT,
    });
    const roles = generateRoles(rDireitosUsuario);

    const pres = await PrestadorRepository.findByUsua(decoded.id);

    if (roles.length == 0) {
      return res.status(403).send({
        error: true,
        message: "Usuário não tem permissões para acessar o LIVNOW",
        message_debug: "Usuário não tem permissões para acessar o LIVNOW",
      });
    }

    req.userId = decoded.id;
    req.generalRules = roles.auxGeneralRoles;
    req.rules = roles.auxRoles;
    req.user = {
      id: decoded.id,
      pres: pres ? pres.nnumepres : null,
      rules: roles.auxRoles,
    };

    return next();
  });
};
