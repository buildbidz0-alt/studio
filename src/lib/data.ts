

export interface Product {
  id: string;
  name: {
    en: string;
    hi: string;
    ur: string;
    ar: string;
    tr: string;
    ms: string;
    fr: string;
  };
  description: string;
  price: number;
  imageUrls: string[];
  category: 'Food' | 'Cosmetics' | 'Apparel' | 'Home Goods';
  sellerId: string;
  isHalalCertified: boolean;
  status: 'pending' | 'approved' | 'rejected';
  imageHint?: string;
}

export interface Seller {
  id: string;
  name: string;
  description: string;
  logoUrl: string;
  halalCertificationBody: string;
  imageHint?: string;
}

const sellers: Seller[] = [
  {
    id: 'seller-1',
    name: 'Organic Halal Foods',
    description: 'Providers of the finest organic halal meats and produce since 2010. We believe in ethical farming and sustainable practices.',
    logoUrl: 'https://picsum.photos/200/200',
    imageHint: 'farmer market',
    halalCertificationBody: 'Halal Food Council USA',
  },
  {
    id: 'seller-2',
    name: 'Modest Wear Co.',
    description: 'Elegant and modern modest apparel for every occasion. Our fabrics are sourced ethically and designed for comfort and style.',
    logoUrl: 'https://picsum.photos/200/200',
    imageHint: 'fashion boutique',
    halalCertificationBody: 'N/A',
  },
  {
    id: 'seller-3',
    name: 'Pure Glow Cosmetics',
    description: '100% vegan, cruelty-free, and halal-certified cosmetics. Enhance your natural beauty with products that are kind to your skin and the planet.',
    logoUrl: 'https://picsum.photos/200/200',
    imageHint: 'makeup collection',
    halalCertificationBody: 'Islamic Society of North America (ISNA)',
  }
];

let products: Product[] = [
  {
    id: 'prod-1',
    name: {
      en: 'Organic Olive Oil',
      hi: 'जैविक जैतून का तेल',
      ur: 'نامیاتی زیتون کا تیل',
      ar: 'زيت زيتون عضوي',
      tr: 'Organik Zeytinyağı',
      ms: 'Minyak Zaitun Organik',
      fr: 'Huile d\'Olive Biologique',
    },
    description: 'Cold-pressed extra virgin olive oil from the hills of Palestine. Perfect for salads, dips, and cooking. Rich in antioxidants and flavor.',
    price: 1999,
    imageUrls: ['https://images.unsplash.com/photo-1591122523233-22037c1dec9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxvbGl2ZSUyMG9pbHxlbnwwfHx8fDE3NTY2NTYyMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080', 'https://picsum.photos/600/400?random=1', 'https://picsum.photos/600/400?random=2'],
    imageHint: 'olive oil',
    category: 'Food',
    sellerId: 'seller-1',
    isHalalCertified: true,
    status: 'approved',
  },
  {
    id: 'prod-2',
    name: {
      en: 'Luxury Silk Hijab',
      hi: 'लक्ज़री सिल्क हिजाब',
      ur: 'لگژری سلک حجاب',
      ar: 'حجاب حريري فاخر',
      tr: 'Lüks İpek Başörtüsü',
      ms: 'Hijab Sutera Mewah',
      fr: 'Hijab en Soie de Luxe',
    },
    description: 'A beautiful, lightweight silk hijab in a timeless emerald green. Soft, breathable, and drapes elegantly for a sophisticated look.',
    price: 3600,
    imageUrls: ['https://images.unsplash.com/photo-1677478863154-55ecce8c7536?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxzaWxrJTIwc2NhcmZ8ZW58MHx8fHwxNzU2NjU2MjA2fDA&ixlib=rb-4.1.0&q=80&w=1080'],
    imageHint: 'silk scarf',
    category: 'Apparel',
    sellerId: 'seller-2',
    isHalalCertified: true,
    status: 'approved',
  },
  {
    id: 'prod-3',
    name: {
      en: 'Rosewater Face Mist',
      hi: 'गुलाब जल फेस मिस्ट',
      ur: 'عرق گلاب فیس مسٹ',
      ar: 'رذاذ ماء الورد للوجه',
      tr: 'Gül Suyu Yüz Spreyi',
      ms: 'Semburan Muka Air Mawar',
      fr: 'Brume pour le Visage à l\'Eau de Rose',
    },
    description: 'Hydrating and refreshing face mist made with pure Damask rosewater. Soothes skin, reduces redness, and provides a dewy glow.',
    price: 1480,
    imageUrls: ['https://images.unsplash.com/photo-1613803745799-ba6c10aace85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxza2luY2FyZSUyMHByb2R1Y3R8ZW58MHx8fHwxNzU2NjU2MjA2fDA&ixlib=rb-4.1.0&q=80&w=1080'],
    imageHint: 'skincare product',
    category: 'Cosmetics',
    sellerId: 'seller-3',
    isHalalCertified: true,
    status: 'approved',
  },
  {
    id: 'prod-4',
    name: {
      en: 'Artisanal Honey',
      hi: 'कारीगर शहद',
      ur: 'کاریگر شہد',
      ar: 'عسل حرفي',
      tr: 'Zanaatkar Balı',
      ms: 'Madu Kraftangan',
      fr: 'Miel Artisanal',
    },
    description: 'Raw, unfiltered wildflower honey from local apiaries. A natural sweetener with antibacterial properties.',
    price: 1279,
    imageUrls: ['https://images.unsplash.com/photo-1669384536024-d091ddc00f4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxob25leSUyMGphcnxlbnwwfHx8fDE3NTY2NTYyMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080'],
    imageHint: 'honey jar',
    category: 'Food',
    sellerId: 'seller-1',
    isHalalCertified: true,
    status: 'approved',
  },
  {
    id: 'prod-5',
    name: {
        en: 'Kufi-style Prayer Mat',
        hi: 'कूफी-शैली की प्रार्थना चटाई',
        ur: 'کوفی طرز کی جائے نماز',
        ar: 'سجادة صلاة على الطراز الكوفي',
        tr: 'Kufi Tarzı Seccade',
        ms: 'Tikar Sembahyang Gaya Kufi',
        fr: 'Tapis de Prière de Style Koufique',
    },
    description: 'Plush and comfortable prayer mat with geometric Kufic calligraphy design. Non-slip backing and premium quality.',
    price: 2800,
    imageUrls: ['https://images.unsplash.com/photo-1589725617150-0ef95799033f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxwcmF5ZXIlMjBydWd8ZW58MHx8fHwxNzU2NjU2MjA2fDA&ixlib=rb-4.1.0&q=80&w=1080'],
    imageHint: 'prayer rug',
    category: 'Home Goods',
    sellerId: 'seller-2',
    isHalalCertified: true,
    status: 'approved',
  },
  {
    id: 'prod-6',
    name: {
        en: 'Natural Miswak Toothstick',
        hi: 'प्राकृतिक मिस्वाक टूथस्टिक',
        ur: 'قدرتی مسواک ٹوتھ اسٹک',
        ar: 'سواك أسنان طبيعي',
        tr: 'Doğal Misvak Diş Çubuğu',
        ms: 'Kayu Sugi Miswak Semulajadi',
        fr: 'Bâton de Siwak Naturel',
    },
    description: 'A traditional and natural way to clean teeth. Harvested from the Salvadora persica tree, it has numerous dental benefits.',
    price: 479,
    imageUrls: ['https://images.unsplash.com/photo-1680382091603-46e766b5b129?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxuYXR1cmFsJTIwdG9vdGhicnVzaHxlbnwwfHx8fDE3NTY2NTYyMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080'],
    imageHint: 'natural toothbrush',
    category: 'Cosmetics',
    sellerId: 'seller-1',
    isHalalCertified: true,
    status: 'approved',
  },
  {
    id: 'prod-7',
    name: {
        en: 'Spiced Date Spread',
        hi: 'मसालेदार खजूर का स्प्रेड',
        ur: 'مصالحہ دار کھجور کا اسپریڈ',
        ar: 'معجون التمر المتبل',
        tr: 'Baharatlı Hurma Ezmesi',
        ms: 'Sapuan Kurma Berempah',
        fr: 'Tartinade de Dattes Épicée',
    },
    description: 'A delicious and healthy spread made from Medjool dates, cinnamon, and cardamom. Perfect on toast or with fruit.',
    price: 960,
    imageUrls: ['https://images.unsplash.com/photo-1607668373611-05ca896e1e25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxkYXRlJTIwZnJ1aXR8ZW58MHx8fHwxNzU2NjU2MjA2fDA&ixlib=rb-4.1.0&q=80&w=1080'],
    imageHint: 'date fruit',
    category: 'Food',
    sellerId: 'seller-1',
    isHalalCertified: true,
    status: 'approved',
  },
  {
    id: 'prod-8',
    name: {
        en: 'Linen Open Abaya',
        hi: 'लिनन ओपन अबाया',
        ur: 'لینن اوپن عبایا',
        ar: 'عباءة مفتوحة من الكتان',
        tr: 'Keten Açık Abaya',
        ms: 'Abaya Terbuka Linen',
        fr: 'Abaya Ouverte en Lin',
    },
    description: 'A breathable and stylish open abaya made from 100% linen. Perfect for layering in any season.',
    price: 7199,
    imageUrls: ['https://images.unsplash.com/photo-1668028554854-245f8ccae15b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxtb2Rlc3QlMjBmYXNoaW9ufGVufDB8fHx8MTc1NjY1NjIwNnww&ixlib=rb-4.1.0&q=80&w=1080'],
    imageHint: 'modest fashion',
    category: 'Apparel',
    sellerId: 'seller-2',
    isHalalCertified: true,
    status: 'approved',
  },
  {
    id: 'prod-9',
    name: {
        en: 'Black Seed Oil',
        hi: 'कलौंजी का तेल',
        ur: 'کلونجی کا تیل',
        ar: 'زيت الحبة السوداء',
        tr: 'Çörek Otu Yağı',
        ms: 'Minyak Habbatus Sauda',
        fr: 'Huile de Nigelle',
    },
    description: 'Cold-pressed Nigella Sativa oil, known for its powerful immune-boosting and anti-inflammatory properties.',
    price: 2399,
    imageUrls: ['https://picsum.photos/600/400'],
    category: 'Food',
    sellerId: 'seller-1',
    isHalalCertified: true,
    status: 'approved',
    imageHint: 'seed oil',
  },
  {
    id: 'prod-10',
    name: {
        en: 'Argan Oil Hair Serum',
        hi: 'आर्गन ऑयल हेयर सीरम',
        ur: 'آرگن آئل ہیئر سیرم',
        ar: 'سيروم زيت الأرغان للشعر',
        tr: 'Argan Yağı Saç Serumu',
        ms: 'Serum Rambut Minyak Argan',
        fr: 'Sérum Capillaire à l\'Huile d\'Argan',
    },
    description: 'A nourishing hair serum with pure Moroccan Argan oil. Tames frizz, adds shine, and protects hair from damage.',
    price: 1800,
    imageUrls: ['https://picsum.photos/600/400'],
    category: 'Cosmetics',
    sellerId: 'seller-3',
    isHalalCertified: true,
    status: 'approved',
    imageHint: 'hair oil',
  },
  {
    id: 'prod-11',
    name: {
        en: 'Geometric Islamic Wall Art',
        hi: 'ज्यामितीय इस्लामी दीवार कला',
        ur: 'جیومیٹرک اسلامی وال آرٹ',
        ar: 'فن جداري إسلامي هندسي',
        tr: 'Geometrik İslami Duvar Sanatı',
        ms: 'Seni Dinding Islam Geometri',
        fr: 'Art Mural Islamique Géométrique',
    },
    description: 'Intricate laser-cut wood wall art featuring a stunning geometric pattern. A beautiful addition to any modern Muslim home.',
    price: 9600,
    imageUrls: ['https://picsum.photos/600/400'],
    category: 'Home Goods',
    sellerId: 'seller-2',
    isHalalCertified: true,
    status: 'approved',
    imageHint: 'islamic art',
  },
  {
    id: 'prod-12',
    name: {
        en: 'Halal Gummy Candies',
        hi: 'हलाल गमी कैंडीज',
        ur: 'حلال گمی کینڈیز',
        ar: 'حلوى جيلاتينية حلال',
        tr: 'Helal Jelibon Şekerler',
        ms: 'Gula-gula Bergetah Halal',
        fr: 'Bonbons Gélifiés Halal',
    },
    description: 'Assorted fruit-flavored gummy candies made with beef gelatin. A sweet treat for all ages.',
    price: 600,
    imageUrls: ['https://picsum.photos/600/400'],
    category: 'Food',
    sellerId: 'seller-1',
    isHalalCertified: true,
    status: 'approved',
    imageHint: 'gummy bears',
  }
];

// In a real app, this data would be persisted in a database.
// For this prototype, we'll manage it in memory.
export function updateProductStatus(productId: string, status: 'approved' | 'rejected') {
  const productIndex = products.findIndex(p => p.id === productId);
  if (productIndex !== -1) {
    products[productIndex].status = status;
    return products[productIndex];
  }
  return null;
}

export async function addProduct(productData: Omit<Product, 'id' | 'status'>): Promise<Product> {
  const newProduct: Product = {
    id: `prod-${Date.now()}`,
    status: 'pending',
    ...productData,
  };
  products.unshift(newProduct);
  return newProduct;
}

export async function updateProduct(productId: string, updateData: Partial<Omit<Product, 'id'>>): Promise<Product | null> {
  const productIndex = products.findIndex(p => p.id === productId);
  if (productIndex !== -1) {
    products[productIndex] = { ...products[productIndex], ...updateData };
    return products[productIndex];
  }
  return null;
}

export async function deleteProduct(productId: string): Promise<boolean> {
  const initialLength = products.length;
  products = products.filter(p => p.id !== productId);
  return products.length < initialLength;
}


export async function getProducts(options?: { category?: string; search?: string }): Promise<Product[]> {
  let filteredProducts = products.filter(p => p.status === 'approved');
  
  if (options?.category && options.category !== 'all') {
    filteredProducts = filteredProducts.filter(p => p.category === options.category);
  }

  if (options?.search) {
    const searchTerm = options.search.toLowerCase();
    filteredProducts = filteredProducts.filter(p => 
      Object.values(p.name).some(name => name.toLowerCase().includes(searchTerm)) ||
      p.description.toLowerCase().includes(searchTerm)
    );
  }
  
  return filteredProducts;
}

export async function getPendingProducts(): Promise<Product[]> {
  return products.filter(p => p.status === 'pending');
}

export async function getAllProducts(): Promise<Product[]> {
  return products;
}


export async function getProductById(id: string): Promise<Product | undefined> {
  return products.find(p => p.id === id);
}

export async function getProductsByIds(ids: string[]): Promise<Product[]> {
  return products.filter(p => ids.includes(p.id) && p.status === 'approved');
}

export async function getSellers(): Promise<Seller[]> {
    return sellers;
}

export async function getSellerById(id: string): Promise<Seller | undefined> {
  return sellers.find(s => s.id === id);
}

export async function getProductsBySellerId(sellerId: string): Promise<Product[]> {
    return products.filter(p => p.sellerId === sellerId);
}
