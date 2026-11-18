import StaggeredMenu from "@/components/StaggeredMenu";
import type { StaggeredMenuProps } from "@/components/StaggeredMenu";

const menuItems = [
  { label: "Home", ariaLabel: "Go to home section", link: "#home" },
  { label: "About", ariaLabel: "Go to about section", link: "#about" },
  { label: "Projects", ariaLabel: "Go to projects section", link: "#projects" },
  { label: "Contact", ariaLabel: "Go to contact section", link: "#contact" }
];

const socialItems = [
  { label: "GitHub", link: "https://github.com" },
  { label: "LinkedIn", link: "https://linkedin.com" },
  { label: "Twitter", link: "https://twitter.com" }
];

type SiteStaggeredMenuProps = Omit<
  StaggeredMenuProps,
  "items" | "socialItems" | "logo" | "menuButtonColor" | "openMenuButtonColor" | "accentColor" | "colors" | "centerText"
>;

export function SiteStaggeredMenu(props: SiteStaggeredMenuProps) {
  return (
    <StaggeredMenu
      logo={<span className="text-xl font-bold tracking-tighter text-foreground">Software Dev.</span>}
      centerText={
        <>
          Multidisciplinary Developer
          <br />
          Based Indonesia
        </>
      }
      menuButtonColor="#18181B"
      openMenuButtonColor="#18181B"
      accentColor="#F97316"
      colors={["#F4F0EA", "#18181B"]}
      items={menuItems}
      socialItems={socialItems}
      {...props}
    />
  );
}
