function Field({ id, label, required, error, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-bold text-stone-800">
        {label} {required && <span className="text-[#C76543]">*</span>}
      </label>
      {children}
      {error && (
        <span className="text-xs font-semibold text-[#C76543]" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

export default function Form({ formData = {}, onChange = () => {}, errors = {} }) {
  const countries = [
    { code: "US", name: "United States" },
    { code: "CA", name: "Canada" },
    { code: "UK", name: "United Kingdom" },
    { code: "FR", name: "France" },
    { code: "DZ", name: "Algeria" },
  ];

  const errorClass = (field) => (errors[field] ? "border-[#C76543] focus:border-[#C76543]" : "");

  return (
    <section className="w-full">
      <div className="mb-8">
        <p className="eyebrow">Checkout</p>
        <h2 className="mt-2 text-3xl font-extrabold text-stone-950">Billing Details</h2>
      </div>

      <div className="grid gap-5 rounded-2xl border border-neutral-100 bg-white p-6 shadow-subtle md:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="firstName" label="First Name" required error={errors.firstName}>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              value={formData.firstName || ""}
              onChange={onChange}
              className={`field-control ${errorClass("firstName")}`}
            />
          </Field>
          <Field id="lastName" label="Last Name" required error={errors.lastName}>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              value={formData.lastName || ""}
              onChange={onChange}
              className={`field-control ${errorClass("lastName")}`}
            />
          </Field>
        </div>

        <Field id="company" label="Company Name">
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company || ""}
            onChange={onChange}
            className="field-control"
          />
        </Field>

        <Field id="country" label="Country / Region" required error={errors.country}>
          <select
            id="country"
            name="country"
            required
            value={formData.country || ""}
            onChange={onChange}
            className={`field-control ${errorClass("country")}`}
          >
            <option value="">Select a country / region</option>
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </Field>

        <Field id="address" label="Street Address" required error={errors.address}>
          <input
            type="text"
            id="address"
            name="address"
            required
            value={formData.address || ""}
            onChange={onChange}
            className={`field-control ${errorClass("address")}`}
          />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="city" label="Town / City" required error={errors.city}>
            <input
              type="text"
              id="city"
              name="city"
              required
              value={formData.city || ""}
              onChange={onChange}
              className={`field-control ${errorClass("city")}`}
            />
          </Field>
          <Field id="state" label="Province / State" required error={errors.state}>
            <input
              type="text"
              id="state"
              name="state"
              required
              value={formData.state || ""}
              onChange={onChange}
              className={`field-control ${errorClass("state")}`}
            />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="zip" label="ZIP / Postal Code" required error={errors.zip}>
            <input
              type="text"
              id="zip"
              name="zip"
              required
              value={formData.zip || ""}
              onChange={onChange}
              className={`field-control ${errorClass("zip")}`}
            />
          </Field>
          <Field id="phone" label="Phone" required error={errors.phone}>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone || ""}
              onChange={onChange}
              className={`field-control ${errorClass("phone")}`}
            />
          </Field>
        </div>

        <Field id="email" label="Email Address" required error={errors.email}>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email || ""}
            onChange={onChange}
            className={`field-control ${errorClass("email")}`}
          />
        </Field>

        <Field id="message" label="Additional Information">
          <textarea
            id="message"
            name="message"
            placeholder="Delivery instructions or notes"
            value={formData.message || ""}
            onChange={onChange}
            className="field-control min-h-32 resize-y"
          />
        </Field>
      </div>
    </section>
  );
}
