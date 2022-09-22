import { defineStore } from 'pinia';
import { testData, testPosts, type ColumnProps, type PostProps } from '../testData';

interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
  columnId?: number;
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
    user: { isLogin: true, name: 'deexiao', columnId: 1 }
  }),
  actions: {
    login() {
      this.user = { ...this.user, isLogin: true, name: 'deexiao' };
    },
    createPost(newPost: any) {
      this.posts.push(newPost);
    }
  },
  // getters 类似于vue中的计算属性，用于抽象运算结果
  getters: {
    getColumnById: state => (id: number) => {
      return state.columns.find(c => c.id === id);
    },
    getPostsByCid: state => (cid: number) => {
      return state.posts.filter(post => post.columnId === cid);
    }
  }
});
