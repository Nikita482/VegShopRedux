import styles from "./Header.module.css";
import { Popover, Button, Text } from "@mantine/core";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store/store";

import {
  incrementCartCount,
  decrementCartCount,
} from "../../store/slices/cardsSlice";
import type { AppDispatch } from "../../store/store";

import logoNoCard from "../../assets/cart_empty.png";
import headerCard from "../../assets/Icon.png";

const Header = () => {
  const [opened, setOpened] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const cart = useSelector((state: RootState) => state.cards.cart);

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <>
      <header className={styles.header}>
        <span className={styles.header__logo}>
          Vegetable <span>SHOP</span>
        </span>

        <Popover
          opened={opened}
          onClose={() => setOpened(false)}
          position="bottom"
          withArrow
        >
          <Popover.Target>
            <Button
              color="rgba(84, 180, 106, 1)"
              radius="md"
              w={150}
              onClick={() => setOpened((i) => !i)}
            >
              {cart.length > 0 && (
                <div className={styles.header__cartCount}>{cart.length}</div>
              )}
              <span className={styles.header__cart}>Cart</span>
              <img src={headerCard} alt="card" />
            </Button>
          </Popover.Target>

          <Popover.Dropdown style={{ borderRadius: "15px" }}>
            <div className={styles.header__wrapper}>
              {cart.length === 0 ? (
                <div className={styles.header__noCard}>
                  <img src={logoNoCard} alt="no card" />
                  <p>You cart is empty!</p>
                </div>
              ) : (
                <div>
                  {cart.map((i) => (
                    <div key={i.id} className={styles.header__window}>
                      <img src={i.image} alt="foto card" />

                      <div className={styles.header__info}>
                        <p>{i.name}</p>
                        <p>き {i.price}</p>
                      </div>

                      <div className={styles.header__panel}>
                        <Button
                          variant="light"
                          onClick={() => dispatch(decrementCartCount(i.id))}
                          className={styles.wrapper__btns}
                        >
                          -
                        </Button>

                        <Text>{i.count}</Text>

                        <Button
                          variant="light"
                          onClick={() => dispatch(incrementCartCount(i.id))}
                          className={styles.wrapper__btns}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  ))}
                  <div className={styles.header__total}>
                    <p>Total</p>
                    <p>$ {total}</p>
                  </div>
                </div>
              )}
            </div>
          </Popover.Dropdown>
        </Popover>
      </header>
    </>
  );
};

export default Header;
