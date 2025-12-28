import { Key, Mail, User } from "lucide-react"

export const authPage = () => {
    return {
        title: "Sign in to access your portal",
        fields: [
            {
                name: "code",
                type: "text",
                label: "School Code",
                icon: User,
                placeholder: "DPS123",
                disabled: true,
                required: true,
                minLength: 4,
            },
            {
                name: "emailOrUid",
                type: "text",
                label: "Email Address or UID",
                icon: Mail,
                placeholder: 'youremail@gmail.com or AD293048',
                required: true,
                disabled: false,
                minLength: 7,
            },
            {
                name: "password",
                type: "password",
                label: "Password",
                icon: Key,
                placeholder: "••••••••",
                required: true,
                disabled: false,
                minLength: 6
            },
        ]
    }
}