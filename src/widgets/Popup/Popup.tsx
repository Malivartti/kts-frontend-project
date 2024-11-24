import classNames from 'classnames';
import { FC, ReactNode, useCallback, useEffect, useRef, useState } from 'react';

import cls from './Popup.module.scss';

type PopupProps = {
  className?: string;
  button: ReactNode;
  children: ReactNode;
}

const Popup: FC<PopupProps> = ({ className, button, children }) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const popupRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) {
      const { x, width } = listRef.current.getBoundingClientRect();

      if (x + width > window.innerWidth) {
        listRef.current.style.left = '0px';
        listRef.current.style.right = '15px';
      }

      if (x < 15) {
        listRef.current.style.left = '15px';
      }
    }
  });

  const toggle = useCallback(() => {
    setIsShow(prev => !prev);
  }, []);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!popupRef.current?.contains(event.target as HTMLElement)) {
        setIsShow(false);
      }
    };

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className={classNames(cls.Popup, className)}>
      <button
        ref={popupRef}
        className={cls.Popup__button}
        type='button'
        onClick={toggle}
      >
        {button}
      </button>
      {
        isShow && (
          <div className={cls.Popup__list} ref={listRef}>
            {children}
          </div>
        )
      }

    </div>
  );
};

export default Popup;
