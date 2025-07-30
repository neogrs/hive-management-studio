

/**
 * Legend component with modern React patterns
 */
const Legend = () => {
  // Role configurations
  const roles = Object.entries(window.ALLIANCE_CONFIG.ROLES);

  // Scaling information
  const scalingInfo = [
    { range: '1-7', description: 'Large hexagons' },
    { range: '8-19', description: 'Medium hexagons' },
    { range: '20-61', description: 'Small hexagons' },
    { range: '62-91', description: 'Tiny hexagons' },
    { range: '92+', description: 'Mini hexagons' }
  ];

  return (
    <div className="mt-6 bg-gray-800/50 backdrop-blur-sm border border-red-500/30 rounded-xl p-6">
      <h3 className="text-lg font-bold mb-4 text-orange-400">
        Alliance Roles & Auto-Scaling
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Roles Section */}
        <div>
          <h4 className="font-semibold mb-3 text-gray-200">Roles</h4>
          <div className="space-y-2">
            {roles.map(([roleKey, role]) => (
              <div key={roleKey} className="flex items-center space-x-3">
                <div
                  className={`w-8 h-8 ${role.bg} border-2 ${role.border} rounded-full flex items-center justify-center`}
                  style={{ backgroundColor: role.color + '20' }}
                >
                  <span className="text-white text-sm">{role.icon}</span>
                </div>
                <span className="capitalize font-medium text-gray-300">{role.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Auto-Scaling Section */}
        <div>
          <h4 className="font-semibold mb-3 text-gray-200">Auto-Scaling System</h4>
          <div className="space-y-2 text-sm text-gray-300">
            {scalingInfo.map(({ range, description }, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className="text-orange-400 font-medium">{range}</span>
                <span>members: {description}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-4 pt-4 border-t border-gray-600 text-sm text-gray-400">
        <strong>Instructions:</strong> Hexagons auto-scale for any alliance size (1-100+ members) • No overlapping • Perfect spiral arrangement
      </div>
    </div>
  );
};

// Make available globally
window.Legend = Legend; 