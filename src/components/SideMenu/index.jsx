import { useEffect } from 'react';
import Footer from '../Footer';
import { IconButton } from '../IconButton';
import { InputSearch } from '../InputSearch';
import { Container, Content, HeaderSideMenu, LogoutButton } from './styles';
import { MdClose } from "react-icons/md";
import { useAuth } from '../../hooks/auth';
import { Link } from 'react-router-dom';
import { Button } from '../Button';
import { IoIosAddCircleOutline } from 'react-icons/io';

export function SideMenu({ menuIsOpen, handleCloseMenu }) {
  const { signOut, isAdmin } = useAuth();

  useEffect(() => {
    if (menuIsOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [menuIsOpen]);

  return (
    <Container data-menu-is-open={menuIsOpen}>
      <HeaderSideMenu>
        <IconButton
          type="button"
          onClick={handleCloseMenu}>
          <MdClose size={22} />
        </IconButton>
        <span>Menu</span>
      </HeaderSideMenu>

      <Content>
        <div className='input-side_menu'>
          <InputSearch />
        </div>

        {isAdmin && (
            <Link to='/new-dish'>
              <Button text="Novo Prato" icon={IoIosAddCircleOutline} />
            </Link>
        )}

        <LogoutButton onClick={() => signOut()}>
          Sair
        </LogoutButton>
      </Content>

      <Footer />
    </Container>
  );
}
