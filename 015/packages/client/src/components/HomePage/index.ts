import { Component } from '@/core/Component';
import { Menu } from '@/components/Menu';
import { MainContents } from '@/components/HomePage/MainContents';
import { Ranking } from '@/components/HomePage/Ranking';
import { $ } from '@/utils';

interface HomePageProps {
  $target: Element;
}

function HomePage({ $target }: HomePageProps) {
  return Component.create({
    $target,

    template() {
      return `
        <header></header> 
        <main>
          <section class="main-section"></section>
          <section class="ranking-section"></section>
        </main>
      `;
    },

    mounted() {
      const $header = $('header')!;
      const $mainSection = $('.main-section')!;
      const $rankingSection = $('.ranking-section')!;

      Menu({ $target: $header });
      MainContents({ $target: $mainSection });
      Ranking({ $target: $rankingSection });
    },
  });
}

export { HomePage };
