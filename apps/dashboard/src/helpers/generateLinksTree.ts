import { PageName } from "components/Layout";
import { LinkProp } from "components/Layout/NavBarLinks";
export type LinksTree = {
  path: string;
  pageName: PageName;
  icon?: React.ReactNode;
  children: LinksTree[];
};
export default function generateLinksTree(links: LinkProp[]): LinksTree[] {
  const linksTree: LinksTree[] = [];

  links.forEach((link) => {
    if (link.path === "/") {
      linksTree.push({
        path: "/",
        pageName: link.pageName as PageName,
        icon: link.icon,
        children: [],
      });
      return;
    }

    const pathSegments = link.path.split("/").filter(Boolean);
    let currentLevel = linksTree;

    pathSegments.forEach((_, index) => {
      const pathUpToCurrent = `/${pathSegments.slice(0, index + 1).join("/")}`;

      let existingNode = currentLevel.find(
        (node) => node.path === pathUpToCurrent
      );

      if (!existingNode) {
        existingNode = {
          path: pathUpToCurrent,
          pageName: link.pageName as PageName,
          icon: link.icon,
          children: [],
        };
        currentLevel.push(existingNode);
      }

      currentLevel = existingNode.children;
    });
  });

  return linksTree;
}
