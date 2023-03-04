import path from 'node:path';

import { Temporal } from '@js-temporal/polyfill';
import * as bcrypt from 'bcrypt';

import { FeatureItem } from '../src/model/feature_item';
import { FeatureSection } from '../src/model/feature_section';
import { LimitedTimeOffer } from '../src/model/limited_time_offer';
import { MediaFile } from '../src/model/media_file';
import { Order } from '../src/model/order';
import { Product } from '../src/model/product';
import { ProductMedia } from '../src/model/product_media';
import { Profile } from '../src/model/profile';
import { Recommendation } from '../src/model/recommendation';
import { Review } from '../src/model/review';
import { ShoppingCartItem } from '../src/model/shopping_cart_item';
import { User } from '../src/model/user';
import { dataSource } from '../src/server/data_source';
import { DATABASE_SEED_PATH } from '../src/server/utils/database_paths';

import { hakusai, kyuri } from './aozora';
import { getFileList } from './get_file_list';

const TZ = process.env.TZ ?? 'Asia/Tokyo';
const BASE_DATE = process.env.SEED_BASE_UNIXTIME
  ? Temporal.Instant.fromEpochMilliseconds(Number(process.env.SEED_BASE_UNIXTIME))
  : Temporal.Now.instant();

const familyNames = [
  { display: '宮森', name: 'miyamori' },
  { display: '安原', name: 'yasuhara' },
  { display: '坂木', name: 'sakaki' },
  { display: '東堂', name: 'todo' },
  { display: '今井', name: 'imai' },
  { display: '本田', name: 'honda' },
  { display: '高梨', name: 'takanashi' },
  { display: '矢野', name: 'yano' },
  { display: '落合', name: 'ochiai' },
  { display: '渡辺', name: 'watanabe' },
];
const givenNames = [
  { display: 'あおい', name: 'aoi' },
  { display: '絵麻', name: 'ema' },
  { display: 'しずか', name: 'shizuka' },
  { display: '美沙', name: 'misa' },
  { display: 'みどり', name: 'midori' },
  { display: '豊', name: 'yutaka' },
  { display: '太郎', name: 'taro' },
  { display: '絵梨花', name: 'erika' },
  { display: '達也', name: 'tatsuya' },
  { display: '隼', name: 'shun' },
];
const farmNames = ['農園', 'ファーム', 'ナチュラルファーム', '畑'];
const vegetableFruitNames = [
  {
    display: 'キャベツ',
    name: 'cabbage',
  },
  {
    display: 'りんご',
    name: 'apple',
  },
  {
    display: 'バナナ',
    name: 'banana',
  },
  {
    display: 'ブルーベリー',
    name: 'blueberry',
  },
  {
    display: '人参',
    name: 'carrot',
  },
  {
    display: 'いちご',
    name: 'strawberry',
  },
  {
    display: 'トマト',
    name: 'tomato',
  },
];
const comments = [
  'とても美味しいです。毎週購入していますが、飽きることがありません。この野菜は、育成過程で農薬や化学肥料を使用せず、自然の力を借りて育てられたため、味が濃く、鮮烈でした。また、安全性にも配慮されているため、心置きなく食べることができました。',
  '農薬を極力少なくして栽培しているということで、子供に食べさせても安心です。この野菜は、一般的な野菜と比較しても栄養素が豊富で、食べると身体が喜ぶような感覚がありました。また、野菜本来の味わいを存分に楽しめるため、お料理にも使いやすかったです。',
  'これを一度食べてしまうと、スーパーの野菜は味が薄くて食べる気がしません。いつも美味しい野菜を届けてくださってありがとうございます！大変鮮度が良く、新鮮なうちに収穫されたものであるため、その鮮度が味わいにも影響していると感じました。また、安全性にも配慮されたこの野菜は、化学肥料や農薬による汚染の心配がありません。',
  'これを食べて、まるで大地の恵みをいただいているかのような感覚に陥りました。それほど、自然の力を借りて育てられた野菜の美味しさは、一般的な野菜とは比較になりません。',
  '健康に気を遣う人には、この商品をおすすめします。農薬や化学肥料を使用せず、自然に育てられた野菜は、身体にも優しいだけでなく、美味しいので、まるで天国の味わいのようでした。',
  '自然の恵みがたっぷりと詰まっていて、食べると身体が喜ぶような感覚を与えてくれました。野菜本来の旨味や甘みがしっかりと感じられ、食べる人を幸せな気持ちにしてくれました。',
  'まるで自然そのものから直接採れたかのような新鮮さと味わいがありました。育てられる過程で使用された農薬や化学肥料が心配なく、安心して食べることができるという安全性も嬉しいポイントでした。',
  '食べた時に優しい味わいが広がり、まるで自然に包まれているような感覚に浸ることができました。また、自然に育てられた野菜は身体にも優しく、健康にも良いということが分かり、感動的な食体験でした。',
];
const featureSections = [
  'おいしい農産物特集',
  'ポイント2倍キャンペーン',
  '健康応援フェア',
  '産地直送・生産者限定品',
  '生産者の顔が見える品',
  'ご褒美グルメ',
  '自炊レパートリーを増やそう！',
  '今おすすめしたい旬の野菜・果物',
  'プレミアムな一品',
  '地産地消で SDGs を推進しよう',
];
const descriptions = [kyuri, hakusai];
const discountRates = [0.05, 0.1, 0.15, 0.2, 0.3, 0.5];

// https://github.com/lodash/lodash/blob/2da024c3b4f9947a48517639de7560457cd4ec6c/chunk.js
function chunk<T>(array: T[], size: number): T[][] {
  const length = array.length;
  let index = 0;
  let resIndex = 0;
  const result = new Array(Math.ceil(length / size));

  while (index < length) {
    result[resIndex++] = array.slice(index, (index += size));
  }
  return result;
}

async function insert(entities: unknown[]): Promise<void> {
  const partitions = chunk(entities, 5000);

  for (const partition of partitions) {
    await dataSource.manager.save(partition);
  }
}

async function seedMediaFiles(): Promise<MediaFile[]> {
  const publicDir = path.resolve(__dirname, '../public');
  const imageDir = path.resolve(publicDir, 'images');
  const videoDir = path.resolve(publicDir, 'videos');
  const files = (await Promise.all([await getFileList(imageDir), await getFileList(videoDir)])).flat();
  const filenames = files.map((file) => {
    const relativePath = path.relative(publicDir, file);
    return '/' + relativePath;
  });
  const mediaList: MediaFile[] = [];

  for (const filename of filenames) {
    const media = new MediaFile();
    media.filename = filename;
    mediaList.push(media);
  }

  await insert(mediaList);

  return mediaList;
}

async function seedUsers({ mediaList }: { mediaList: MediaFile[] }): Promise<User[]> {
  let index = 1;

  const avatars = mediaList.filter((m) => m.filename.includes('/avatars/'));
  const users: User[] = [];
  const profiles: Profile[] = [];

  for (const familyName of familyNames) {
    for (const givenName of givenNames) {
      const asciiName = `${familyName.name}_${givenName.name}`;
      const password = await bcrypt.hash(asciiName, 10);

      const user = new User();
      user.email = `${asciiName}@example.com`;
      user.password = password;
      users.push(user);

      const profile = new Profile();
      profile.name = `${familyName.display} ${givenName.display}`;
      profile.avatar = avatars[index % avatars.length];
      profile.user = user;
      profiles.push(profile);

      index++;
    }
  }

  await insert(users);
  await insert(profiles);

  return users;
}

async function seedProducts({ mediaList }: { mediaList: MediaFile[] }): Promise<Product[]> {
  let index = 1;

  const products: Product[] = [];
  const recommendations: Recommendation[] = [];
  const offers: LimitedTimeOffer[] = [];

  for (const familyName of familyNames) {
    for (const farmName of farmNames) {
      for (const vegetableFruitName of vegetableFruitNames) {
        const vegetableFruitImages = mediaList.filter((m) =>
          m.filename.includes(`/products/${vegetableFruitName.name}/`),
        );
        const videos = mediaList.filter((m) => m.filename.includes('/videos/'));

        const productMediaList: ProductMedia[] = [];

        for (let i = 0; i < vegetableFruitImages.length; i++) {
          const productMedia = new ProductMedia();
          productMedia.file = vegetableFruitImages[i];
          productMedia.isThumbnail = false;
          productMediaList.push(productMedia);
        }
        productMediaList[index % productMediaList.length].isThumbnail = true;
        videos.slice(0, index % (videos.length + 1)).forEach((video) => {
          const productMedia = new ProductMedia();
          productMedia.file = video;
          productMedia.isThumbnail = false;
          productMediaList.push(productMedia);
        });

        await insert(productMediaList);

        const product = new Product();
        product.name = `${familyName.display}${farmName}の${vegetableFruitName.display}`;
        product.price = 1000 + 90 * (index % 10);
        product.media = productMediaList;
        product.description = descriptions[index % descriptions.length];
        products.push(product);

        if (index % 30 === 0) {
          const recommendation = new Recommendation();
          recommendation.product = product;
          recommendations.push(recommendation);
        }

        if (index % 3 === 0) {
          const offerHour = index % 24;
          for (let offset = -10; offset <= 10; offset++) {
            const startDate = BASE_DATE.toZonedDateTimeISO(TZ).add({ days: offset }).withPlainTime({
              hour: offerHour,
              minute: 0,
              second: 0,
            });
            const endDate = startDate.add({ hours: 2 });
            const discountRate = discountRates[(index + Math.abs(offset)) % discountRates.length];

            const offer = new LimitedTimeOffer();
            offer.product = product;
            offer.startDate = startDate.toInstant().toString({ timeZone: Temporal.TimeZone.from('UTC') });
            offer.endDate = endDate.toInstant().toString({ timeZone: Temporal.TimeZone.from('UTC') });
            offer.price = Math.floor(product.price * (1 - discountRate));
            offers.push(offer);
          }
        }

        index++;
      }
    }
  }

  await insert(products);
  await insert(recommendations);
  await insert(offers);

  return products;
}

async function seedFeatureSections({ products }: { products: Product[] }): Promise<void> {
  for (let sectionIndex = 0; sectionIndex < featureSections.length; sectionIndex++) {
    const section = new FeatureSection();
    section.title = featureSections[sectionIndex];

    const items: FeatureItem[] = [];
    const filteredProducts = products.filter((_, i) => i % (sectionIndex + 1) === 0);
    const totalNumberOfChunks = Math.floor(filteredProducts.length / 25);
    const selectedChunkIndex = sectionIndex % totalNumberOfChunks;
    const selectedChunk = filteredProducts.slice(25 * selectedChunkIndex, 25 * (selectedChunkIndex + 1));

    selectedChunk.forEach((product) => {
      const item = new FeatureItem();
      item.product = product;
      item.section = section;
      items.push(item);
    });

    section.items = items;

    await insert([section]);
    await insert(items);
  }
}

async function seedReviews({ products, users }: { users: User[]; products: Product[] }): Promise<void> {
  const reviews: Review[] = [];

  for (let userIndex = 0; userIndex < users.length; userIndex++) {
    for (let productIndex = 0; productIndex < products.length; productIndex++) {
      const isTarget = productIndex % 2 === userIndex % 2 && productIndex % userIndex === 0;

      if (!isTarget) {
        continue;
      }

      const review = new Review();
      review.comment = comments[(userIndex + productIndex) % comments.length];
      review.user = users[userIndex];
      review.product = products[productIndex];
      reviews.push(review);
    }
  }

  const START_OF_LAST_YEAR = BASE_DATE.toZonedDateTimeISO(TZ)
    .subtract({ years: 1 })
    .with({ day: 1, month: 1 })
    .withPlainTime();
  const duration = BASE_DATE.since(START_OF_LAST_YEAR.toInstant()).round('second').total('second');
  const interval = Math.floor(duration / reviews.length);

  reviews.forEach((review, index) => {
    const postedAt = START_OF_LAST_YEAR.add({ seconds: interval * index })
      .toInstant()
      .toString({ timeZone: Temporal.TimeZone.from('UTC') });
    review.postedAt = postedAt;
  });

  await insert(reviews);
}

async function seedOrders({ products, users }: { users: User[]; products: Product[] }): Promise<void> {
  const productsChunks = chunk(products, Math.floor(products.length / users.length));

  for (const [idx, user] of users.entries()) {
    const order = new Order();
    order.user = user;
    order.items = productsChunks[idx].map((product, idx) => {
      const item = new ShoppingCartItem();
      item.amount = (idx + 1) * 3;
      item.product = product;
      item.order = order;
      return item;
    });
    order.zipCode = '';
    order.address = '';
    order.isOrdered = false;

    await insert([order]);
    await insert(order.items);
  }
}

async function seed(): Promise<void> {
  console.log('Initializing database...');
  dataSource.setOptions({ database: DATABASE_SEED_PATH });
  dataSource.driver.database = DATABASE_SEED_PATH;
  await dataSource.initialize();
  await dataSource.synchronize(true);

  console.log('Seeding media...');
  const mediaList = await seedMediaFiles();

  console.log('Seeding users...');
  const users = await seedUsers({ mediaList });

  console.log('Seeding products...');
  const products = await seedProducts({ mediaList });

  console.log('Seeding feature sections...');
  await seedFeatureSections({ products });

  console.log('Seeding reviews...');
  await seedReviews({ products, users });

  console.log('Seeding orders...');
  await seedOrders({ products, users });
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
