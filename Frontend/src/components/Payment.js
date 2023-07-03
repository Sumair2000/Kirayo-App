import { View, Text } from "react-native";
import React, { useState } from "react";
import { StripeProvider, useStripe } from "@stripe/stripe-react-native";

const Payment = () => {
  const stripe = useStripe();
  const [name, setName] = useState("");
  return (
    <View>
      <StripeProvider
        publishableKey={process.env.STRIPE_PUBLISHED_KEY}
      ></StripeProvider>
    </View>
  );
};

export default Payment;
