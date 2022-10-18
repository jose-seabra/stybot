import { defineConfig } from "vitepress"

export default defineConfig({
    title: "Stybot",
    titleTemplate: "Stybot",
    base: "/stybot/",
    cleanUrls: "with-subfolders",
    themeConfig: {
        sidebar: [
            {
                text: "Introduction",
                items: [
                    { text: "What is Stybot?", link: "/what-is-stybot" },
                ],
            },
            {
                text: "Commands",
                items: [
                    { text: "Introduction", link: "/introduction" },
                    { text: "ask", link: "/ask" },
                    { text: "badjoke", link: "/badjoke" },
                    { text: "cheer", link: "/cheer" },
                    { text: "dice", link: "/dice" },
                    { text: "excuse", link: "/excuse" },
                    { text: "pyramid", link: "/pyramid" },
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
                items: [
                    { text: "Permissions", link: "/permissions" },
                ],
            },
        ],
    },
})
