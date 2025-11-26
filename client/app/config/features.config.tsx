import { generalConfigType } from "../models/general-config.model"

export const generalConfig = (): generalConfigType => {
    return {
        title: "Features",
        description: "Explore the powerful features of UniDesk that streamline your support process and enhance customer satisfaction.",
        image: "/features/feature-meta-image.png",
        styles: {
            inlineStyles: "bg-white dark:bg-black",
            classNames: "",
        },
        sections: [
            {
                type: "feature-list",
                title: "Ticket Management",
                description: "Efficiently manage and track customer support tickets with our intuitive ticketing system.",
                icon: "/features/ticket-management-icon.png",
                styles: {
                    inlineStyles: "bg-zinc-50 dark:bg-[#111111]",
                    classNames: "",
                    itemStyles: {
                        inlineStyles: "",
                        classNames: ""
                    }
                },
                items: [
                    {
                        type: "button",
                        title: "Centralized Ticketing",
                      description: "All customer inquiries are consolidated into a single platform for easy access and management.",
                    styles: {
                            inlineStyles: "",
                            classNames: ""
                        }
                    },
                ]
            }
        ]
    }
}