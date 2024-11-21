import Button, { ButtonTheme } from "@/components/Button";
import Text from "@/components/Text";
import cls from './NotFoundPage.module.scss'
import { useNavigate } from "react-router-dom";
import { AppRouteUrls } from "@/configs/router";
import { useCallback } from "react";

const NotFoundPage = () => {
  const navigate = useNavigate()
  
  const toMain = useCallback(() => {
    navigate(AppRouteUrls.root)
  }, [])

  return (
    <div className={cls.NotFoundPage}>
      <div className={cls.NotFoundPage__content}>
        <Text tag='h1' view='title'>404</Text>
        <Text tag='h2' view='p-32' color='secondary'>Страница не найдена</Text>
        <Button theme={ButtonTheme.CLEAR} onClick={toMain}>Вернутся на главную</Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
