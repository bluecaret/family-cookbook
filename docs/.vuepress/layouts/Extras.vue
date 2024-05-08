<script setup>
import ParentLayout from '../components/ParentLayout.vue'

const fiberContents = {
  Vegetables: [
    { name: 'Alfalfa sprouts', fiber: '0.3g', size: '½ cup, 16g' },
    { name: 'Asparagus', fiber: '0.3g', size: '1 spear, 15g' },
    { name: 'Avocado, Hass', fiber: '4.7g', size: '½ whole, 68g' },
    { name: 'Bell pepper, green/red', fiber: '0.7g', size: '½ pepper, 57g' },
    { name: 'Bean Sprouts', fiber: '0.5g', size: '½ cup, 62g' },
    { name: 'Broccoli', fiber: '1.1g', size: '½ cup, chopped, 44g' },
    { name: 'Burdock Root', fiber: '1.2g', size: '½ cup, 62.5g' },
    { name: 'Butternut Squash', fiber: '3.3g', size: '½ cup, cubed, 102g' },
    { name: 'Cabbage', fiber: '1.4g', size: '½ cup shredded, 75g' },
    { name: 'Cabbage, nappa', fiber: '1g', size: '½ cup, shredded, 54g' },
    { name: 'Cabbage, red', fiber: '2g', size: '½ cup, shredded, 75g' },
    { name: 'Carrots', fiber: '1.8g', size: '½ cup chopped, 156g' },
    { name: 'Carrots, baby', fiber: '3g', size: '10 whole (10g) pieces' },
    { name: 'Cauliflower', fiber: '1.4g', size: '½ cup, chopped, 62g' },
    { name: 'Celery', fiber: '0.6g', size: '1 stalk, 40g' },
    { name: 'Corn, frozen', fiber: '2.3g', size: '½ cup, 82g' },
    { name: 'Corn, on the cob', fiber: '2.5g', size: '1 ear, 103g' },
    { name: 'Cucumber', fiber: '0.5g', size: '½ whole, 100g' },
    { name: 'Daikon radish', fiber: '0.6g', size: '1” piece, 35g' },
    { name: 'Garlic / Ginger', fiber: '<0.1g', size: '1 tsp' },
    { name: 'Lettuce, green leaf', fiber: '0.2g', size: '½ cup, 18g' },
    { name: 'Lettuce, red leaf', fiber: '0.1g', size: '½ cup, 14g' },
    { name: 'Lettuce, romaine', fiber: '0.3g', size: '½ cup, 14g' },
    { name: 'Lotus Root', fiber: '1.9g', size: '½ cup, 60g' },
    { name: 'Mushroom, Baby Bella', fiber: '0.5g', size: '2 mushrooms, 24g' },
    { name: 'Olives, black', fiber: '1.2g', size: '10 olives, 38g' },
    { name: 'Onion, yellow/white/red/sweet', fiber: '1.6g', size: '½ cup, 113g' },
    { name: 'Onion, green', fiber: '0.4g', size: '1x 4” long, 15g' },
    { name: 'Peas', fiber: '4.4g', size: '½ cup, 80g' },
    { name: 'Pepperoncini', fiber: '1g', size: '1 whole, 33g' },
    { name: 'Spinach, cooked', fiber: '2.2g', size: '½ cup, 90g' },
    { name: 'Spinach, raw', fiber: '0.3g', size: '½ cup, 15g' },
    { name: 'Sweet Potato, medium', fiber: '3.8g', size: '½ potato, 57g' },
    { name: 'Tomato, steak, med.', fiber: '0.8g', size: '½ whole, 61g' },
    { name: 'Tomato, cherry', fiber: '1g', size: '5 whole, 85g' },
    { name: 'Tomato, roma', fiber: '0.7g', size: '1 whole, 62g' },
    { name: 'Zucchini, raw', fiber: '1g', size: '½ whole, 100g' },
  ],
  Fruit: [
    { name: 'Apple', fiber: '2g', size: '86g (small whole)' },
    { name: 'Applesauce', fiber: '2.7g', size: '1 cup, 244g' },
    { name: 'Asian Pear', fiber: '2.2g', size: '½ whole, 61g' },
    { name: 'Banana', fiber: '3.1g', size: '1 whole, 118g' },
    { name: 'Blackberries', fiber: '2g', size: '6 berries, 39g' },
    { name: 'Blueberries', fiber: '0.2g', size: '6 berries, 5.6g' },
    { name: 'Cantaloupe Melon', fiber: '0.7g', size: '½ cup, 82g' },
    { name: 'Cherries, Rainier', fiber: '1g', size: '6 cherries, 49g' },
    { name: 'Grapes, green or red', fiber: '0.4g', size: '10 grapes, 49g' },
    { name: 'Honeydew Melon', fiber: '0.7g', size: '½ cup, 87g' },
    { name: 'Mango', fiber: '2.7g', size: '½ whole, 168g' },
    { name: 'Orange', fiber: '1.6g', size: '½ whole, 70g' },
    { name: 'Orange, Halo', fiber: '1.3g', size: '1 whole, 74g' },
    { name: 'Peach', fiber: '1.3g', size: '½ whole, 87g' },
    { name: 'Pear', fiber: '2.8g', size: '½ whole, 89g' },
    { name: 'Raspberries', fiber: '0.8g', size: '6 berries, 12g' },
    { name: 'Strawberries', fiber: '2.2g', size: '3 berries, 108g' },
  ],
  'Nuts & Seeds': [
    { name: 'Chia Seeds', fiber: '4.1g', size: '1 tbsp, 12g' },
    { name: 'Flax Seeds', fiber: '2.8g', size: '1 tbsp. 10.3g' },
    { name: 'Peanuts, roasted', fiber: '3g', size: '¼ cup, 36g' },
    { name: 'Poppy Seeds', fiber: '1.7g', size: '1 tbsp, 8.4g' },
    { name: 'Pumpkin Seeds, roasted', fiber: '1.2g', size: '1 tbsp, 8g' },
    { name: 'Sesame Seeds, toasted', fiber: '1.6g', size: '1 tbsp, 10g' },
    { name: 'Sunflower Seeds, roasted', fiber: '0.9g', size: '1 tbsp, 8g' },
  ],
  Legumes: [
    { name: 'Chickpeas, canned', fiber: '8g', size: '½ can, 126g' },
    { name: 'Edamame, cooked', fiber: '4g', size: '½ cup, 78g' },
    { name: 'Kidney Beans, canned', fiber: '7.5g', size: '½ can, 133g' },
    { name: 'Lentils, cooked', fiber: '8g', size: '½ cup, 99g' },
    { name: 'Lima (butter) Beans', fiber: '6.5g', size: '½ cup, 94g' },
    { name: 'Pinto Beans, canned', fiber: '10g', size: '½ can, 221g' },
    { name: 'Red beans, cooked', fiber: '5.5g', size: '½ cup, 88g' },
  ],
  'Dips & Spreads': [
    { name: 'Justin’s Peanut Butter', fiber: '0.5g', size: '1 tbsp, 16g' },
    { name: 'Tahini', fiber: '0.7g', size: '1 tbsp, 15g' },
  ],
  Pasta: [
    { name: 'Whole Wheat Pasta', fiber: '3.1g', size: '½ cup, 80g' },
    { name: 'Shirataki Noodles', fiber: '3g', size: '2 oz, 55g' },
  ],
  Grains: [
    { name: 'Barley, pearled', fiber: '3g', size: '½ cup, 96.5g' },
    { name: 'Popcorn, air-popped', fiber: '1.2g', size: '1 cup, 8g' },
    { name: 'Quinoa, cooked', fiber: '2.6g', size: '½ cup, 93g' },
    { name: 'Steel Cut Oats', fiber: '8g', size: '½ cup, 80g' },
  ],
  'Soy Products': [
    { name: 'Miso', fiber: '0.9g', size: '1 tbsp, 17g' },
    { name: 'Natto', fiber: '4.8g', size: '½ cup, 87g' },
    { name: 'Tempeh', fiber: '5g', size: '3 oz, 84g' },
    { name: 'Tofu', fiber: '2g', size: '3 oz, 84g' },
  ],
}
</script>

<template>
  <ParentLayout>
    <h1>CardioMetabolic Diet Resources</h1>
    <ul class="resourcesList">
      <li><a :href="$withBase('/cardiometabolic-foods.pdf')">CardioMetabolic Foods</a></li>
      <li><a :href="$withBase('/cardiometabolic-meal-plan.pdf')">CardioMetabolic Meal Plan</a></li>
      <li>
        <a :href="$withBase('/cardiometabolic-diet-comprehensive-guide.pdf')"
        >CardioMetabolic Diet Comprehensive Guide</a
        >
      </li>
    </ul>
    <hr style="margin-block: 2rem" />
    <h1>Fiber content in ingredients</h1>
    <div class="fiberContent">
      <template v-for="(cat, catName) in fiberContents" :key="catName">
        <h3>{{ catName }}</h3>
        <ul class="fiberList">
          <li v-for="item in cat" :key="item.name">
            <div>{{ item.name }}</div>
            <div>{{ item.fiber }}</div>
            <div>{{ item.size }}</div>
          </li>
        </ul>
      </template>
    </div>
  </ParentLayout>
</template>

<style lang="scss" scoped>
.fiberContent {
  columns: 2;
  gap: 4rem;
  h3:first-child {
    margin-top: 0;
  }
  @media screen and (max-width: 1000px) {
    gap: 2rem;
  }
  @media screen and (max-width: 900px) {
    columns: 1;
  }
}
.fiberList {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  li {
    display: grid;
    grid-template-columns: 1fr 6ch 20ch;
    // font-size: 0.9em;
    div:nth-child(1) {
      display: grid;
      grid-template-columns: auto 1fr;
      align-items: baseline;
      &::before {
        border-bottom: 1px dotted currentColor;
        content: '';
        flex-grow: 1;
        height: 1em;
        order: 2;
        margin: 0 3px;
        opacity: 0.3;
      }
    }
  }
}
.resourcesList {
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  list-style: none;
  margin: 1rem auto 2rem;
  padding: 0;
  align-items: center;
}
</style>