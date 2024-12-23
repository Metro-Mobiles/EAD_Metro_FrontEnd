import React from "react";
import { Truck, HeadphonesIcon, RefreshCw } from "lucide-react";

const Features = () => {
  const features = [
    {
      title: "FREE AND FAST DELIVERY",
      description: "Free delivery for all orders over Rs.25000.00",
      icon: <Truck className="w-6 h-6" />,
      ariaLabel: "Delivery Service",
    },
    {
      title: "24/7 CUSTOMER SERVICE",
      description: "Friendly 24/7 customer support",
      icon: <HeadphonesIcon className="w-6 h-6" />,
      ariaLabel: "Customer Service",
    },
    {
      title: "MONEY BACK GUARANTEE",
      description: "We return money within 14 days",
      icon: <RefreshCw className="w-6 h-6" />,
      ariaLabel: "Money Back Guarantee",
    },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-8 p-5">
      {features.map((feature, index) => (
        <div
          key={index}
          className="text-center p-8 border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-gradient-to-b from-black to-orange-500"
        >
          <div
            className="bg-orange-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6"
            aria-label={feature.ariaLabel}
          >
            <div className="text-orange-600">{feature.icon}</div>
          </div>
          <h3 className="text-xl font-bold mb-3 text-gray-900">
            {feature.title}
          </h3>
          <p className="text-gray-600">{feature.description}</p>
        </div>
      ))}
    </section>
  );
};

export default Features;
