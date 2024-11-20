import Text from "@/components/Text";
import cls from './AboutUsPage.module.scss'

const AboutUsPage = () => {
  return (
    <div className={cls.AboutUsPage}>
      <Text tag="p" view="p-20" className={cls.AboutUsPage__text}>
        Welcome to Lalasia, your trusted destination for stylish and comfortable apparel.
        Our mission is to provide high-quality, modern clothing that fits seamlessly into your everyday life.
      </Text>
      <Text tag="p" view="p-20" className={cls.AboutUsPage__text}>
        At Lalasia, we prioritize customer satisfaction and carefully curate our products to meet your needs.
         Whether you’re looking for the latest trends or timeless essentials, we’ve got you covered.
      </Text>
      <Text tag="p" view="p-20" className={cls.AboutUsPage__text}>
        Join us on this journey as we redefine convenience and style in the world of online shopping.
         Explore, shop, and experience the best with Lalasia!
      </Text>
    </div>
  );
};

export default AboutUsPage;
