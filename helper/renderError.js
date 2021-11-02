const renderError = (error) => {
  const err = {
    err: { 
      code: 'invalid_data',
      message: error },
  };
  return err;
};

module.exports = { renderError };