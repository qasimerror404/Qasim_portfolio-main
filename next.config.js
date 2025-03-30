const path = require('path')
 
module.exports = {
  // Remove output: 'export' to enable dynamic routes
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    unoptimized: false, // Use Next.js image optimization
  }
}