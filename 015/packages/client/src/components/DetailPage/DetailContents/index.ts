import { Component } from '@/core/Component';

interface DetailContentsProps {
  $target: Element;
  isLoading: boolean;
  isError: boolean;
  html: {
    title?: string;
    media?: string;
    body?: string;
  };
}

function DetailContents({ $target, isLoading, isError, html }: DetailContentsProps) {
  return Component.create({
    $target,

    template() {
      if (isLoading) return '로딩 중 ...';

      if (isError) return '에러 발생';

      const { title, media, body } = html;

      return `
        <div>${title}</div>
        <div>${media}</div>
        <div>${body}</div>
      `;
    },
  });
}

export { DetailContents };
