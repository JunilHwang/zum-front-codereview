import { Component } from '@/core/Component';
import { useStore } from '@/core/Store';
import { Menu } from '@/components/Menu';
import { CardList } from '@/components/SubPage/CardList';
import { HubContent } from '@/components/Card';
import { actionTypes } from '@/reducer';
import { $ } from '@/utils';

interface SubPageProps {
  $target: Element;
  fetchList: any;
}

interface State {
  list: HubContent[];
  isError: boolean;
  isLoading: boolean;
}

const card = {
  initial: 12,
  additional: 4,
  max: 40,
};

function SubPage({ $target, fetchList }: SubPageProps) {
  return Component.create({
    $target,
    store: useStore(),

    template() {
      return `
        <header></header> 
        <main></main>
      `;
    },

    async willMount() {
      try {
        this.setState({ list: [], isLoading: true, isError: false });
        this.store.dispatch({ type: actionTypes.ADD_COUNT });

        const list = await fetchList({ length: card.initial });

        this.setState({ list, isLoading: false, isError: false });
      } catch (err) {
        console.error(err);
        this.setState({ isLoading: false, isError: true });
      }
    },

    async handleScroll() {
      try {
        const start = this.state.list.length;

        if (start >= card.max) return;

        this.store.dispatch({ type: actionTypes.ADD_COUNT });

        const newList = await fetchList({ start, length: card.additional });

        if (newList.length === 0) return;

        this.setState({ list: [...this.state.list, ...newList] });
      } catch (err) {
        console.error(err);
        this.setState({ isLoading: false, isError: true });
      }
    },

    shouldUpdate(prev: State, next: State) {
      if (!prev.list || prev.list.length === 0) return true;

      this.CardList.appendCard(next.list.slice(-card.additional));

      return false;
    },

    render() {
      const { list, isLoading, isError } = this.state;

      this.$target.innerHTML = this.template();

      const $header = $('header')!;
      const $main = $('main')!;

      Menu({ $target: $header });
      this.CardList = CardList({ $target: $main, list, isLoading, isError, onScroll: this.handleScroll.bind(this) });
    },
  });
}

export { SubPage };
