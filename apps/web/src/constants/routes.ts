export const ROUTES = {
  dashboard: '/dashboard',
  inventory: {
    stocks: '/inventory/stocks',
    productStock: '/inventory/stocks/:routeParam',
    movements: '/inventory/movements',
  },
  records: {
    products: '/records/products',
    categories: '/records/categories',
    suppliers: '/records/suppliers',
    locations: '/records/locations',
    employees: '/records/employees',
  },
  login: '/login',
  subscribe: '/subscribe',
  requestPasswordReset: '/request-password-reset',
}
