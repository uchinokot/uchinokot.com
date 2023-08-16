import { visit } from "unist-util-visit";

export default function transformImgToFigure() {
  return (tree: any) => {
    visit(tree, "paragraph", (paragraph: any) => {
      if (paragraph.children.length !== 1) {
        return;
      }

      const image = paragraph.children[0];
      if (image.type !== "image" || !image.title) {
        return;
      }

      const figure = {
        type: "figure",
        children: [
          {
            ...image,
          },
          {
            type: "figcaption",
            children: [
              {
                type: "text",
                value: image.title,
              },
            ],
            data: {
              hName: "figcaption",
            },
          },
        ],
        data: {
          hName: "figure",
        },
      };

      paragraph.children = figure.children;
      paragraph.data = figure.data;
      paragraph.type = figure.type;
    });
  };
}
