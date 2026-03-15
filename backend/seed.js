const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load models
const Category = require('./models/Category');
const MenuItem = require('./models/MenuItem');

// Load env
dotenv.config();

// Connect to DB
connectDB();

const categories = [
  'Pizza',
  'Sides',
  'Beverages',
  'Combo',
  'Bestsellers',
  'Veg',
  'Non-Veg',
  'New Launches'
];

const menuItemsData = [
  // Pizza - Veg
  {
    name: 'Mexican Green Wave',
    description: 'A pizza loaded with crunchy onions, capsicum, tomatoes & jalapeno with a spicy Mexican twist.',
    price: 450,
    categoryName: 'Veg',
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&q=80&w=500'
  },
  // Pizza Category
  {
    name: 'Classic Hand Tossed Pizza',
    description: 'Freshly made dough, hand-stretched to perfection with our signature sauce.',
    price: 349,
    categoryName: 'Pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=500'
  },
  {
    name: 'Thin Crust Gourmet',
    description: 'Ultra-thin and crispy crust with a blend of premium cheeses.',
    price: 429,
    categoryName: 'Pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=500'
  },
  {
    name: 'Cheese Burst Paradise',
    description: 'Loaded with liquid cheese inside the crust for a burst of flavor.',
    price: 499,
    categoryName: 'Pizza',
    image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&q=80&w=500'
  },
  {
    name: 'Gourmet Pan Pizza',
    description: 'Thick and buttery soft crust with an abundance of toppings.',
    price: 479,
    categoryName: 'Pizza',
    image: 'https://images.unsplash.com/photo-1544982503-9f984c14501a?auto=format&fit=crop&q=80&w=500'
  },
  {
    name: 'Deluxe Veggie',
    description: 'For those who want it all! Onion, capsicum, mushroom, corn & paneer.',
    price: 490,
    categoryName: 'Veg',
    image: 'https://images.unsplash.com/photo-1544982503-9f984c14501a?auto=format&fit=crop&q=80&w=500'
  },
  {
    name: 'Veggie Paradise',
    description: 'Goldern Corn, Black Olives, Capsicum & Red Paprika.',
    price: 430,
    categoryName: 'Veg',
    image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&q=80&w=500'
  },
  {
    name: 'Farmhouse Pizza',
    description: 'Delightful combination of onion, capsicum, tomato & grilled mushroom.',
    price: 399,
    categoryName: 'Veg',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=500'
  },

  // Pizza - Non-Veg
  {
    name: 'Pepper BBQ Chicken',
    description: 'Pepper barbecue chicken for that extra zing.',
    price: 550,
    categoryName: 'Non-Veg',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=500'
  },
  {
    name: 'Chicken Dominator',
    description: 'Loaded with double pepper barbecue chicken, peri-peri chicken, chicken tikka & grilled chicken rashers.',
    price: 620,
    categoryName: 'Non-Veg',
    image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&q=80&w=500'
  },
  {
    name: 'Non Veg Supreme',
    description: 'Bite into supreme delight of Black Olives, Onions, Grilled Mushrooms, Pepper BBQ Chicken, Peri-Peri Chicken, Grilled Chicken Rashers.',
    price: 650,
    categoryName: 'Non-Veg',
    image: 'https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?auto=format&fit=crop&q=80&w=500'
  },
  {
    name: 'Chicken Keema Pizza',
    description: 'Succulent chicken keema topped with onions and jalapenos.',
    price: 580,
    categoryName: 'Non-Veg',
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&q=80&w=500'
  },

  // Bestsellers
  {
    name: 'Classic Margherita',
    description: 'Classic delight with 100% real mozzarella cheese.',
    price: 299,
    categoryName: 'Bestsellers',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=500'
  },
  {
    name: 'Peppy Paneer',
    description: 'Flavorful trio of juicy paneer, crisp capsicum with spicy red paprika.',
    price: 459,
    categoryName: 'Bestsellers',
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&q=80&w=500'
  },
  {
    name: 'Indy Tandoori Paneer',
    description: 'It is hot. It is spicy. It is oh-so-Indian. Tandoori paneer with capsicum, red paprika & mint mayo.',
    price: 499,
    categoryName: 'Bestsellers',
    image: 'https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?auto=format&fit=crop&q=80&w=500'
  },
  {
    name: 'Chicken Golden Delight',
    description: 'Mmm! Relish the delectable combination of chicken tikka and golden corn.',
    price: 549,
    categoryName: 'Bestsellers',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=500'
  },
  {
    name: 'Double Cheese Margherita',
    description: 'The ever-popular Margherita - loaded with extra cheese!',
    price: 349,
    categoryName: 'Bestsellers',
    image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&q=80&w=500'
  },

  // New Launches
  {
    name: 'Truffle Mushroom Pizza',
    description: 'Exotic mushrooms with truffle oil and creamy mozzarella.',
    price: 649,
    categoryName: 'New Launches',
    image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&q=80&w=500'
  },
  {
    name: 'Fiery Jalapeno & Corn',
    description: 'Spicy jalapenos and sweet corn topped with red paprika and chili flakes.',
    price: 429,
    categoryName: 'New Launches',
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&q=80&w=500'
  },
  {
    name: 'Creamy Mushroom & Spinach',
    description: 'A creamy base topped with earthy mushrooms and fresh sautéed spinach.',
    price: 599,
    categoryName: 'New Launches',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=500'
  },

  // Sides
  {
    name: 'Garlic Breadsticks',
    description: 'Baked to perfection. Your perfect pizza partner! Tastes best with dip.',
    price: 129,
    categoryName: 'Sides',
    image: 'https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?auto=format&fit=crop&q=80&w=500'
  },
  {
    name: 'Stuffed Garlic Bread',
    description: 'Freshly baked garlic bread with cheese, juicy corn & tangy jalapeno.',
    price: 169,
    categoryName: 'Sides',
    image: 'https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?auto=format&fit=crop&q=80&w=500'
  },
  {
    name: 'Paneer Tikka Stuffed Bread',
    description: 'Freshly baked garlic bread with succulent paneer tikka pieces and cheese.',
    price: 189,
    categoryName: 'Sides',
    image: 'https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?auto=format&fit=crop&q=80&w=500'
  },
  {
    name: 'Baked Potato Wedges',
    description: 'Seasoned and baked to a golden crisp.',
    price: 149,
    categoryName: 'Sides',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=500'
  },

  // Beverages
  {
    name: 'Pepsi (500ml)',
    description: 'Refreshing Pepsi cola.',
    price: 60,
    categoryName: 'Beverages',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=500'
  },
  {
    name: 'Choco Lava Cake',
    description: 'Chocolate lovers delight! Indulgent, gooey molten lava inside chocolate cake.',
    price: 109,
    categoryName: 'Beverages',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=500'
  },
  {
    name: 'Mirinda (500ml)',
    description: 'Fruity orange refreshment.',
    price: 60,
    categoryName: 'Beverages',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=500'
  },
  {
    name: 'Sprite (500ml)',
    description: 'Clear, crisp lemon-lime refreshment.',
    price: 60,
    categoryName: 'Beverages',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=500'
  },

  // Combos
  {
    name: 'Solo Meal (Veg)',
    description: '1 Personal Veg Pizza + 1 Pepsi 500ml',
    price: 499,
    categoryName: 'Combo',
    image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=500'
  },
  {
    name: 'Duo Pack (Non-Veg)',
    description: '2 Personal Non-Veg Pizzas + 1 Garlic Breadsticks',
    price: 899,
    categoryName: 'Combo',
    image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=500'
  },
  {
    name: 'Party Box',
    description: '2 Medium Pizzas + 2 Pepsi 500ml + 1 Choco Lava Cake',
    price: 1299,
    categoryName: 'Combo',
    image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=500'
  }
];

const seedDB = async () => {
  try {
    // Clear existing
    await Category.deleteMany({});
    await MenuItem.deleteMany({});
    console.log('Cleared existing data');

    // Insert categories
    const createdCategories = [];
    for (const catName of categories) {
      const cat = await Category.create({ categoryName: catName });
      createdCategories.push(cat);
      console.log(`Added category: ${catName}`);
    }

    // Create lookup map for categories
    const catMap = {};
    createdCategories.forEach(cat => {
      catMap[cat.categoryName] = cat._id;
    });

    // Insert Menu Items
    for (const item of menuItemsData) {
      const categoryId = catMap[item.categoryName];
      if (categoryId) {
        await MenuItem.create({
          name: item.name,
          description: item.description,
          price: item.price,
          categoryId: categoryId,
          image: item.image,
          isAvailable: true
        });
        console.log(`Added menu item: ${item.name}`);
      } else {
         console.log(`Category not found for item: ${item.name}`);
      }
    }

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedDB();
