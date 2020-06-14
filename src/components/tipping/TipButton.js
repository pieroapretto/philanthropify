import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { toast } from "react-toastify";

toast.configure();

const TipButton = (props) => {

  const handleToken = async(token) => {
    const response = await axios.post("/tip", { token, product } );
    const { status } = response.data;

    if (status === "success") {
      toast("Success! Check email for details", { type: "success" });
    } else {
      toast("Something went wrong", { type: "error" });
    }
  }

  return (
      <StripeCheckout
        stripeKey="pk_test_51GtlrGDVyQZw3OoGb5W2mqGtnymNk0ynBYPw6MDaZvNbVss815vXp0mKbqi4zF8oSictn7PCcYK2cS4ZAfbIIIZR00YhRPybGu"
        token={handleToken}
      />
  );
}

export default connect()(TipButton);
