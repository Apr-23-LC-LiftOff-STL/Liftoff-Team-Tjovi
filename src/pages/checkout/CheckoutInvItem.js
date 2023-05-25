import { useState } from "react";
import { useCartStore } from "../../store/cartStore";

const CheckoutInvItem = ({
  title,
  posterPath,
  id,
  count,
  price,
  releaseDate,
  subtotal,
}) => {
  const currencySymbol = "$";

  return (
    <tr>
      <td className="has-text-left">
        {title}
        <span className="is-size-7"> ({releaseDate?.slice(0, 4)})</span>
      </td>
      <td className="has-text-right">
        {currencySymbol}{price?.toFixed(2)}
      </td>
      <td className="has-text-centered">{count}</td>
      <td className="has-text-right">
        {currencySymbol}{subtotal}
      </td>
    </tr>
  );
};

export default CheckoutInvItem;
