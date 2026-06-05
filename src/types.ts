export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'bakso-mie' | 'nasi' | 'cemilan' | 'minuman';
  image: string;
  isPopular: boolean;
  isSpicy: boolean;
}

export interface CartItem {
  id: string; // unique cart line id
  menuId: string;
  name: string;
  price: number;
  quantity: number;
  notes: string;
}

export interface Order {
  id: string;
  customerName: string;
  phoneNumber: string;
  orderType: 'delivery' | 'dine-in';
  tableNumber?: string;
  deliveryAddress?: string;
  items: {
    menuId: string;
    name: string;
    price: number;
    quantity: number;
    notes?: string;
  }[];
  totalAmount: number;
  status: 'received' | 'preparing' | 'delivering' | 'completed' | 'cancelled';
  createdAt: string;
  paymentMethod?: 'qris' | 'bank_transfer' | 'ewallet';
  paymentDetails?: string;
}
