import React, { CSSProperties } from "react";
import { Card } from "../ui/card";

interface ContactUsCardProps {
  icon?: React.ElementType;
  title: string;
  description: string;
  buttonText: string;
  color: string;
  onClick?: () => void;
  styles?: {
    inlineStyles?: CSSProperties;
    className?: string;
    buttonStyles?: CSSProperties;
    buttonClassName?: string;
  };
}

const ContactUsCard: React.FC<ContactUsCardProps> = ({
  icon: Icon,
  title,
  description,
  buttonText,
  color,
  onClick,
  styles = {}
}) => {
  return (
    <Card
      className={`p-6 border gap-2 border-gray-200 hover:border-blue-300 hover:shadow-lg 
      transition-all duration-300 bg-white rounded-xl group cursor-pointer  ${styles.className || ""}`}
      style={styles.inlineStyles}
    >
      {Icon && (
        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
      )}

      <h3 className="font-semibold text-lg text-gray-900 mb-2">{title}</h3>

      <p className="text-gray-600 text-sm mb-4">{description}</p>

      <button
        onClick={onClick}
        className={`${color} font-medium inline-flex items-center gap-2 hover:underline ${styles.buttonClassName || ""}`}
        style={styles.buttonStyles}>
        {buttonText}
        <span>→</span>
      </button>
    </Card>
  );
};

export default ContactUsCard;
