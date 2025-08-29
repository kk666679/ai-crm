// API key authentication middleware
export function apiKeyAuth(req, res, next) {
  const apiKey = req.headers['x-api-key'] || req.query.apiKey;
  
  if (!apiKey) {
    return res.status(401).json({
      success: false,
      error: 'API key required'
    });
  }

  // In production, validate against database or environment variable
  const validApiKey = process.env.API_KEY;
  
  if (apiKey !== validApiKey) {
    return res.status(401).json({
      success: false,
      error: 'Invalid API key'
    });
  }

  next();
}

// CRM platform authentication middleware
export function crmPlatformAuth(req, res, next) {
  const platform = req.headers['x-crm-platform'] || 'hubspot';
  
  // Validate supported platforms
  const supportedPlatforms = ['hubspot', 'salesforce', 'sap'];
  
  if (!supportedPlatforms.includes(platform)) {
    return res.status(400).json({
      success: false,
      error: `Unsupported CRM platform. Supported: ${supportedPlatforms.join(', ')}`
    });
  }

  req.crmPlatform = platform;
  next();
}
