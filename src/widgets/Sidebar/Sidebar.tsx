import { AppRouteUrls } from '@shared/configs/router';
import rootStore from '@shared/stores/RootStore';
import Button from '@shared/ui/Button';
import Text from '@shared/ui/Text';
import BugProductsList from '@widgets/BagProductsList';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import cls from './Sidebar.module.scss';


const Sidebar= () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const sidebarRef = useRef<HTMLDivElement>(null);

  const toOrder = useCallback(() => {
    navigate(AppRouteUrls.order.create());
    rootStore.bag.setIsShowSidebar(false);
  }, [navigate]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!sidebarRef.current?.contains(event.target as HTMLElement)) {
        rootStore.bag.setIsShowSidebar(false);
      }
    };

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <>
      <div className={classNames(
        cls.Sidebar,
        { [cls.Sidebar_hide]: !rootStore.bag.isShowSidebar }
      )}>
      </div>
      <div className={classNames(
        cls.Sidebar__container,
        { [ cls.Sidebar__container_hide]: !rootStore.bag.isShowSidebar }
      )} ref={sidebarRef}>
        <Text className={cls.Sidebar__title} tag='h2' view='p-32'>{t('Корзина')}</Text>
        <BugProductsList list={rootStore.bag.bag} totalSum={rootStore.bag.totalSum}/>
        {!!rootStore.bag.bagCount && (
          <Button className={cls.Sidebar__btn} onClick={toOrder}>
            {t('Купить')}
          </Button>
        )}
      </div>

    </>
  );
};

export default observer(Sidebar);
