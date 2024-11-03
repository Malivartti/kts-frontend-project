import classNames from 'classnames';

import Actions from './Actions';
import cls from './Header.module.scss';
import Logo from './Logo';
import Navbar from './Navbar';

const Header = () => {
  return (
    <div className={cls.Header}>
      <div className={classNames('container', cls.Header__container)}>
        <Logo />
        <Navbar />
        <Actions />
      </div>
    </div>
  );
};

export default Header;
