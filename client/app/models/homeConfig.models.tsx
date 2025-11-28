export interface homeConfigProps {
  title?: string;
  description?: string;
  image?: string;
  styles?: {
    inlineStyles?: string;
    classNames?: string;
  };

  sections: Array<{
    type:
      | "hero"
      | "trustLogos"
      | "iconCard"
      | "dashboardmockup"
      | "imgModule"
      | "testimonial"
      | "pricing"
      | "accordian"
      | "timeTable"
      | "chart"
      | "Stats";

    title?: string;
    title2?: string;
    desc?: string;
    position?: "left" | "right";
    icon?: any;

    styles?: {
      titleStyles?: {
        inlineStyles?: string;
        classNames?: string;
      };
      itemStyles?: {
        inlineStyles?: string;
        classNames?: string;
      };
      containerStyles?: {
        inlineStyles?: string;
        classNames?: string;
      };
      descStyles?: {
        inlineStyles?: string;
        classNames?: string;
      };
      logoConatinerStyles?: {
        inlineStyles?: string;
        classNames?: string;
      };
      title2Styles?: {
        inlineStyles?: string;
        classNames?: string;
      };
      inlineStyles?: string;
      classNames?: string;
    };

    text?: string;
    items?: Array<
      | {
          type: "button";
          title: string;
          Icon?: any;
          onClick?: () => void;
          variant?: string;
          styles?: {
            inlineStyles?: string;
            classNames?: string;
          };
        }
      | {
          type: "Stats";
          stat: Array<{
            label: string;
            value: string;
            color?: string;
          }>;
          styles?: {
            inlineStyles?: string;
            classNames?: string;
          };
        }
      | {
          type: "chart";
          title?: string;
          charts: number[];
          styles?: {
            conatinerStyles?: {
              inlineStyles?: string;
              classNames?: string;
            };
            chartStyles?: {
              inlineStyles?: string;
              classNames?: string;
            };
            barsStyles?: {
              inlineStyles?: string;
              classNames?: string;
            };
          };
        }
      | {
          type: "timeTable";
          title?: string;
          timeTables: Array<{
            time: string;
            subject: string;
            color?: string;
          }>;
          styles?: {
            inlineStyles?: string;
            classNames?: string;
          };
        }
      | {
          icon: any;
          title: string;
          desc: string;
        }
      | {
          icon: any;
          name?: string;
        }
      | {
          type: "trustLogos";
          icon: any;
          name?: string;
        }
      | {
          label: string;
          value: string;
          icon: any;
          color?: string;
          bg?: string;
        }
      | {
          title: string;
          subtitle: string;
          image: string;
          points?: string[];
          reversed?: boolean;
        }
      | {
          name: string;
          role: string;
          image: string;
          quote: string;
          rating: number;
        }
      | {
          name: string;
          price: string;
          period: string;
          description: string;
          features: string[];
          highlighted?: boolean;
        }
      | {
          question: string;
          answer: string;
        }
    >;
    lineData?: { name: string; value: number }[];
    barData?: { name: string; attendance: number }[];
    features?: string[];
  }>;
}
