import React from "react";

const OptionsWrapper = ({ handleChange, product }) => {
  const options = product.product.options;
  const hasVariants = product.product.variants.length > 1;

  return (
    <fieldset className="container my-4">
      {hasVariants &&
        options?.map(({ id, name, values }, index) => (
          <div
            className="relative cursor-pointer border border-solid border-gray-500 px-4 py-2"
            key={id}
          >
            <select
              onChange={(event) => handleChange(index, event)}
              className="m-0 h-8 w-full appearance-none border-none bg-transparent px-4 py-2 text-black"
            >
              {values.map((value, idx) => (
                <option value={value} key={idx}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        ))}
    </fieldset>
  );
};

export default OptionsWrapper;
