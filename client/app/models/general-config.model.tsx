export interface generalConfigType {
    title: string;
    description: string;
    image: string;
    styles: {
        inlineStyles: string;
        classNames: string;
    };
    sections: Array<{
        type: string;
        title: string;
        description: string;
        icon: string;
        styles: {
            inlineStyles: string;
            classNames: string;
            itemStyles: {
                inlineStyles: string;
                classNames: string;
            };
        };
        items: Array<{
            type: string;
            title: string;
            description: string;
            styles: {
                inlineStyles: string;
                classNames: string;
            };
        }>;
    }>;
}