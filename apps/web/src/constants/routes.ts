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
  api: {
    inventoryCsv: '/api/reports/inventory/csv',
    mostTrendingRecordsCsv: '/api/reports/most-trending-products/csv',
  },
  profile: '/profile',
  login: '/login',
  subscribe: '/subscribe',
  requestPasswordReset: '/request-password-reset',
}
