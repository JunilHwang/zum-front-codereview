import { Component } from '@/core/Component';
import { Menu } from '@/components/Menu';
import { DetailContents } from '@/components/DetailPage/DetailContents';
import { getDetail } from '@/api';
import { $ } from '@/utils';

interface DetailPageProps {
  $target: Element;
}

function DetailPage({ $target }: DetailPageProps) {
  return Component.create({
    $target,

    template() {
      return `
        <header></header> 
        <main></main>
      `;
    },

    async willMount() {
      try {
        this.setState({ html: {}, isLoading: true, isError: false });

        const html = await getDetail(location.pathname);

        this.setState({ html, isLoading: false });
      } catch (err) {
        console.error(err);
        this.setState({ isLoading: false, isError: true });
      }
    },

    render() {
      this.$target.innerHTML = this.template();

      const $header = $('header')!;
      const $main = $('main')!;

      Menu({ $target: $header });
      DetailContents({ $target: $main, ...this.state });
    },
  });
}

export { DetailPage };
