/**
 * Legend component showing roles and scaling information
 */
const Legend = () => {
  return (
    <div className="mt-6 bg-gray-800/50 backdrop-blur-sm border border-red-500/30 rounded-xl p-6">
      <h3 className="text-lg font-bold mb-4 text-orange-400">Alliance Roles & Auto-Scaling</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Roles Section */}
        <div>
          <h4 className="font-semibold mb-3 text-gray-200">Roles</h4>
          <div className="space-y-2">
            {Object.entries(window.ALLIANCE_CONFIG.ROLES).map(([roleKey, role]) => (
              <div key={roleKey} className="flex items-center space-x-3">
                <div className={`w-8 h-8 ${role.bg} border-2 ${role.border} rounded-full flex items-center justify-center`}>
                  <span className="text-white text-sm">{role.icon}</span>
                </div>
                <span className="capitalize font-medium">{role.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Auto-Scaling Section */}
        <div>
          <h4 className="font-semibold mb-3 text-gray-200">Auto-Scaling System</h4>
          <div className="space-y-2 text-sm">
            <div>1-7 members: Large hexagons</div>
            <div>8-19 members: Medium hexagons</div>
            <div>20-61 members: Small hexagons</div>
            <div>62-91 members: Tiny hexagons</div>
            <div>92+ members: Mini hexagons</div>
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