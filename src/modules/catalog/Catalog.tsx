import styles from "./Catalog.module.css";
import { Card, Button, Image, Text } from "@mantine/core";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";
import { useEffect } from "react";
import {
  fetchCards,
  addToCart,
  incrementCount,
  decrementCount,
} from "../../store/slices/cardsSlice";
import { Loader } from "@mantine/core";

import catalogCard from "../../assets/cart.png";

const Catalog = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cards = useSelector((state: RootState) => state.cards.items);

  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch]);

  if (cards.length === 0)
    return (
      <div className={styles.loader}>
        <Loader size="xl" />
      </div>
    );

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.wrapper__title}>Catalog</h1>

      <div className={styles.wrapper__cards}>
        {cards.map((i) => (
          <Card
            className={styles.wrapper__card}
            key={i.id}
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
          >
            <Card.Section>
              <Image src={i.image} height={300} alt="product" />
            </Card.Section>

            <div className={styles.wrapper__info}>
              <Text className={styles.wrapper__name}>{i.name}</Text>

              <div className={styles.wrapper__box}>
                <Button
                  variant="light"
                  className={styles.wrapper__btns}
                  onClick={() => dispatch(decrementCount(i.id))}
                  aria-label="decrement"
                >
                  -
                </Button>

                <Text>{i.count}</Text>

                <Button
                  variant="light"
                  className={styles.wrapper__btns}
                  onClick={() => dispatch(incrementCount(i.id))}
                  aria-label="increment"
                >
                  +
                </Button>
              </div>
            </div>

            <div className={styles.wrapper__footer}>
              <Text className={styles.wrapper__price}>$ {i.price}</Text>

              <Button
                onClick={() => {
                  dispatch(addToCart(i));
                }}
                variant="light"
                color="blue"
                fullWidth
                mt="md"
                radius="md"
                className={styles.wrapper__buy}
              >
                Add to cart
                <img src={catalogCard} alt="cart" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
