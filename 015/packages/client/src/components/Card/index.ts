import { Component } from '@/core/Component';
import { Router } from '@/core/Router';
import '@/components/Card/style.scss';

interface HubContent {
  idx: number;
  mediaName: string;
  title: string;
  url: string;
  imageUrl: string;
  summaryContent: string;
}

interface CardProps extends HubContent {
  $target: Element;
  bookmarkable?: boolean;
}

function Card({ $target, idx, mediaName, title, url, imageUrl, summaryContent, bookmarkable = true }: CardProps) {
  return Component.create({
    $target,

    template() {
      return `
        <li data-id="${idx}" data-mediaName="${mediaName}" class="card">
          <a data-route="${Router.routeSymbol}" href="${url ?? ''}">
            <span class="img-thumb"><img src="${imageUrl ?? ''}"></span>
            <strong class="title">${title}</strong>
            <span class="text">${summaryContent}</span>
          </a>
          <span class="author">by ${mediaName}</span>
          ${bookmarkable ? '<button class="bookmark-btn">즐겨찾기</button>' : ''}
        </li>
      `;
    },

    render() {
      const tempNode = document.createElement('div');
      tempNode.innerHTML = this.template();
      this.$target.appendChild(tempNode.children[0]);
    },
  });
}

export { Card, HubContent };
