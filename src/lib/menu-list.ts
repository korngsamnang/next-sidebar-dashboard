import { LayoutGrid, LucideIcon, Settings } from "lucide-react";

type Submenu = {
    href: string;
    label: string;
    active?: boolean;
};

type Menu = {
    href: string;
    label: string;
    active?: boolean;
    icon: LucideIcon;
    submenus?: Submenu[];
};

type Group = {
    groupLabel: string;
    menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
    return [
        {
            groupLabel: "",
            menus: [
                {
                    href: "/dashboard",
                    label: "Dashboard",
                    icon: LayoutGrid,
                    submenus: [],
                },
            ],
        },
        // {
        //     groupLabel: "Contents",
        //     menus: [
        //         {
        //             href: "/trainees",
        //             label: "Trainees",
        //             icon: UserRoundCheck,
        //         },
        //
        //         {
        //             href: "/trainers",
        //             label: "Trainers",
        //             icon: UserPen,
        //         },
        //
        //         {
        //             href: "/courses",
        //             label: "Courses/Skills",
        //             icon: GraduationCap,
        //         },
        //         {
        //             href: "/training-providers",
        //             label: "Training Providers",
        //             icon: School,
        //         },
        //     ],
        // },

        {
            groupLabel: "Settings",
            menus: [
                {
                    href: "/account",
                    label: "Account",
                    icon: Settings,
                },
            ],
        },
    ];
}
