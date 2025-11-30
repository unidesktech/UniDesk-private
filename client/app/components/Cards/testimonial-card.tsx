import React from "react";
import { Card } from "../ui/card";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  role: string;
  img?: string;
  quote: string;
  rating?: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  img,
  quote,
  rating = 5,
}) => {
  return (
    <Card className="p-8 border border-gray-200 bg-white rounded-xl hover:shadow-lg transition-shadow">
      <div className="flex gap-2">
        {Array.from({ length: rating }).map((_, j) => (
          <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <p className="text-gray-700 mb-6 leading-relaxed">&quot;{quote}&quot;</p>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-400 to-teal-400 overflow-hidden">
          <img
            src={img ?? `https://placehold.co/600x400`}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="text-gray-900">{name}</p>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
    </Card>
  );
};

export default TestimonialCard;
