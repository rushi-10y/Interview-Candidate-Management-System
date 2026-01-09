const validateCandidate = (req, res, next) => {
  let {
    full_name,
    email,
    phone,
    position,
    experience
  } = req.body;

  /* Trim string fields */
  full_name = full_name?.trim();
  email = email?.trim();
  phone = phone?.trim();
  position = position?.trim();

  /* Check required fields */
  if (
    !full_name ||
    !email ||
    !phone ||
    !position ||
    experience === undefined
  ) {
    return res.status(400).json({
      success: false,
      error: "All fields are required"
    });
  }

  /* Email validation */
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: "Invalid email format"
    });
  }

  /* Phone validation (10 digits) */
  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({
      success: false,
      error: "Phone number must be 10 digits"
    });
  }

  /* Experience validation */
  const exp = Number(experience);
  if (Number.isNaN(exp) || exp < 0) {
    return res.status(400).json({
      success: false,
      error: "Experience must be a non-negative number"
    });
  }

  /* Normalize experience */
  req.body.experience = exp;

  next();
};

module.exports = {
  validateCandidate
};
