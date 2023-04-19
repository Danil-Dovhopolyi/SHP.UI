import React, { useEffect, useState } from 'react';
import '../HeadBlock/HeadBlock.scss';
import Login from '../ModalLogin/Login';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import Badge from '@mui/material/Badge';
import Card from '../../img/icon-card.png';
import { Link } from 'react-router-dom';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import LogoutIcon from '@mui/icons-material/Logout';
import useLogout from '../../hooks/useLogout';
import IdentityAPI from '../../API/IdentityServerAPI';
import GoogleIcon from '@mui/icons-material/Google';
import useAuth from '../../hooks/useAuth';
import useMenuFilling from '../../routers/Home/Logic/MenuLogic';

const HeadBlock = ({ onClickCart, basketOpen, productsInBasketCount }) => {
  const [anchorElement, setAnchorElement] = useState(null);
  const isOpen = !!anchorElement;
  const [authUrl, setAuthUrl] = useState('');
  const { user } = useAuth();
  const menu = useMenuFilling();
  useEffect(() => {
    IdentityAPI.post('/user/redirect-to-auth', {
      redirectUrl: window.location.href,
    })
      .then((response) => {
        setAuthUrl(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.warn(error);
      });
  }, []);

  const handleClick = (event) => {
    setAnchorElement(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorElement(null);
  };
  const logOut = useLogout();

  return (
    <div className="search">
      <div className="name-shop">
        <h1>NameShop</h1>
      </div>

      <div className="profile">
        {/* {user ? null : <Login />} */}
        <Login />
        {!basketOpen && (
          <Badge
            badgeContent={productsInBasketCount}
            color="secondary"
            max={99}
          >
            <button className="openCartButton" onClick={onClickCart}>
              <img src={Card} alt="card" />
            </button>
          </Badge>
        )}
        <Link to="/likes">
          <BookmarkBorderIcon sx={{ fill: 'black' }} />
        </Link>
        <div className="logout">
          <button onClick={logOut}>
            <LogoutIcon />
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              window.location.href = authUrl;
            }}
            style={{ backgroundColor: 'inherit', border: 'none' }}
          >
            <GoogleIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeadBlock;
