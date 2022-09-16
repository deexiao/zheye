import { defineStore } from 'pinia';
import { testData, testPosts, type ColumnProps, type PostProps } from '../testData';

interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
}
export interface GlobalDataProps {
  columns: ColumnProps[]; // xxx的专栏
  posts: PostProps[]; // xxx的专栏下的文章
  user: UserProps;
}

export const useStore = defineStore('store', {
  state: (): GlobalDataProps => ({
    columns: testData,
    posts: testPosts,
    user: { isLogin: false }
  }),
  actions: {
    login() {
      this.user = { ...this.user, isLogin: true, name: 'deexiao' };
    }
  },
  getters: {
    getColumnById: state => (id: number) => {
      return state.columns.find(c => c.id === id);
    },
    getPostsByCid: state => (cid: number) => {
      return state.posts.filter(post => post.columnId === cid);
    }
  }
});
