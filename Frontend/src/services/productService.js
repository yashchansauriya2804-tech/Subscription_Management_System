export async function getProducts() {
  return Promise.resolve([
    { id: 1, name: 'Premium Analytics', category: 'Insights', price: 79, stock: 42 },
    { id: 2, name: 'Team Workspace', category: 'Collaboration', price: 149, stock: 18 },
    { id: 3, name: 'Automation Suite', category: 'Operations', price: 99, stock: 27 },
    { id: 4, name: 'AI Copilot Add-on', category: 'AI', price: 199, stock: 10 },
  ])
}
