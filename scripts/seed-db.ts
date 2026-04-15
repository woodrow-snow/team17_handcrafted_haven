import 'dotenv/config';
import postgres from 'postgres';
import { randomUUID } from 'crypto';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seed() {
  try {
    console.log('Building the Haven: Injecting real descriptions and sample users...');

    await sql`TRUNCATE reviews, products, sellers, users CASCADE`;

    // 1. THREE DISTINCT SAMPLE USERS
    const userIds = [randomUUID(), randomUUID(), randomUUID()];
    const sampleUsers = [
      { id: userIds[0], name: 'Julianne Smith', email: 'jules@byui.edu', pass: 'artisan_fan_1' },
      { id: userIds[1], name: 'Marcus Sterling', email: 'm.sterling@design.com', pass: 'modern_craft' },
      { id: userIds[2], name: 'Sarah Jenkins', email: 's.jenkins@lifestyle.org', pass: 'handmade_life' }
    ];

    for (const u of sampleUsers) {
      await sql`INSERT INTO users (id, name, email, password) VALUES (${u.id}, ${u.name}, ${u.email}, ${u.pass})`;
    }

    const artisanMap = { wood: randomUUID(), clay: randomUUID(), metal: randomUUID(), textile: randomUUID() };
    
    // 2. ARTISANS
    const artisans = [
      { id: artisanMap.wood, name: "Samuel Oak", img: "https://images.pexels.com/photos/4622415/pexels-photo-4622415.jpeg" },
      { id: artisanMap.clay, name: "Elena Rivers", img: "https://images.pexels.com/photos/4252522/pexels-photo-4252522.jpeg" },
      { id: artisanMap.metal, name: "Marcus Thorne", img: "https://images.pexels.com/photos/2309235/pexels-photo-2309235.jpeg" },
      { id: artisanMap.textile, name: "Clara Bell", img: "https://images.pexels.com/photos/3737631/pexels-photo-3737631.jpeg" }
    ];

    for (const a of artisans) {
      await sql`INSERT INTO sellers (id, shop_name, bio, avatar_url) VALUES (${a.id}, ${a.name}, 'Dedicated to preserving traditional techniques in a modern world.', ${a.img})`;
    }

    // 3. PRODUCTS WITH REAL DESCRIPTIONS
    const pData = [
      // Wood
      { s: artisanMap.wood, n: "Walnut Table", p: 1200, i: "631411", d: "A solid black walnut center-piece featuring a hand-rubbed oil finish and mortise-and-tenon joinery." },
      { s: artisanMap.wood, n: "Oak Stool", p: 150, i: "347141", d: "Minimalist three-legged stool carved from white oak. Perfect for a breakfast nook or minimalist studio." },
      { s: artisanMap.wood, n: "Cedar Shelf", p: 80, i: "1797439", d: "Aromatic red cedar floating shelf that brings a rustic, forest-fresh scent and warmth to any wall." },
      { s: artisanMap.wood, n: "Wooden Bowl", p: 45, i: "374044", d: "Hand-turned cherry wood bowl with unique grain patterns. Food safe and finished with organic beeswax." },
      { s: artisanMap.wood, n: "Cutting Board", p: 60, i: "1267320", d: "End-grain maple and walnut assembly designed to protect your knives and elevate your kitchen prep." },
      { s: artisanMap.wood, n: "Desk Tray", p: 40, i: "3856637", d: "Seamless mahogany organizer for the modern professional. Keeps pens and tech neatly in place." },
      
      // Clay
      { s: artisanMap.clay, n: "Stone Mug", p: 25, i: "1207918", d: "Wheel-thrown stoneware mug with a speckled cream glaze. Weighted perfectly for your morning coffee." },
      { s: artisanMap.clay, n: "Blue Vase", p: 90, i: "1327684", d: "Volcanic cobalt glaze on an elongated neck. A striking vessel for dried botanicals or fresh blooms." },
      { s: artisanMap.clay, n: "Clay Pot", p: 35, i: "1031030", d: "Breathable unglazed terracotta planter. Ideal for succulents and cacti needing optimal drainage." },
      { s: artisanMap.clay, n: "Black Plate", p: 20, i: "7610530", d: "Matte black ceramic dinner plate with a subtle rippled edge. Dishwasher safe and incredibly durable." },
      { s: artisanMap.clay, n: "Soup Bowl", p: 22, i: "3806690", d: "Rustic earthenware bowl with iron oxide detailing. Keeps your stews and soups warm for longer." },
      { s: artisanMap.clay, n: "Ceramic Jar", p: 40, i: "4108513", d: "Air-tight kitchen canister with a raw clay exterior and glazed interior for easy cleaning." },

      // Metal
      { s: artisanMap.metal, n: "Chef Knife", p: 180, i: "3927237", d: "Forged high-carbon steel with a hammered finish. Balanced perfectly for precision cutting and durability." },
      { s: artisanMap.metal, n: "Iron Tongs", p: 50, i: "6903264", d: "Heavy-duty fireplace tongs hand-beaten at the anvil. A functional tool that doubles as industrial art." },
      { s: artisanMap.metal, n: "Copper Pot", p: 130, i: "3752136", d: "Hand-hammered copper with a traditional tin lining. Exceptional heat conductivity for the serious cook." },
      { s: artisanMap.metal, n: "Metal Hook", p: 12, i: "5425129", d: "Simple, elegant iron J-hook. Strong enough for heavy coats, stylish enough for jewelry display." },
      { s: artisanMap.metal, n: "Brass Lamp", p: 160, i: "1112598", d: "Solid brass desk lamp with an adjustable neck. Casts a warm, focused glow for late-night reading." },
      { s: artisanMap.metal, n: "Steel Trivet", p: 30, i: "563067", d: "Geometric steel stand designed to protect surfaces from hot cookware. Industrial minimalist design." },

      // Textile
      { s: artisanMap.textile, n: "Linen Pillow", p: 40, i: "6292370", d: "Heavyweight stone-washed linen in a soft oatmeal hue. Breathable, durable, and naturally hypoallergenic." },
      { s: artisanMap.textile, n: "Hemp Bag", p: 25, i: "3930881", d: "Sustainable hemp fiber tote with reinforced stitching. Built for daily errands and a lifetime of use." }
    ];

    const pIds = [];
    for (const p of pData) {
      const id = randomUUID();
      const url = `https://images.pexels.com/photos/${p.i}/pexels-photo-${p.i}.jpeg`;
      await sql`INSERT INTO products (id, seller_id, name, description, price, image_url) VALUES (${id}, ${p.s}, ${p.n}, ${p.d}, ${p.p}, ${url})`;
      pIds.push(id);
    }

    // 4. AUTHENTIC REVIEWS
    const reviews = [
      { u: userIds[0], r: 5, c: "The walnut grain on this table is breathtaking. You can really tell Samuel is a master of his craft." },
      { u: userIds[1], r: 5, c: "I've been looking for an authentic hand-thrown mug for ages. This speckled clay is perfect." },
      { u: userIds[2], r: 4, c: "Beautiful linen weave. It has that heavy, high-quality feel you just don't get from big-box stores." },
      { u: userIds[0], r: 5, c: "The hammered finish on the knife set is stunning. Sharpest blade in my kitchen!" },
      { u: userIds[1], r: 5, c: "Shipping was fast and the packaging was all eco-friendly. Love the sustainable focus here." },
      { u: userIds[2], r: 5, c: "A true heirloom piece. My family will be using this oak stool for generations." }
    ];

    for (let i = 0; i < reviews.length; i++) {
      const rev = reviews[i];
      await sql`
        INSERT INTO reviews (id, product_id, user_id, rating, comment) 
        VALUES (${randomUUID()}, ${pIds[i % pIds.length]}, ${rev.u}, ${rev.r}, ${rev.c})
      `;
    }

    console.log('Success! Marketplace seeded with real descriptions and 3 unique users.');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
seed();