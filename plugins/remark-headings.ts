import type { Heading, Root, RootContent } from 'mdast';

export interface OutlineHeading {
  depth: 2 | 3;
  text: string;
  id: string;
}

// Gives every ## / ### heading a stable slug id and exports the list as
// `headings` from the compiled MDX module — the source for the case study's
// outline/TOC nav. Only top-level headings count, which is all MDX produces
// for plain `##` lines.
export function remarkHeadings() {
  return (tree: Root) => {
    const headings: OutlineHeading[] = [];
    const used = new Map<string, number>();

    for (const node of tree.children) {
      if (node.type !== 'heading' || (node.depth !== 2 && node.depth !== 3)) continue;
      const text = toText(node);
      const base = slugify(text) || 'section';
      const seen = used.get(base) ?? 0;
      used.set(base, seen + 1);
      const id = seen ? `${base}-${seen}` : base;

      node.data = { ...node.data, hProperties: { ...node.data?.hProperties, id } };
      headings.push({ depth: node.depth, text, id });
    }

    tree.children.unshift(exportConst('headings', headings));
  };
}

function toText(node: Heading | RootContent): string {
  if ('value' in node && typeof node.value === 'string') return node.value;
  if ('children' in node) return (node.children as RootContent[]).map(toText).join('');
  return '';
}

function slugify(text: string) {
  return text
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// `export const <name> = <JSON value>` as an MDX ESM node
function exportConst(name: string, value: unknown): RootContent {
  return {
    type: 'mdxjsEsm',
    value: '',
    data: {
      estree: {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            specifiers: [],
            source: null,
            attributes: [],
            declaration: {
              type: 'VariableDeclaration',
              kind: 'const',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  id: { type: 'Identifier', name },
                  init: toEstree(value),
                },
              ],
            },
          },
        ],
      },
    },
  } as unknown as RootContent;
}

function toEstree(value: unknown): object {
  if (Array.isArray(value)) return { type: 'ArrayExpression', elements: value.map(toEstree) };
  if (value && typeof value === 'object') {
    return {
      type: 'ObjectExpression',
      properties: Object.entries(value).map(([key, v]) => ({
        type: 'Property',
        kind: 'init',
        method: false,
        shorthand: false,
        computed: false,
        key: { type: 'Literal', value: key },
        value: toEstree(v),
      })),
    };
  }
  return { type: 'Literal', value };
}
