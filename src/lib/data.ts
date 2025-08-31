export interface Product {
  id: string;
  name: string;
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
    halalCertificationBody: 'Halal Food Council USA',
    imageHint: 'farmer market',
  },
  {
    id: 'seller-2',
    name: 'Modest Wear Co.',
    description: 'Elegant and modern modest apparel for every occasion. Our fabrics are sourced ethically and designed for comfort and style.',
    logoUrl: 'https://picsum.photos/200/200',
    halalCertificationBody: 'N/A',
    imageHint: 'fashion boutique',
  },
  {
    id: 'seller-3',
    name: 'Pure Glow Cosmetics',
    description: '100% vegan, cruelty-free, and halal-certified cosmetics. Enhance your natural beauty with products that are kind to your skin and the planet.',
    logoUrl: 'https://picsum.photos/200/200',
    halalCertificationBody: 'Islamic Society of North America (ISNA)',
    imageHint: 'makeup collection',
  }
];

let products: Product[] = [
  {
    id: 'prod-1',
    name: 'Organic Olive Oil',
    description: 'Cold-pressed extra virgin olive oil from the hills of Palestine. Perfect for salads, dips, and cooking. Rich in antioxidants and flavor.',
    price: 1999,
    imageUrls: ['https://picsum.photos/600/400', 'https://picsum.photos/600/400?random=1', 'https://picsum.photos/600/400?random=2'],
    category: 'Food',
    sellerId: 'seller-1',
    isHalalCertified: true,
    status: 'approved',
    imageHint: 'olive oil',
  },
  {
    id: 'prod-2',
    name: 'Luxury Silk Hijab',
    description: 'A beautiful, lightweight silk hijab in a timeless emerald green. Soft, breathable, and drapes elegantly for a sophisticated look.',
    price: 3600,
    imageUrls: ['https://picsum.photos/600/400'],
    category: 'Apparel',
    sellerId: 'seller-2',
    isHalalCertified: true,
    status: 'approved',
    imageHint: 'silk scarf',
  },
  {
    id: 'prod-3',
    name: 'Rosewater Face Mist',
    description: 'Hydrating and refreshing face mist made with pure Damask rosewater. Soothes skin, reduces redness, and provides a dewy glow.',
    price: 1480,
    imageUrls: ['https://picsum.photos/600/400'],
    category: 'Cosmetics',
    sellerId: 'seller-3',
    isHalalCertified: true,
    status: 'approved',
    imageHint: 'skincare product',
  },
  {
    id: 'prod-4',
    name: 'Artisanal Honey',
    description: 'Raw, unfiltered wildflower honey from local apiaries. A natural sweetener with antibacterial properties.',
    price: 1279,
    imageUrls: ['https://picsum.photos/600/400'],
    category: 'Food',
    sellerId: 'seller-1',
    isHalalCertified: true,
    status: 'approved',
    imageHint: 'honey jar',
  },
  {
    id: 'prod-5',
    name: 'Kufi-style Prayer Mat',
    description: 'Plush and comfortable prayer mat with geometric Kufic calligraphy design. Non-slip backing and premium quality.',
    price: 2800,
    imageUrls: ['https://picsum.photos/600/400'],
    category: 'Home Goods',
    sellerId: 'seller-2',
    isHalalCertified: true,
    status: 'approved',
    imageHint: 'prayer rug',
  },
  {
    id: 'prod-6',
    name: 'Natural Miswak Toothstick',
    description: 'A traditional and natural way to clean teeth. Harvested from the Salvadora persica tree, it has numerous dental benefits.',
    price: 479,
    imageUrls: ['https://picsum.photos/600/400'],
    category: 'Cosmetics',
    sellerId: 'seller-1',
    isHalalCertified: true,
    status: 'approved',
    imageHint: 'natural toothbrush',
  },
  {
    id: 'prod-7',
    name: 'Spiced Date Spread',
    description: 'A delicious and healthy spread made from Medjool dates, cinnamon, and cardamom. Perfect on toast or with fruit.',
    price: 960,
    imageUrls: ['https://picsum.photos/600/400'],
    category: 'Food',
    sellerId: 'seller-1',
    isHalalCertified: true,
    status: 'approved',
    imageHint: 'date fruit',
  },
  {
    id: 'prod-8',
    name: 'Linen Open Abaya',
    description: 'A breathable and stylish open abaya made from 100% linen. Perfect for layering in any season.',
    price: 7199,
    imageUrls: ['https://picsum.photos/600/400'],
    category: 'Apparel',
    sellerId: 'seller-2',
    isHalalCertified: true,
    status: 'approved',
    imageHint: 'modest fashion',
  },
  {
    id: 'prod-9',
    name: 'Black Seed Oil',
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
    name: 'Argan Oil Hair Serum',
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
    name: 'Geometric Islamic Wall Art',
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
    name: 'Halal Gummy Candies',
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


export async function getProducts(options?: { category?: string; search?: string }): Promise<Product[]> {
  let filteredProducts = products.filter(p => p.status === 'approved');
  
  if (options?.category && options.category !== 'all') {
    filteredProducts = filteredProducts.filter(p => p.category === options.category);
  }

  if (options?.search) {
    const searchTerm = options.search.toLowerCase();
    filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(searchTerm) || p.description.toLowerCase().includes(searchTerm));
  }
  
  return filteredProducts;
}

export async function getPendingProducts(): Promise<Product[]> {
  return products.filter(p => p.status === 'pending');
}


export async function getProductById(id: string): Promise<Product | undefined> {
  const product = products.find(p => p.id === id);
  // In a real app, you might have different logic for admins/sellers vs customers
  if (product?.status !== 'approved') {
      // For this prototype, we allow direct access to non-approved products
      // In a real app, you'd add role-based access control here
      return product;
  }
  return product;
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
