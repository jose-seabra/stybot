import { defineConfig } from "vitepress"

export default defineConfig({
    title: "Home",
    titleTemplate: "Stybot",
    base: "/stybot/",
    cleanUrls: "with-subfolders",
    themeConfig: {
        sidebar: [
            {
                text: "Commands",
                items: [
                    { text: "Ask", link: "/ask" },
                    { text: "Page 2", link: "/2" },
                ],
            },
            {
                text: "Permissions",
                items: [
                    { text: "Permissions", link: "/permissions" },
                ],
            },
        ],
    },
})
