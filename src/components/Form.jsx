function Form() {
  return (
    <div className="flex flex-col w-1/2 gap-4 mx-10">
      <h2 className="text-2xl font-bold">Billing Details</h2>
      <form className="flex flex-col gap-4 h-full">
        <div className="flex flex-row gap-4 w-full">
          <div className="flex flex-col w-full">
            <label htmlFor="firstName" className="text-lg font-bold">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              className="border-2 border-stone-200 rounded-md p-2"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="lastName" className="text-lg font-bold">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              className="border-2 border-stone-200 rounded-md p-2"
            />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="company" className="text-lg font-bold">
            Company Name (Optional)
          </label>
          <input
            type="text"
            id="company"
            name="company"
            className="border-2 border-stone-200 rounded-md p-2"
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="country" className="text-lg font-bold">
            Country / Region
          </label>
          <select
            name="country"
            id="country"
            required
            className="border-2 border-stone-200 rounded-md p-2"
          >
            <option value="">Select a country / region</option>
            <option value="us">United States</option>
            <option value="ca">Canada</option>
            <option value="uk">United Kingdom</option>
            <option value="au">Australia</option>
            <option value="fr">France</option>
            <option value="de">Germany</option>
            <option value="dz">Algeria</option>
          </select>
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="address" className="text-lg font-bold">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            required
            className="border-2 border-stone-200 rounded-md p-2"
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="city" className="text-lg font-bold">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            required
            className="border-2 border-stone-200 rounded-md p-2"
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="state" className="text-lg font-bold">
            State / Province
          </label>
          <input
            type="text"
            id="state"
            name="state"
            required
            className="border-2 border-stone-200 rounded-md p-2"
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="zip" className="text-lg font-bold">
            Zip / Postal Code
          </label>
          <input
            type="text"
            id="zip"
            name="zip"
            required
            className="border-2 border-stone-200 rounded-md p-2"
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="phone" className="text-lg font-bold">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            className="border-2 border-stone-200 rounded-md p-2"
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="email" className="text-lg font-bold">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="border-2 border-stone-200 rounded-md p-2"
          />
        </div>
        <div className="flex flex-col w-full">
          <textarea
            id="message"
            name="message"
            placeholder="Aditional informations"
            required
            className="border-2 border-stone-200 rounded-md p-2"
          ></textarea>
        </div>
      </form>
    </div>
  );
}

export default Form;
