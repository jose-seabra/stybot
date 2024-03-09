import { defineConfig } from "vitepress"

export default defineConfig({
    title: "Stybot",
    titleTemplate: "Stybot",
    base: "/stybot/",
    cleanUrls: "with-subfolders",
    themeConfig: {
        socialLinks: [
            { icon: "github", link: "https://github.com/jose-seabra/stybot" },
        ],
        sidebar: [
            {
                text: "Introduction",
                items: [{ text: "What is Stybot?", link: "/what-is-stybot" }],
            },
            {
                text: "Commands",
                items: [
                    { text: "Introduction", link: "/introduction" },
                    { text: "admin", link: "/admin" },
                    { text: "ask", link: "/ask" },
                    { text: "badjoke", link: "/badjoke" },
                    { text: "cheer", link: "/cheer" },
                    { text: "commands", link: "/commands" },
                    { text: "dice", link: "/dice" },
                    { text: "excuse", link: "/excuse" },
                    { text: "forsen", link: "/forsen" },
                    { text: "js", link: "/js" },
                    { text: "nba", link: "/nba" },
                    { text: "pyramid", link: "/pyramid" },
                    { text: "rank", link: "/rank" },
                    { text: "slots", link: "/slots" },
                    { text: "sr", link: "/sr" },
                    { text: "time", link: "/time" },
                    { text: "translate", link: "/translate" },
                    { text: "trivia", link: "/trivia" },
                    { text: "urban", link: "/urban" },
                    { text: "weather", link: "/weather" },
                    { text: "wiki", link: "/wiki" },
                ],
            },
            {
                text: "Misc",
                items: [{ text: "Permissions", link: "/permissions" }],
            },
        ],
    },
})
