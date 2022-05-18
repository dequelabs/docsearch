import { createElement } from 'react';

import type { StoredDocSearchHit } from './types';

function getPropertyByPath(object: Record<string, any>, path: string): any {
  const parts = path.split('.');

  return parts.reduce((prev, current) => {
    if (prev?.[current]) return prev[current];
    return null;
  }, object);
}

interface SnippetProps<TItem> {
  hit: TItem;
  attribute: string;
  tagName?: string;
  [prop: string]: unknown;
}

export function Snippet<TItem extends StoredDocSearchHit>({
  hit,
  attribute,
  tagName = 'span',
  ...rest
}: SnippetProps<TItem>) {
  let property: string =
    getPropertyByPath(hit, `_snippetResult.${attribute}.value`) ||
    getPropertyByPath(hit, attribute);

  if (attribute === 'url') {
    property = property
      .substring(property.lastIndexOf('/'))
      .replace(/#.*$/, '');
  }

  return createElement(tagName, {
    ...rest,
    dangerouslySetInnerHTML: {
      __html: property,
    },
  });
}
