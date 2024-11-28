import { AppRouteUrls } from '@shared/configs/router';
import rootStore from '@shared/stores/RootStore';
import Button from '@shared/ui/Button';
import Text from '@shared/ui/Text';
import BugProductsList from '@widgets/BagProductsList';
import { observer } from 'mobx-react-lite';
import { FC, useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import cls from './Sidebar.module.scss';

type SidebarProps = {
  isShow: boolean;
  setIsShow: (value: boolean) => void;
}

const Sidebar: FC<SidebarProps> = ({ isShow, setIsShow }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const sidebarRef = useRef<HTMLDivElement>(null);

  const toOrder = useCallback(() => {
    navigate(AppRouteUrls.order.create());
    setIsShow(false);
  }, [navigate, setIsShow]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!sidebarRef.current?.contains(event.target as HTMLElement)) {
        setIsShow(false);
      }
    };

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [isShow, setIsShow]);

  if (!isShow) {
    return;
  }

  return (
    <div className={cls.Sidebar}>
      <div className={cls.Sidebar__container} ref={sidebarRef}>
        <Text className={cls.Sidebar__title} tag='h2' view='p-32'>{t('Покупки')}</Text>
        <BugProductsList list={rootStore.bag.bag} totalSum={rootStore.bag.totalSum}/>
        {!!rootStore.bag.bagCount && (
          <Button className={cls.Sidebar__btn} onClick={toOrder}>
            {t('Купить')}
          </Button>
        )}
      </div>
    </div>
  );
};

export default observer(Sidebar);
