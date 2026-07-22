import InstagramSvg from "@/components/ui/svg-icons/InstagramSvg";
import { ReactNode } from "react";
import TikTokSvg from "@/components/ui/svg-icons/TikTokSvg";
import GitHubSvg from "@/components/ui/svg-icons/GitHubSvg";
import TelgeramSvg from "@/components/ui/svg-icons/TelegramSvg";

interface ISocials {
    key: string;
    icon: ReactNode;
    label: string;
    handle: string;
    href: string;
}

interface ISite {
    url: string;
    email: string;
    socials: ISocials[];
}

export const site: ISite = {
    url: "https://extropy.dev",
    email: "extropydev@gmail.com",
    socials: [
        // {
        //     key: "tiktok",
        //     icon: <TikTokSvg/>,
        //     label: "TikTok",
        //     handle: "@extropy.dev",
        //     href: "https://www.tiktok.com/@extropy.dev",
        // },
        {
            key: "instagram",
            icon: <InstagramSvg />,
            label: "Instagram",
            handle: "@sauvignonblqnc",
            href: "https://www.instagram.com/sauvignonblqnc",
        },
        {
            key: "github",
            icon: <GitHubSvg/>,
            label: "GitHub",
            handle: "kukarachass",
            href: "https://github.com/kukarachass",
        },
        {
            key: "telegram",
            icon: <TelgeramSvg/>,
            label: "Telegram",
            handle: "@extropydev",
            href: "https://t.me/extropydev"
        }

    ],
};