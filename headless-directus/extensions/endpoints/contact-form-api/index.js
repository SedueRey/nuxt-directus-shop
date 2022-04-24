const Joi = require("joi");

const bodySchema = Joi.object({
  username: Joi.string().required(),
  usermail: Joi.string().required(),
  usersubject: Joi.string().required(),
  usertext: Joi.string().required(),
});

module.exports = (router, { services, exceptions, logger }) => {
  const { ItemsService } = services;
  const { InvalidPayloadException, ServiceUnavailableException } = exceptions;
  
  router.get('/', (req, res, next) => {
      res.json({ example: "Healtz works!" })
  });

  // In post call you need to:
  // - Send data as JSON
  // - Send header Content-Type: application/json; charset=utf-8
  router.post('/', (req, res, next) => {
    const { error } = bodySchema.validate(req.body);
    if (error) throw new InvalidPayloadException(error.message);

    const {
      username,
      usermail,
      usersubject,
      usertext
    } = {...req.body}

    const messageService = new ItemsService("contactform", {
      schema: req.schema
    });
    messageService
      .createOne({ 
        name: username.trim(),
        mail: usermail.trim(),
        subject: usersubject.trim(),
        text: usertext
       })
      .then((results) => res.json({status: 'ok'}))
      .catch((error) => {
        return next(new ServiceUnavailableException(error.message));
      });
  });
}