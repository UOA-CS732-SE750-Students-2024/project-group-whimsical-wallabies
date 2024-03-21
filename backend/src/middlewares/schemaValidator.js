import schemas from '../validations/schemaValidations.js';

const supportedMethods = ['post', 'put', 'patch', 'delete'];

const validationOptions = {
  abortEarly: false,
  allowUnknown: false,
  stripUnknown: false
};

const schemaValidator = (path, useJoiError = true) => {
  const schema = schemas[path];

  if (!schema) {
    throw new Error(`Schema not found for path: ${path}`);
  }

  return (req, res, next) => {
    const method = req.method.toLowerCase();

    if (!supportedMethods.includes(method)) {
      return next();
    }

    const { error, value } = schema.validate(req.body, validationOptions);

    if (error) {
      // Refactored error handling to always use a unified error format
      const unifiedError = {
        status: 'failed',
        error: 'Invalid request. Please review request and try again.',
        fields: {}
      };

      if (useJoiError && error.details) {
        // Process Joi error details for field-specific messages
        error.details.forEach(({ message, path }) => {
          const fieldName = path.join('.'); // Convert array path to dot notation
          unifiedError.fields[fieldName] = message.replace(/['"]/g, ''); // Clean message
        });
      } else {
        // For custom errors, you could optionally add a general message to `fields`
        // unifiedError.fields.general = unifiedError.error;
      }

      return res.status(422).json(unifiedError);
    }

    // validation successful
    req.body = value;
    return next();
  };
};

export default schemaValidator;
