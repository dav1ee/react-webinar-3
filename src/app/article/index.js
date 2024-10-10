import { memo, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import shallowequal from 'shallowequal';

import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import TopHead from '../../containers/top-head';

import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Spinner from '../../components/spinner';
import ArticleCard from '../../components/article-card';
import CommentsSection from '../../components/comments-section';

import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import useCustomSelector from '../../hooks/use-selector';

import articleActions from '../../store-redux/article/actions';
import commentsActions from '../../store-redux/comments/actions';

function Article() {
  const store = useStore();

  const dispatch = useDispatch();

  // Параметры из пути /articles/:id
  const params = useParams();

  const { t, lang } = useTranslate();

  useInit(() => {
    dispatch(articleActions.load(params.id));
    dispatch(commentsActions.load(params.id));
  }, [params.id, lang]);

  const select = useSelector(
    state => ({
      article: state.article.data,
      waitingArticle: state.article.waiting,
      commentsItems: state.comments.data.items,
      commentsCount: state.comments.data.count,
      commentsErrors: state.comments.errors,
      waitingComments: state.comments.waiting,
    }),
    shallowequal,
  ); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const customSelect = useCustomSelector(state => ({
    user: state.session.user,
    sessionExists: state.session.exists,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Добавление комментария
    addComment: useCallback(
      (id, text) =>
        dispatch(commentsActions.add(id ?? params.id, id ? 'comment' : 'article', text)),
      [params.id],
    ),
  };

  return (
    <PageLayout key={lang}>
      <TopHead />
      <Head title={select.article.title}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waitingArticle}>
        <ArticleCard article={select.article} onAdd={callbacks.addToBasket} t={t} />
      </Spinner>
      <Spinner active={select.waitingComments}>
        <CommentsSection
          t={t}
          lang={lang}
          comments={select.commentsItems ?? []}
          commentsCount={select.commentsCount ?? 0}
          waitingComments={select.waitingComments}
          errors={select.commentsErrors}
          currentUser={{
            id: customSelect.user?._id,
            name: customSelect.user?.profile?.name,
          }}
          sessionExists={customSelect.sessionExists}
          onAdd={callbacks.addComment}
        />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Article);
